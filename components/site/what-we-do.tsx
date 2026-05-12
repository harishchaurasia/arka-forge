"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Boxes, Layers, FlaskConical } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ease = [0.25, 0.1, 0.25, 1];

interface Item {
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  cta: string;
  icon: LucideIcon;
  primary?: boolean;
}

const items: Item[] = [
  {
    eyebrow: "For studios & publishers",
    title: "Game co-development",
    body:
      "Embed us into your UE5 or Unity pipeline as a senior co-dev partner. Features, systems, AI and agentic NPCs, netcode, tools, UI — plus prototypes and vertical slices that take a pitch deck to a build a publisher will sit through. Scoped to your roadmap, shipped to your quality bar.",
    href: "/services/game-co-development",
    cta: "How co-dev works",
    icon: Layers,
    primary: true,
  },
  {
    eyebrow: "For teams outside games",
    title: "Interactive products",
    body:
      "Game-engine craft applied beyond games — gamified products and onboarding, training simulations, configurators, interactive 3D and data experiences. For teams that need something people use, not a page they skim.",
    href: "/services/interactive-products",
    cta: "What we build",
    icon: Boxes,
  },
  {
    eyebrow: "Where this is headed",
    title: "Industrial simulation & digital twins",
    body:
      "We built a performance-tracked nuclear glovebox training simulator — interactive environment, custom task-sequence logic, real-time error detection and readiness scoring — as graduate research connected to Los Alamos National Laboratory. That work is the seed of where ArkaForge is built to go: industrial simulation and digital twins, with the same engine depth behind every game.",
    href: "/work/los-alamos-asu-simulation",
    cta: "See the case study",
    icon: FlaskConical,
  },
];

export function WhatWeDo() {
  return (
    <section className="py-28 md:py-36 relative" id="what-we-do">
      <div className="relative mx-auto max-w-6xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="mb-14"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary/70 mb-3 block">
            What we do
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            One engine room, two ways to hire it
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
            Co-develop a game with us, or commission an interactive product. Same
            engineers, same engines, same bar.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease }}
              >
                <Link href={item.href} className="group block h-full">
                  <div
                    className={`h-full glass-card p-8 transition-all duration-300 hover:-translate-y-1.5 ${
                      item.primary ? "ring-1 ring-primary/20" : ""
                    }`}
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl glass-icon mb-5 group-hover:scale-105 transition-transform duration-300">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground block mb-1.5">
                      {item.eyebrow}
                    </span>
                    <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors flex items-center gap-1.5">
                      {item.title}
                      <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-60 transition-opacity" />
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {item.body}
                    </p>
                    <span className="text-sm font-semibold text-primary inline-flex items-center gap-1.5">
                      {item.cta} <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
