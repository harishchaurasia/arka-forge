import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { HomePillarLabel } from "@/components/site/home-pillar-label";
import { TwinSchematic } from "@/components/site/twin-schematic";

export function DigitalTwins() {
  return (
    <section className="relative pt-14 pb-14 md:pt-16 md:pb-20">
      <Reveal className="mx-auto max-w-3xl px-5 text-center">
        <HomePillarLabel index="02" title="Digital twins" />
        <div className="mb-6 flex justify-center">
          <TwinSchematic />
        </div>
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          Digital twins for{" "}
          <span className="text-primary">high-stakes training.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
          We turn real-world procedures into interactive training simulations -
          built in a game engine, with every task, error, and readiness signal
          measured. It&apos;s the depth behind our nuclear glovebox trainer.
        </p>
        <Link
          href="/services/digital-twins"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all hover:gap-3"
        >
          See digital twins <ArrowRight className="h-4 w-4" />
        </Link>
      </Reveal>
    </section>
  );
}
