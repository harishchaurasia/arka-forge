import { Hero } from "@/components/site/hero";
import { TwinCodevSplit } from "@/components/site/home-twin-codev-split";
import { Proof } from "@/components/site/proof";
import { HowWeWork } from "@/components/site/how-we-work";
import { TheStudio } from "@/components/site/the-studio";
import { CTABand } from "@/components/site/cta-band";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TwinCodevSplit />
      <Proof />
      <HowWeWork />
      <TheStudio />
      <CTABand />
    </>
  );
}
