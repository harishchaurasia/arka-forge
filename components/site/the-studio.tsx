"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ease = [0.25, 0.1, 0.25, 1];

export function TheStudio() {
  return (
    <section className="py-28 md:py-36 relative">
      <div className="relative mx-auto max-w-4xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="glass-card p-10 md:p-14"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary/70 mb-3 block">
            The studio
          </span>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-5">
            Founder-led. Built from a curated network.
          </h2>
          <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
            <p>
              ArkaForge is founder-led, with a core background spanning AI/ML and
              agentic systems, game development, AR/VR, full-stack engineering,
              and applied simulation — including the nuclear glovebox training
              work, connected to Los Alamos National Laboratory, that this
              company is built on.
            </p>
            <p>
              Around that core is a curated network of senior game engineers,
              developers, and designers we've worked with before. We assemble a
              project-fit team for the work in front of us. The team is scoped to
              the project — not the project to the team.
            </p>
          </div>
          <Link
            href="/company"
            className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
          >
            More about ArkaForge <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
