import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Reveal } from "@/components/site/reveal";

export function CTABand() {
  return (
    <section className="relative py-24 text-foreground md:py-32">
      <Reveal className="relative mx-auto max-w-6xl px-5">
        <div className="mb-12 border-t border-border pt-4" />

        <h2 className="max-w-3xl text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.06] tracking-[-0.02em]">
          Tell us what you&apos;re building.
        </h2>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          A high-stakes procedure that should be a digital twin. A game in
          production that needs more hands. A pitch that needs a vertical slice.
          If it runs on a game engine, or should, that is the work we take.
        </p>

        <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Schedule a call
            <Phone className="h-4 w-4" />
          </Link>
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-foreground"
          >
            See our work
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
