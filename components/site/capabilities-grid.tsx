"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { GitMerge, Cpu, BarChart2, Sliders } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface AdvancedCapabilityItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

const capabilities: AdvancedCapabilityItem[] = [
  {
    title: "Digital Twins",
    description:
      "Accurate, interactive replicas of real systems — factories, equipment, workflows — that behave like the real thing.",
    icon: GitMerge,
  },
  {
    title: "Intelligent Environments",
    description:
      "Simulation environments that respond dynamically to learner behavior, operational inputs, and real-world data.",
    icon: Cpu,
  },
  {
    title: "Performance Analytics",
    description:
      "Built-in scoring, tracking, and analytics that measure readiness and surface training gaps.",
    icon: BarChart2,
  },
  {
    title: "Adaptive Systems",
    description:
      "Training that adjusts difficulty, scenarios, and feedback based on individual learner performance.",
    icon: Sliders,
  },
];

const ease = [0.25, 0.1, 0.25, 1];

export function CapabilitiesGrid() {
  return (
    <section className="py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="mb-14"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary/70 mb-3 block">
            Advanced Capabilities
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            When You Need More Fidelity
          </h2>
          <p className="text-base text-muted-foreground max-w-md">
            For organizations where simulation accuracy, operational realism,
            and intelligent environments matter — we go deeper.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2">
          {capabilities.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease }}
              >
                <div className="h-full glass-card p-6">
                  <div className="mb-5 inline-flex items-center justify-center w-12 h-12 rounded-xl glass-icon">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-[15px] font-semibold mb-2">
                    {cap.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {cap.description}
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
