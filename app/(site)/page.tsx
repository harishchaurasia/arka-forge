import { Hero } from "@/components/site/hero";
import { WhatWeBuild } from "@/components/site/what-we-build";
import { WhyItMatters } from "@/components/site/why-it-matters";
import { ServicesGrid } from "@/components/site/services-grid";
import { UseCases } from "@/components/site/use-cases";
import { HowWeWork } from "@/components/site/how-we-work";
import { SystemsMindset } from "@/components/site/systems-mindset";
import { CapabilitiesGrid } from "@/components/site/capabilities-grid";
import { VisionSection } from "@/components/site/vision-section";
import { CTABand } from "@/components/site/cta-band";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatWeBuild />
      <WhyItMatters />
      <ServicesGrid />
      <UseCases />
      <HowWeWork />
      <SystemsMindset />
      <CapabilitiesGrid />
      <VisionSection />
      <CTABand />
    </>
  );
}
