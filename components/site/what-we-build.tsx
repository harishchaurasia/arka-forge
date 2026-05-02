"use client";

import { motion } from "framer-motion";
import { Cpu, Gamepad2, Joystick, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface WhatWeBuildItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

const items: WhatWeBuildItem[] = [
  {
    title: "Features & Systems",
    description:
      "Embed into your UE5 or Unity pipeline as a senior co-dev partner. Combat, AI, netcode, tools, UI - scoped sprints that ship to your quality bar.",
    icon: Cpu,
  },
  {
    title: "Prototypes & Vertical Slices",
    description:
      "Fixed-bid playable builds that take a pitch deck to a demo. For studios validating ideas, indies pitching publishers, or non-game teams entering interactive.",
    icon: Joystick,
  },
  {
    title: "AI & Agentic Systems",
    description:
      "LLM-driven NPCs, agentic behaviors, generative content pipelines. Built by an AI/ML engineer - this is where ArkaForge is most defensible.",
    icon: Sparkles,
  },
  {
    title: "Serious Games & Gamification",
    description:
      "Game design applied to non-game products - scoring, branching scenarios, progression. The bridge between entertainment and operational training.",
    icon: Gamepad2,
  },
];

const ease = [0.25, 0.1, 0.25, 1];

export function WhatWeBuild() {
  return (
    <section className="py-28 md:py-36 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.001] via-white/[0.002] to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="mb-14"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary/70 mb-3 block">
            Game Co-Development
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            End-to-End UE5 &amp; Unity
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
            Concept to ship, or any slice of it. We embed into your pipeline as
            a senior co-development partner - features, systems, AI, prototypes,
            serious games. Scoped to fit your roadmap.
          </p>
        </motion.div>

        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease }}
                className="group"
              >
                <div className="h-full glass-card p-8 transition-all duration-300 hover:-translate-y-1.5">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl glass-icon mb-5 group-hover:scale-105 transition-transform duration-300">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
