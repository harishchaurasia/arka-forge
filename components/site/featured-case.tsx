"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ease = [0.25, 0.1, 0.25, 1];

const tags = [
  "simulation",
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
          className="mb-10 flex items-end justify-between"
        >
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary/70 mb-3 block">
              Portfolio
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Work
            </h2>
          </div>
          <Link
            href="/work"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            View All →
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease }}
          className="glass-card p-6 md:p-8 max-w-xl"
        >
          <h3 className="text-lg md:text-xl font-bold tracking-tight mb-5 leading-tight">
            Simulation & Digital Twin Development
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-2xl">
            Game-modified simulation for nuclear glovebox workforce training at
            Los Alamos National Laboratory, in partnership with ASU School of
            Manufacturing Systems and Networks. Built by Arka Forge founder
            Harish in his capacity as a graduate researcher at ASU.
          </p>
          <p className="text-sm text-foreground/80 mb-4">
            Los Alamos National Laboratory × ASU
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
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
            View case study <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
