"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Cpu, Code, Boxes, Sparkles, ArrowUpRight } from "lucide-react";

const capabilities = [
  {
    title: "Simulation Systems",
    description: "Large-scale simulation infrastructure for training, research, and entertainment.",
    href: "/technology/simulation",
    icon: Cpu,
  },
  {
    title: "Engine & Tooling",
    description: "Custom game engines, optimization tools, and development pipelines.",
    href: "/technology/engine",
    icon: Code,
  },
  {
    title: "XR / Spatial",
    description: "Immersive experiences for AR, VR, and mixed reality platforms.",
    href: "/technology/xr",
    icon: Boxes,
  },
  {
    title: "Applied AI",
    description: "Intelligent systems for behavior simulation and procedural generation.",
    href: "/technology",
    icon: Sparkles,
  },
];

const ease = [0.25, 0.1, 0.25, 1];

export function CapabilitiesGrid() {
  return (
    <section className="py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="mb-14"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary/70 mb-3 block">
            Capabilities
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">What We Forge</h2>
          <p className="text-base text-muted-foreground max-w-md">
            Core technical capabilities that power everything we build.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={cap.href}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease }}
              >
                <Link href={cap.href} className="group block h-full">
                  <div className="h-full glass-card p-6 transition-all duration-300 hover:-translate-y-1.5">
                    <div className="mb-5 inline-flex items-center justify-center w-12 h-12 rounded-xl glass-icon">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-[15px] font-semibold mb-2 group-hover:text-primary transition-colors flex items-center gap-1.5">
                      {cap.title}
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 -translate-y-0.5 translate-x-[-2px] group-hover:opacity-60 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{cap.description}</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
