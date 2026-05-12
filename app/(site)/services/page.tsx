import { Metadata } from "next";
import { Section } from "@/components/site/section";
import { BackLink } from "@/components/site/back-link";

export const metadata: Metadata = {
  title: "Services - ArkaForge",
  description:
    "Game co-development for studios and publishers, and interactive products for teams outside games.",
};

export default function ServicesPage() {
  return (
    <Section>
      <BackLink href="/" label="Back to Home" />
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
        Services
      </h1>
      <p className="text-base text-muted-foreground">
        Placeholder — real copy in Task 1.7.
      </p>
    </Section>
  );
}
