import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { TwinSchematic } from "@/components/site/twin-schematic";

export function DigitalTwins() {
  return (
    <section className="relative pt-24 pb-14 md:pt-32 md:pb-16">
      <Reveal className="mx-auto max-w-3xl px-5 text-center">
        <div className="mb-6 flex justify-center">
          <TwinSchematic />
        </div>
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          We build <span className="text-primary">digital twins</span> of the
          work itself.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
          We rebuild your equipment, procedures, and failure modes inside a game
          engine. People practice the real task, fail without consequence, and
          leave a record that proves they are ready. Built to the fidelity
          safety-critical work demands.
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
