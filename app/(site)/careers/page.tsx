import { Metadata } from "next";
import { Section } from "@/components/site/section";
import { BackLink } from "@/components/site/back-link";
import { CareersForm } from "@/components/site/careers-form";

export const metadata: Metadata = {
  title: "Careers - ArkaForge",
  description:
    "Work with ArkaForge - game co-development and interactive products. We're always interested in senior game engineers, developers, and designers.",
};

export default function CareersPage() {
  return (
    <Section>
      <BackLink href="/" label="Back to Home" />
      <div className="max-w-2xl mx-auto">
        <div className="text-center">
          <span className="font-mono text-xs font-medium uppercase tracking-wider text-primary/70 mb-3 block">
            Join us
          </span>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Careers
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed mb-12 mx-auto">
            ArkaForge is a game engineering &amp; technology studio - game
            co-development for studios and publishers, plus interactive products
            for teams outside games. We work with a curated network of senior
            game engineers, developers, and designers, and we&apos;re always
            interested in people who are strong in Unreal Engine 5, Unity,
            real-time systems, gameplay, AI/ML, tools, or technical art. Tell us
            what you do.
          </p>
        </div>
        <CareersForm />
      </div>
    </Section>
  );
}
