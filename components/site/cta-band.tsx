import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Reveal } from "@/components/site/reveal";

export function CTABand() {
  return (
    <section className="relative py-24 text-foreground md:py-32">
      <Reveal className="relative mx-auto max-w-6xl px-5">
        <div className="mb-12 flex items-center justify-between border-t border-border pt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground sm:text-[11px]">
          <span>// let&apos;s talk</span>
          <span className="hidden items-center gap-1.5 text-primary sm:flex">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            open for partners
          </span>
        </div>

        <h2 className="max-w-3xl text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.06] tracking-[-0.02em]">
          Tell us what you&apos;re building.
        </h2>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          A game in production and not enough hands. A pitch that needs a
          vertical slice. A real-world procedure that should be a digital twin.
          If it runs on a game engine - or should - that&apos;s the work we take.
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
            href="/contact"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-foreground"
          >
            Get in touch
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
