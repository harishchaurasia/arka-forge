"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Monitor, Layers, Gamepad2, Building2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface WhatWeBuildItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

const items: WhatWeBuildItem[] = [
  {
    title: "Interactive Training Experiences",
    description:
      "Scenario-driven simulations where learners make decisions, face consequences, and build real competency.",
    icon: Monitor,
  },
  {
    title: "Simulation Environments",
    description:
      "Faithful digital replicas of real systems, equipment, and workflows — built for practice, not just observation.",
    icon: Layers,
  },
  {
    title: "Game-Based Learning Products",
    description:
      "Structured learning delivered through game mechanics: scoring, branching, feedback loops, and measurable outcomes.",
    icon: Gamepad2,
  },
  {
    title: "Immersive Operational Learning Systems",
    description:
      "High-fidelity environments for operational readiness, safety training, and systems familiarization.",
    icon: Building2,
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
          className="text-center mb-14"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary/70 mb-3 block">
            What We Build
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Interactive Experiences for Real-World Training
          </h2>
          <p className="text-base text-muted-foreground max-w-md mx-auto">
            We design and build training products that put people inside the
            system — not just in front of a slide deck.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2">
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
