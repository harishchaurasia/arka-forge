import { Hero } from "@/components/site/hero";
import { GameCoDev } from "@/components/site/home-game-codev";
import { DigitalTwins } from "@/components/site/home-digital-twins";
import { Proof } from "@/components/site/proof";
import { HowWeWork } from "@/components/site/how-we-work";
import { TheStudio } from "@/components/site/the-studio";
import { CTABand } from "@/components/site/cta-band";

export default function HomePage() {
  return (
    <>
      <Hero />
      <DigitalTwins />
      <GameCoDev />
      <Proof />
      <HowWeWork />
      <TheStudio />
      <CTABand />
    </>
  );
}
