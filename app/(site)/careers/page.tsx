import { Metadata } from "next";
import { Section } from "@/components/site/section";
import { BackLink } from "@/components/site/back-link";
import { CareersForm } from "@/components/site/careers-form";

export const metadata: Metadata = {
  title: "Careers - Arka Forge",
  description:
    "Work with Arka Forge - game technology, simulation, and digital twins.",
};

export default function CareersPage() {
  return (
    <Section>
      <BackLink href="/" label="Back to Home" />
      <div className="max-w-2xl mx-auto">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary/70 mb-3 block">
            Join Us
          </span>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Careers
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed mb-12 mx-auto">
            We&apos;re an early-stage Game-Tech Studio building Game Based
            Learning, Digital Twins & Simulation-based training systems. Small
            team, real projects, high ownership. If you&apos;re strong and
            passionate in Games Development, Technology, Simulation, Software
            Engineering, AI/ML or real-time systems - we want to hear from you.
          </p>
        </div>
        <CareersForm />
      </div>
    </Section>
  );
}
