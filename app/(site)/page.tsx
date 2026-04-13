import { Hero } from "@/components/site/hero";
import { WhatWeBuild } from "@/components/site/what-we-build";
import { CoreBelief } from "@/components/site/core-belief";
import { FeaturedCase } from "@/components/site/featured-case";
import { CTABand } from "@/components/site/cta-band";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatWeBuild />
      <CoreBelief />
      <FeaturedCase />
      <CTABand />
    </>
  );
}
