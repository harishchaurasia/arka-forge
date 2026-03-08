import { Metadata } from "next";
import { Section } from "@/components/site/section";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Arka Forge website.",
};

export default function PrivacyPage() {
  return (
    <Section>
      <div className="max-w-3xl mx-auto prose prose-invert">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
        
        <p className="text-muted-foreground mb-6">Last updated: {new Date().toLocaleDateString()}</p>

        <h2>Information We Collect</h2>
        <p>
          We collect information that you provide directly to us, such as when you:
        </p>
        <ul>
          <li>Fill out our contact form</li>
          <li>Subscribe to our newsletter</li>
          <li>Interact with our website</li>
        </ul>

        <h2>How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Respond to your inquiries</li>
          <li>Send you updates about our services</li>
          <li>Improve our website and services</li>
        </ul>

        <h2>Data Protection</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your 
          personal information against unauthorized access, alteration, disclosure, or destruction.
        </p>

        <h2>Your Rights</h2>
        <p>
          You have the right to access, update, or delete your personal information. 
          To exercise these rights, please contact us at{" "}
          <a href="mailto:contact@arkaforge.com" className="text-primary">
            contact@arkaforge.com
          </a>
          .
        </p>

        <h2>Cookies</h2>
        <p>
          We use cookies to improve your experience on our website. You can control 
          cookies through your browser settings.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this privacy policy from time to time. We will notify you of 
          any changes by posting the new policy on this page.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have questions about this privacy policy, please contact us at{" "}
          <a href="mailto:contact@arkaforge.com" className="text-primary">
            contact@arkaforge.com
          </a>
          .
        </p>
      </div>
    </Section>
  );
}
