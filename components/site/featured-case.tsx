"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ease = [0.25, 0.1, 0.25, 1];

const tags = [
  "simulation",
  "digital twin",
  "game development",
  "unreal engine",
  "workforce training",
];

export function FeaturedCase() {
  return (
    <section className="py-28 md:py-36 relative">
      <div className="relative mx-auto max-w-6xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="mb-10"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary/70 mb-3 block">
            Work
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            What We&apos;ve Built
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease }}
          className="glass-card p-10 md:p-14"
        >
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-5 leading-tight">
            Nuclear Glovebox Training Simulator
          </h3>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6 max-w-3xl">
            A game-modified digital twin for workforce training at Los Alamos
            National Laboratory — built to replace passive instruction with
            interactive, performance-tracked simulation for precision nuclear
            operations.
          </p>
          <p className="text-sm text-foreground/80 mb-6">
            Los Alamos National Laboratory × ASU School of Manufacturing Systems
            and Networks
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {tags.map((t) => (
              <span
                key={t}
                className="text-xs uppercase tracking-wider px-3 py-1 rounded-full border border-primary/30 text-primary/90 bg-primary/[0.05]"
              >
                {t}
              </span>
            ))}
          </div>
          <Link
            href="/work/los-alamos-asu-simulation"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
          >
            Read the full case study <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
