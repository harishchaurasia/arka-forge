"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Boxes, Layers, Gauge } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ease = [0.25, 0.1, 0.25, 1];

interface Pillar {
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  cta: string;
  icon: LucideIcon;
}

// The two co-equal pillars the studio leads with.
const pillars: Pillar[] = [
  {
    eyebrow: "For studios & publishers",
    title: "Game co-development",
    body: "Embed us in your UE5 or Unity pipeline as a senior co-dev partner - features, systems, AI and agentic NPCs, netcode, tools, UI, plus prototypes and vertical slices that turn a pitch into a build a publisher will sit through. Scoped to your roadmap, shipped to your bar.",
    href: "/services/game-co-development",
    cta: "How co-dev works",
    icon: Layers,
  },
  {
    eyebrow: "For high-stakes, hands-on work",
    title: "Digital twins",
    body: "Immersive digital twins of real procedures, built in a game engine for high-stakes training - interactive environments, task-sequence logic, real-time error detection and readiness scoring. The depth behind a performance-tracked nuclear glovebox trainer.",
    href: "/work/los-alamos-asu-simulation",
    cta: "See the proof",
    icon: Gauge,
  },
];

// Supporting line - the cash-flow on-ramp, deliberately ranked below the pillars.
const supporting = {
  eyebrow: "Also",
  title: "Interactive products",
  body: "Game-engine craft beyond games - gamified products and onboarding, configurators, interactive 3D and data experiences. Things people use, not pages they skim.",
  href: "/services/interactive-products",
  cta: "What we build",
  icon: Boxes,
};

export function WhatWeDo() {
  return (
    <section
      id="what-we-do"
      className="relative bg-background py-24 text-foreground md:py-32"
    >
      <div className="relative mx-auto max-w-6xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease }}
          className="mb-12 max-w-2xl"
        >
          <span className="mb-3 block font-mono text-xs font-medium uppercase tracking-wider text-primary">
            What we do
          </span>
          <h2 className="mb-4 font-grotesk text-3xl font-bold tracking-tight md:text-4xl">
            One engine room. Two specialties.
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
            Game co-development for studios and publishers, and digital twins
            for high-stakes training, built in the same engines - plus
            interactive products for teams outside games.
          </p>
        </motion.div>

        {/* Two primary pillars */}
        <div className="grid auto-rows-fr gap-5 md:grid-cols-2">
          {pillars.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                className="h-full"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.08, ease }}
              >
                <Link href={item.href} className="group flex h-full flex-col">
                  <div className="panel-brackets flex h-full flex-1 flex-col rounded-xl border border-border bg-card p-8 ring-1 ring-primary/15 transition-all duration-300 hover:-translate-y-1.5 hover:ring-primary/30">
                    <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/5 text-primary transition-transform duration-300 group-hover:scale-105">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="mb-1.5 block font-mono text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                      {item.eyebrow}
                    </span>
                    <h3 className="mb-3 flex items-center gap-1.5 text-xl font-semibold transition-colors group-hover:text-primary">
                      {item.title}
                      <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-60" />
                    </h3>
                    <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {item.body}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                      {item.cta} <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Supporting third - interactive products */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, delay: 0.16, ease }}
          className="mt-5"
        >
          <Link href={supporting.href} className="group block">
            <div className="flex items-center gap-5 rounded-xl border border-border bg-card/60 p-6 transition-colors duration-300 hover:bg-card">
              <div className="hidden h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground sm:inline-flex">
                <supporting.icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <span className="mb-1 block font-mono text-[10px] font-medium uppercase tracking-wider text-muted-foreground/80">
                  {supporting.eyebrow}
                </span>
                <h3 className="text-base font-semibold transition-colors group-hover:text-primary">
                  {supporting.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {supporting.body}
                </p>
              </div>
              <span className="hidden flex-shrink-0 items-center gap-1.5 self-center whitespace-nowrap text-sm font-semibold text-primary sm:inline-flex">
                {supporting.cta} <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
