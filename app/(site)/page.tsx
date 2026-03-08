import { Hero } from "@/components/site/hero";
import { CapabilitiesGrid } from "@/components/site/capabilities-grid";
import { SystemsMindset } from "@/components/site/systems-mindset";
import { FeaturedLabs } from "@/components/site/featured-labs";
import { FeaturedWork } from "@/components/site/featured-work";
import { CTABand } from "@/components/site/cta-band";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CapabilitiesGrid />
      <SystemsMindset />
      <FeaturedLabs />
      <FeaturedWork />
      <CTABand />
    </>
  );
}
