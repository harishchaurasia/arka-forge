"use client";

import { motion } from "framer-motion";

const ease = [0.25, 0.1, 0.25, 1];

export function VisionSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Ambient glow background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[300px] rounded-full bg-primary/10 blur-[100px] opacity-50" />
      </div>

      <div className="relative mx-auto max-w-2xl px-5 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
        >
          <span className="glass-pill text-xs font-semibold uppercase tracking-widest mb-6 inline-block">
            Vision
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            <span className="gradient-text">
              Building Toward Intelligent Simulation
            </span>
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            Today, ArkaForge is focused on winning and delivering high-value
            simulation and learning work. Over time, we&apos;re building toward
            deeper digital twin systems, intelligent environments, and broader
            interactive products that close the gap between training and
            operational reality.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
