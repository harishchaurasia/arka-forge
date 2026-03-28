"use client";

import { motion } from "framer-motion";
import {
  FlaskConical,
  ShieldCheck,
  Brain,
  BarChart2,
  Zap,
  Target,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface WhyItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

const items: WhyItem[] = [
  {
    title: "Practice Before Real Stakes",
    description:
      "Learners engage with real scenarios before they face them in the field.",
    icon: FlaskConical,
  },
  {
    title: "Safer Mistakes",
    description:
      "Errors happen in the simulation, not on the job. No downtime, no risk.",
    icon: ShieldCheck,
  },
  {
    title: "Stronger Understanding",
    description:
      "Active engagement builds deeper comprehension than passive instruction.",
    icon: Brain,
  },
  {
    title: "Measurable Learning",
    description:
      "Performance data, scoring, and analytics show exactly what was learned.",
    icon: BarChart2,
  },
  {
    title: "Higher Engagement",
    description:
      "Game mechanics and interactivity keep learners focused and motivated.",
    icon: Zap,
  },
  {
    title: "Better Decision Readiness",
    description:
      "Repeated practice under simulated pressure builds confident, faster decision-making.",
    icon: Target,
  },
];

const ease = [0.25, 0.1, 0.25, 1];

export function WhyItMatters() {
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
          <span className="glass-pill text-xs font-semibold uppercase tracking-widest text-primary/70 mb-3 inline-block">
            Why This Matters
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 gradient-text">
            Practice Before the Stakes Are Real
          </h2>
          <p className="text-base text-muted-foreground max-w-md mx-auto">
            Passive training doesn&apos;t build readiness. Simulation does.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
                <div className="h-full glass-card p-6 transition-all duration-300 hover:-translate-y-1.5">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl glass-icon mb-4 group-hover:scale-105 transition-transform duration-300">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="text-base font-semibold mb-2 group-hover:text-primary transition-colors">
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
