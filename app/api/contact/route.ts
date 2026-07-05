import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { contactFormSchema } from "@/lib/validations/contact";

// In-memory rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 3; // 3 submissions per hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count++;
  return true;
}

// Escape user-supplied values before interpolating them into the email HTML.
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const validated = contactFormSchema.parse(body);

    // Honeypot check
    if (validated.honeypot && validated.honeypot.length > 0) {
      // Bot detected, silently fail
      return NextResponse.json({ success: true });
    }

    // Send email via Resend
    const resend = new Resend(process.env.RESEND_API_KEY);

    const isCareers = validated.formType === "careers";
    const toEmail = isCareers
      ? process.env.CAREERS_TO_EMAIL || "careers@arkaforge.com"
      : process.env.CONTACT_TO_EMAIL || "contact@arkaforge.com";
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "noreply@arkaforge.com";

    const attachments =
      validated.resumeName && validated.resumeContent
        ? [{ filename: validated.resumeName, content: validated.resumeContent }]
        : undefined;

    const fontStack =
      "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";
    const accent = "#FF4000"; // ArkaForge molten orange
    const heading = isCareers
      ? "New Careers Application"
      : "New Contact Enquiry";

    const esc = escapeHtml;
    const escMessage = esc(validated.message).replace(/\n/g, "<br/>");

    const field = (label: string, value: string) => `
      <div style="margin-bottom:16px;">
        <div style="font-family:${fontStack};font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#9a9ea6;">${label}</div>
        <div style="font-family:${fontStack};font-size:15px;line-height:1.5;color:#16181d;margin-top:3px;word-break:break-word;">${value}</div>
      </div>`;

    const html = `
      <div style="margin:0;padding:24px;background:#f4f4f5;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
          <tr><td align="center">
            <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;border-collapse:collapse;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e6e6e8;">
              <tr><td style="background:#0b0c0e;padding:26px 28px;">
                <div style="font-family:${fontStack};font-size:19px;font-weight:700;color:#ffffff;letter-spacing:-0.01em;">Arka<span style="color:${accent};">Forge</span></div>
                <div style="font-family:${fontStack};font-size:11px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:#8a8f98;margin-top:6px;">${heading}</div>
              </td></tr>
              <tr><td style="padding:28px;">
                ${field("Name", esc(validated.name))}
                ${field("Email", `<a href="mailto:${esc(validated.email)}" style="color:${accent};text-decoration:none;">${esc(validated.email)}</a>`)}
                ${validated.company ? field("Company", esc(validated.company)) : ""}
                ${field("Subject", esc(validated.subject))}
                ${validated.resumeName ? field("Resume", `${esc(validated.resumeName)} &nbsp;<span style="color:#16a34a;font-weight:600;">&#10003; attached</span>`) : ""}
                <div style="margin-top:8px;">
                  <div style="font-family:${fontStack};font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#9a9ea6;">Message</div>
                  <div style="font-family:${fontStack};font-size:15px;line-height:1.65;color:#2a2d34;margin-top:8px;padding:16px 18px;background:#f6f6f7;border:1px solid #ececed;border-radius:10px;word-break:break-word;">${escMessage}</div>
                </div>
              </td></tr>
              <tr><td style="padding:18px 28px;background:#fafafa;border-top:1px solid #ececed;font-family:${fontStack};font-size:12px;line-height:1.5;color:#9a9ea6;">
                Reply directly to this email to respond to ${esc(validated.name)}. &middot; Sent from arkaforge.com
              </td></tr>
            </table>
          </td></tr>
        </table>
      </div>`;

    const textLines = [
      heading,
      "",
      `Name: ${validated.name}`,
      `Email: ${validated.email}`,
    ];
    if (validated.company) textLines.push(`Company: ${validated.company}`);
    textLines.push(`Subject: ${validated.subject}`);
    if (validated.resumeName)
      textLines.push(`Resume: ${validated.resumeName} (attached)`);
    textLines.push("", "Message:", validated.message);

    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: validated.email,
      subject: `${isCareers ? "Careers Application" : "Contact Form"}: ${validated.subject}`,
      attachments,
      html,
      text: textLines.join("\n"),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid form data", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
