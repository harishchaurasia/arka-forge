"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Gauge, Zap, CheckCircle2 } from "lucide-react";

const principles = [
  {
    title: "Learn by Playing",
    description: "Games create motivation, repetition, and feedback loops that traditional training can't match. People retain more when they're engaged.",
    icon: Gauge,
  },
  {
    title: "Safe, Repeatable Practice",
    description: "Workers practice inside game-based simulations before touching real equipment. Zero downtime, zero risk, unlimited repetitions.",
    icon: CheckCircle2,
  },
  {
    title: "Measurable Readiness",
    description: "Scoring, analytics, and performance tracking built into every experience. Know who's ready — don't guess.",
    icon: Zap,
  },
];

const ease = [0.25, 0.1, 0.25, 1];

export function SystemsMindset() {
  return (
    <section className="py-28 md:py-36 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.01] via-white/[0.02] to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-14"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary/70 mb-3 block">
            Philosophy
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Why Games for Learning</h2>
          <p className="text-base text-muted-foreground max-w-md mx-auto">
            Game-based training is proven to accelerate skill acquisition, improve retention, and reduce operational errors.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          {principles.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease }}
                className="group"
              >
                <div className="text-center glass-card p-8 transition-all duration-300 hover:-translate-y-1.5">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl glass-icon mb-5 group-hover:scale-105 transition-transform duration-300">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
