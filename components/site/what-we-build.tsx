"use client";

import { motion } from "framer-motion";
import { Boxes, Cpu, Gamepad2, GitMerge } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface WhatWeBuildItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

const items: WhatWeBuildItem[] = [
  {
    title: "Simulation & Training",
    description:
      "Workers practice inside digital environments before touching real equipment. Faster onboarding, zero risk, unlimited repetitions.",
    icon: Cpu,
  },
  {
    title: "Game-Based Learning",
    description:
      "Scoring, branching scenarios, and performance analytics layered onto training to drive engagement and measure readiness.",
    icon: Gamepad2,
  },
  {
    title: "Digital Twins",
    description:
      "Interactive replicas of real systems and workflows that behave like the real thing. Train and test before the stakes are real.",
    icon: GitMerge,
  },
  {
    title: "XR & Spatial",
    description:
      "Training delivered in VR, AR, and mixed reality — across headsets, desktop, web, and mobile.",
    icon: Boxes,
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
            Capabilities
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            What We Deliver
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
            Simulation, game-based learning, and digital twins for
            manufacturing, energy, defense, and research.
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
