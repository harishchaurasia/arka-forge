"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, Phone } from "lucide-react";

// Interactive digital-twin visual - lazy-loaded, client-only, heavy so it must
// never block the hero. Falls back to a static wireframe while the chunk loads.
const HeroTwin = dynamic(
  () => import("@/components/site/hero-twin").then((m) => m.HeroTwin),
  { ssr: false, loading: () => <div className="h-full w-full" /> },
);

// Digital twins is the primary offer: the headline is locked on it, with the
// interactive twin on the right. Co-dev stays a small supporting line.
const PRIMARY_SUB =
  "We rebuild real-world procedures inside a game engine and measure every task, error, and readiness signal. People prove they are ready before they ever touch the real thing.";

export function Hero() {
  return (
    <section className="relative flex min-h-[92vh] flex-col overflow-hidden text-foreground">
      {/* Top meta hairline */}
      <div className="mx-auto w-full max-w-6xl px-5 pt-28 md:pt-32">
        <div className="flex items-center justify-between border-t border-border pt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground sm:text-[11px]">
          <span>ArkaForge - Game Engineering and Technology Studio</span>
          <span className="hidden sm:block">High-Stakes Training Simulation</span>
        </div>
      </div>

      {/* Main */}
      <div className="mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 items-center gap-8 px-5 py-14 md:py-20 lg:grid-cols-[1fr_1.15fr]">
        {/* ── Left: fixed primary offer + supporting line ── */}
        <div>
          {/* Fixed headline - locked on digital twins, tiered hierarchy */}
          <h1 className="font-grotesk tracking-[-0.02em]">
            <span className="block text-xl font-medium text-muted-foreground sm:text-2xl">
              We build
            </span>
            <span className="mt-1 block text-[clamp(2.5rem,5.2vw,3.75rem)] font-extrabold leading-[0.98] tracking-[-0.03em] text-primary">
              Digital Twins
            </span>
            <span className="mt-2 block text-[clamp(1.55rem,2.9vw,2.15rem)] font-semibold leading-[1.08] text-foreground">
              for high-stakes training.
            </span>
          </h1>

          {/* Primary description */}
          <p className="mt-7 max-w-lg text-base leading-relaxed text-muted-foreground">
            {PRIMARY_SUB}
          </p>

          {/* Supporting line - co-dev, deliberately subordinate */}
          <div className="mt-7 max-w-lg border-t border-border pt-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              We also co-develop{" "}
              <span className="text-foreground">games</span> for studios and
              publishers, and build{" "}
              <span className="text-foreground">interactive products</span>{" "}
              beyond games.
            </p>
          </div>

          {/* CTAs */}
          <div className="mt-9 flex flex-row flex-wrap items-center gap-x-4 gap-y-3">
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
        </div>

        {/* ── Right: interactive digital-twin visual ── */}
        <div className="hidden lg:block">
          <div className="relative h-[520px] w-full">
            <HeroTwin />
          </div>
        </div>
      </div>

      {/* Bottom meta hairline */}
      <div className="mx-auto w-full max-w-6xl px-5 pb-6">
        <div className="flex items-center justify-between border-t border-border pt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">
          <span>Digital twins &amp; game engineering</span>
          <span className="tabular-nums">01 - 02</span>
        </div>
      </div>
    </section>
  );
}
