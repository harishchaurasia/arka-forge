"use client";

import { motion } from "framer-motion";

const ease = [0.25, 0.1, 0.25, 1];

export function CoreBelief() {
  return (
    <section className="py-28 md:py-36 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/[0.04] blur-[140px] pointer-events-none" />
      <div className="relative mx-auto max-w-4xl px-5 text-center">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease }}
          className="text-xs font-semibold uppercase tracking-widest text-primary/70 mb-6 block"
        >
          The Core Belief
        </motion.span>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight leading-[1.25]"
        >
          The future of training is not more content. It&apos;s better systems.
        </motion.p>
      </div>
    </section>
  );
}
