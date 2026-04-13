"use client";

import { motion } from "framer-motion";

const ease = [0.25, 0.1, 0.25, 1];

export function ProofStrip() {
  return (
    <section className="py-6 border-y border-white/[0.06]">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease }}
        className="mx-auto max-w-6xl px-5"
      >
        <div className="flex flex-row flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground tracking-wide">
          <span>Simulation-Based Training</span>
          <span className="text-white/20">·</span>
          <span>Game-Based Learning</span>
          <span className="text-white/20">·</span>
          <span>Digital Twins</span>
          <span className="text-white/20">·</span>
          <span>UE5 · Unity</span>
          <span className="text-white/20">·</span>
          <span>XR & Spatial</span>
        </div>
      </motion.div>
    </section>
  );
}
