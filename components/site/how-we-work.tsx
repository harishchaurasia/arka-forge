"use client";

import { motion } from "framer-motion";
import { Clock, UserCheck, GitBranch, ClipboardCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ease = [0.25, 0.1, 0.25, 1];

const points: { title: string; body: string; icon: LucideIcon }[] = [
  {
    title: "Real overlap, every day",
    body:
      "{{OVERLAP_HOURS}}+ hours of daily overlap with US and EU working hours — not “we'll get to it tomorrow.” Stand-ups, reviews, and turnaround on your clock.",
    icon: Clock,
  },
  {
    title: "One point of contact",
    body:
      "A named project lead owns the relationship and the delivery. You're working with a team, not managing a pool.",
    icon: UserCheck,
  },
  {
    title: "Your pipeline, your standards",
    body:
      "Your repo, your engine version, your tools, your review process, your quality bar. We adapt to how you build — not the other way around.",
    icon: GitBranch,
  },
  {
    title: "Scoped before it starts",
    body:
      "Every engagement opens with a scoping call: the work, the milestones, the delivery bar — defined before anyone writes a line.",
    icon: ClipboardCheck,
  },
];

export function HowWeWork() {
  return (
    <section className="py-28 md:py-36 relative">
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] rounded-full bg-primary/[0.03] blur-[140px] pointer-events-none" />
      <div className="relative mx-auto max-w-6xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="mb-14 max-w-2xl"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary/70 mb-3 block">
            How we work
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Built to work with teams in the US, UK, and EU
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            We're a distributed studio, and we run it so distance is a non-issue
            — because for the studios that hire co-dev partners, it's the first
            thing they worry about.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2">
          {points.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease }}
              >
                <div className="h-full glass-card p-7 flex items-start gap-4">
                  <div className="flex-shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-xl glass-icon">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold mb-2">{p.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {p.body}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
