import { Metadata } from "next";
import { Section } from "@/components/site/section";
import { BackLink } from "@/components/site/back-link";

export const metadata: Metadata = {
  title: "Interactive Products - ArkaForge",
  description:
    "Game-engine craft outside games — gamified products, training simulations, configurators, and interactive 3D/data experiences.",
};

export default function InteractiveProductsPage() {
  return (
    <Section>
      <BackLink href="/services" label="Back to Services" />
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
        Interactive Products
      </h1>
      <p className="text-base text-muted-foreground">
        Placeholder — real copy in Task 1.7.
      </p>
    </Section>
  );
}
