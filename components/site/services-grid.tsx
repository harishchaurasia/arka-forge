"use client";

import { motion } from "framer-motion";
import { Cpu, Gamepad2, Globe } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ServiceItem {
  title: string;
  description: string;
  detailTag: string;
  icon: LucideIcon;
  isDeep?: boolean;
}

const services: ServiceItem[] = [
  {
    title: "Simulation-Based Training",
    description:
      "We model your real systems, workflows, and environments - then build training simulations that let people practice inside them. Faster onboarding, fewer errors, measurable readiness.",
    detailTag: "Systems · Workflows · Equipment",
    icon: Cpu,
  },
  {
    title: "Game-Based Learning Experiences",
    description:
      "We apply game design - branching scenarios, scoring, feedback loops, and progression - to serious learning objectives. More engaging than e-learning. More effective than passive instruction.",
    detailTag: "Scenarios · Mechanics · Analytics",
    icon: Gamepad2,
  },
  {
    title: "Immersive Training Environments",
    description:
      "For organizations that need the highest fidelity - we build immersive environments that mirror operational reality. This includes digital twin-level simulation where system accuracy, performance analytics, and intelligent environments matter.",
    detailTag:
      "Digital Twins · Operational Fidelity · Intelligent Environments",
    icon: Globe,
    isDeep: true,
  },
];

const ease = [0.25, 0.1, 0.25, 1];

export function ServicesGrid() {
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
            Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Three Ways We Work With You
          </h2>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.12, ease }}
                className="group"
              >
                <div
                  className={`h-full glass-card p-9 transition-all duration-300 hover:-translate-y-1.5 flex flex-col${
                    service.isDeep ? " border border-primary/20" : ""
                  }`}
                >
                  {service.isDeep && (
                    <div className="mb-5">
                      <span className="glass-pill text-xs font-semibold text-primary px-3 py-1">
                        Advanced Capability
                      </span>
                    </div>
                  )}

                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl glass-icon mb-5 group-hover:scale-105 transition-transform duration-300">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>

                  <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                    {service.description}
                  </p>

                  <span className="text-xs text-muted-foreground/60 font-medium tracking-wide">
                    {service.detailTag}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
