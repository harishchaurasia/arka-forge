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

    const toEmail = process.env.CONTACT_TO_EMAIL || "contact@arkaforge.com";
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "noreply@arkaforge.com";

    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: validated.email,
      subject: `Contact Form: ${validated.subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${validated.name}</p>
        <p><strong>Email:</strong> ${validated.email}</p>
        ${validated.company ? `<p><strong>Company:</strong> ${validated.company}</p>` : ""}
        <p><strong>Subject:</strong> ${validated.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${validated.message.replace(/\n/g, "<br>")}</p>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${validated.name}
        Email: ${validated.email}
        ${validated.company ? `Company: ${validated.company}` : ""}
        Subject: ${validated.subject}
        
        Message:
        ${validated.message}
      `,
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
