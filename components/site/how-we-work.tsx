"use client";

import * as React from "react";
import { motion } from "framer-motion";

interface HowWeWorkStep {
  step: number;
  title: string;
  description: string;
}

const steps: HowWeWorkStep[] = [
  {
    step: 1,
    title: "Understand the System",
    description:
      "We start by mapping the real workflow, environment, or system your training needs to reflect.",
  },
  {
    step: 2,
    title: "Design the Training Experience",
    description:
      "We define learning objectives, scenarios, and interaction models before a line of code is written.",
  },
  {
    step: 3,
    title: "Build the Simulation",
    description:
      "We develop the interactive experience using game technology, simulation design, and immersive delivery.",
  },
  {
    step: 4,
    title: "Deploy and Refine",
    description:
      "We ship, measure, and iterate — using performance data to improve training outcomes over time.",
  },
];

const ease = [0.25, 0.1, 0.25, 1];

export function HowWeWork() {
  return (
    <section className="py-28 md:py-36 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.001] via-white/[0.002] to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-16"
        >
          <span className="glass-pill text-xs font-semibold uppercase tracking-widest text-primary/70 mb-3 inline-block px-3 py-1 rounded-full">
            How We Work
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-3">
            From System to Simulation
          </h2>
        </motion.div>

        {/* Desktop: horizontal stepper with connecting line */}
        <div className="hidden md:block relative">
          {/* Connecting line */}
          <div className="absolute top-10 left-[12.5%] right-[12.5%] h-px bg-border/40" />

          <div className="grid grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease }}
                className="flex flex-col items-center text-center"
              >
                {/* Step number circle (sits on the connecting line) */}
                <div className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full glass-card mb-6">
                  <span className="text-6xl font-bold text-muted-foreground/20 leading-none select-none">
                    {s.step}
                  </span>
                </div>

                <h3 className="text-base font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {s.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical stack */}
        <div className="flex flex-col gap-8 md:hidden">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease }}
              className="flex gap-5 items-start"
            >
              <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-full glass-card">
                <span className="text-4xl font-bold text-muted-foreground/20 leading-none select-none">
                  {s.step}
                </span>
              </div>
              <div className="pt-1">
                <h3 className="text-base font-semibold mb-1">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {s.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
