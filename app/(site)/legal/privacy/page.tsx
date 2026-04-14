import { Metadata } from "next";
import { Section } from "@/components/site/section";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Arka Forge website.",
};

export default function PrivacyPage() {
  return (
    <Section>
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary/70 mb-3 block">
            Legal
          </span>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-xs text-muted-foreground mb-12">
            Last updated: April 2026
          </p>
        </div>

        <div className="space-y-10 text-sm text-muted-foreground leading-relaxed">
          <div>
            <h2 className="text-base font-semibold text-foreground mb-3">
              Overview
            </h2>
            <p>
              Arka Forge operates arkaforge.com. We take privacy seriously and
              collect only what we need to respond to inquiries and improve the
              site. We do not sell, rent, or share your data with third
              parties.
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-foreground mb-3">
              What We Collect
            </h2>
            <p>
              When you use our contact or careers form, we collect your name,
              email address, and any information you choose to include in your
              message. We do not collect any data automatically beyond standard
              web analytics (page views, referral source) via Vercel Analytics.
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-foreground mb-3">
              How We Use It
            </h2>
            <p>
              We use your information solely to respond to your inquiry. We do
              not add you to mailing lists or contact you for any purpose
              unrelated to your original message.
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-foreground mb-3">
              Data Storage
            </h2>
            <p>
              Form submissions are processed via Resend and delivered to our
              team inbox. We do not store form data in any database beyond
              standard email retention.
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-foreground mb-3">
              Cookies
            </h2>
            <p>
              We do not use tracking cookies. Vercel Analytics uses
              privacy-friendly, cookieless analytics.
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-foreground mb-3">
              Your Rights
            </h2>
            <p>
              You can request access to, correction of, or deletion of any
              personal information we hold about you by emailing us at{" "}
              <a
                href="mailto:contact@arkaforge.com"
                className="text-primary hover:underline"
              >
                contact@arkaforge.com
              </a>
              . We will respond within 5 business days.
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-foreground mb-3">
              Changes
            </h2>
            <p>
              If we make material changes to this policy, we will update the
              date at the top of this page. Continued use of the site after
              changes constitutes acceptance.
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-foreground mb-3">
              Contact
            </h2>
            <p>
              Questions about this policy? Email us at{" "}
              <a
                href="mailto:contact@arkaforge.com"
                className="text-primary hover:underline"
              >
                contact@arkaforge.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
