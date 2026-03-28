"use client";

import { motion } from "framer-motion";
import {
  Users,
  UserPlus,
  ShieldAlert,
  GraduationCap,
  GitBranch,
  Cpu,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface UseCaseItem {
  label: string;
  description: string;
  icon: LucideIcon;
}

const items: UseCaseItem[] = [
  {
    label: "Workforce Training",
    description:
      "Onboarding, upskilling, and continuous training for frontline and technical teams.",
    icon: Users,
  },
  {
    label: "Onboarding & Process Learning",
    description:
      "Get new hires productive faster with simulation-based process walkthroughs.",
    icon: UserPlus,
  },
  {
    label: "Safety & Compliance",
    description:
      "Train for hazardous scenarios, emergency procedures, and compliance requirements — without real-world risk.",
    icon: ShieldAlert,
  },
  {
    label: "Technical Education & Skilling",
    description:
      "Build deep technical competency through hands-on simulation of complex systems.",
    icon: GraduationCap,
  },
  {
    label: "Operational Simulations",
    description:
      "Rehearse critical operations, decision trees, and workflows before execution.",
    icon: GitBranch,
  },
  {
    label: "Equipment & Systems Familiarization",
    description:
      "Let teams interact with equipment and systems digitally before physical access.",
    icon: Cpu,
  },
];

const ease = [0.25, 0.1, 0.25, 1];

export function UseCases() {
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
            Who It&apos;s For
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 gradient-text">
            Built for Organizations That Train for Real
          </h2>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            From workforce onboarding to high-stakes operational readiness — if
            your training needs to reflect reality, we can build it.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
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
                    {item.label}
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
