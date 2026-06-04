"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";

const ease = [0.25, 0.1, 0.25, 1] as const;

// Two offers. The headline + right panel switch in lockstep; co-dev leads.
// A persistent subhead always names both, so clarity never drops.
const PILLARS = [
  {
    index: "01",
    audience: "For studios & publishers",
    pre: "We co-develop",
    word: "games",
    specTitle: "Game co-development",
    specs: [
      ["Engine", "UE5 / Unity"],
      ["Scope", "features · systems · AI"],
      ["Model", "embedded co-dev"],
      ["Output", "prototype → vertical slice"],
    ] as [string, string][],
  },
  {
    index: "02",
    audience: "For high-stakes training",
    pre: "We build",
    word: "digital twins",
    specTitle: "Digital twins",
    specs: [
      ["Domain", "high-stakes training"],
      ["Fidelity", "real-time · game-engine"],
      ["Proof", "nuclear glovebox sim"],
      ["Tracking", "tasks · errors · readiness"],
    ] as [string, string][],
  },
] as const;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  // useLayoutEffect fires before the browser paints so the value is correct
  // on the first frame — avoids the one-render lag of useEffect on Windows.
  React.useLayoutEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = React.useState(0);

  // Always cycle — reduced motion suppresses the animation, not the content switch.
  React.useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % PILLARS.length), 4200);
    return () => clearInterval(id);
  }, []);

  const pillar = PILLARS[index];

  return (
    <section className="relative flex min-h-[92vh] flex-col overflow-hidden text-foreground">
      {/* Top meta hairline */}
      <div className="mx-auto w-full max-w-6xl px-5 pt-28 md:pt-32">
        <div className="flex items-center justify-between border-t border-border pt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground sm:text-[11px]">
          <span>ArkaForge - Video Games Engineering Studio</span>
          <span className="hidden sm:block">US-fronted · UE5 / Unity</span>
        </div>
      </div>

      {/* Main */}
      <div className="mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 items-center gap-10 px-5 py-14 md:py-20 lg:grid-cols-[1.4fr_1fr]">
        {/* ── Left: switching offer + persistent clarity ── */}
        <div>
          {/* Switching index + audience */}
          <div className="mb-6 flex h-4 items-center font-mono text-[11px] uppercase tracking-[0.18em]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-3"
              >
                <span className="text-primary">{pillar.index}</span>
                <span className="h-px w-8 bg-border" />
                <span className="text-muted-foreground">{pillar.audience}</span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Switching headline */}
          <h1 className="font-grotesk text-[clamp(2.2rem,5.6vw,4rem)] font-semibold leading-[1.05] tracking-[-0.02em]">
            <span className="sr-only">
              We co-develop games, and build digital twins for high-stakes
              training.
            </span>
            <span aria-hidden className="block min-h-[2.1em]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: "0.35em" }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: "-0.35em" }}
                  transition={{ duration: 0.45, ease }}
                  className="block"
                >
                  {pillar.pre}
                  <br />
                  <span className="text-primary">{pillar.word}</span>.
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          {/* Persistent subhead - always names both offers, co-dev first */}
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            A video games engineering studio -{" "}
            <span className="text-foreground">game co-development</span> for
            studios and publishers, and{" "}
            <span className="text-foreground">digital twins</span> for
            high-stakes training. Built in UE5 and Unity.
          </p>

          {/* CTAs */}
          <div className="mt-9 flex flex-row flex-wrap items-center gap-x-4 gap-y-3">
            <a
              href="https://calendar.app.google/9HXdsiKfCXCPeUya9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Schedule a call
              <Phone className="h-4 w-4" />
            </a>
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-foreground"
            >
              See our work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* ── Right: switching datasheet panel (fills the space) ── */}
        <div className="hidden lg:block">
          <div className="relative rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm">
            <div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/60">
              <span>// {pillar.index} · spec</span>
              <span className="flex items-center gap-1.5 text-primary">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary motion-safe:animate-pulse" />
                active
              </span>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease }}
              >
                <p className="font-grotesk text-lg font-semibold">
                  {pillar.specTitle}
                </p>
                <dl className="mt-4 space-y-2.5 font-mono text-xs">
                  {pillar.specs.map(([k, v]) => (
                    <div
                      key={k}
                      className="flex items-baseline justify-between gap-4 border-b border-border/60 pb-2.5"
                    >
                      <dt className="text-muted-foreground/70">{k}</dt>
                      <dd className="text-right text-foreground/90">{v}</dd>
                    </div>
                  ))}
                </dl>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Bottom meta hairline */}
      <div className="mx-auto w-full max-w-6xl px-5 pb-6">
        <div className="flex items-center justify-between border-t border-border pt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">
          <span>Game engineering &amp; digital twins</span>
          <span className="tabular-nums">01 - 02</span>
        </div>
      </div>
    </section>
  );
}
