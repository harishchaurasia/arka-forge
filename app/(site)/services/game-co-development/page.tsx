import { Metadata } from "next";
import { Section } from "@/components/site/section";
import { BackLink } from "@/components/site/back-link";

export const metadata: Metadata = {
  title: "Game Co-Development - ArkaForge",
  description:
    "Embed ArkaForge into your UE5 or Unity pipeline — features, systems, AI, prototypes, and vertical slices.",
};

export default function GameCoDevelopmentPage() {
  return (
    <Section>
      <BackLink href="/services" label="Back to Services" />
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
        Game Co-Development
      </h1>
      <p className="text-base text-muted-foreground">
        Placeholder — real copy in Task 1.7.
      </p>
    </Section>
  );
}
