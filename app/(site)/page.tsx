import { Hero } from "@/components/site/hero";
import { WhatWeDo } from "@/components/site/what-we-do";
import { Proof } from "@/components/site/proof";
import { HowWeWork } from "@/components/site/how-we-work";
import { TheStudio } from "@/components/site/the-studio";
import { CTABand } from "@/components/site/cta-band";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatWeDo />
      <Proof />
      <HowWeWork />
      <TheStudio />
      <CTABand />
    </>
  );
}
