"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, GitMerge } from "lucide-react";

const ease = [0.25, 0.1, 0.25, 1];

export function DigitalTwinsBand() {
  return (
    <section className="py-24 md:py-32 relative">
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] rounded-full bg-accent/[0.03] blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
          className="glass-card p-10 md:p-14"
        >
          <div className="grid gap-10 md:grid-cols-[auto,1fr] md:items-start">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl glass-icon">
              <GitMerge className="h-6 w-6 text-primary" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-primary/70 mb-3 block">
                Beyond Games
              </span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
                Digital Twins for High-Stakes Industries
              </h2>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6 max-w-2xl">
                Same engine work, harder constraints. We build interactive
                replicas of real systems and workflows for nuclear,
                manufacturing, energy, and defense - environments where the
                training has to be right before the equipment is touched. The
                technical depth that makes a digital twin trustworthy is the
                same depth that makes a co-dev partner worth keeping.
              </p>
              <Link
                href="/technology/digitaltwins"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
              >
                Read more <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
