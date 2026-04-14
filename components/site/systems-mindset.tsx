"use client";

import * as React from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

import {
  Gamepad2,
  TrendingUp,
  BadgeDollarSign,
  Globe2,
  Layers3,
} from "lucide-react";

interface WhyItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

const items: WhyItem[] = [
  {
    title: "Game-Tech Mindset",
    description:
      "We apply the design principles that make games engaging to the training problems that matter most.",
    icon: Gamepad2,
  },
  {
    title: "Stronger Than Passive E-Learning",
    description:
      "Our simulations produce measurably better engagement, retention, and readiness than slide-based instruction.",
    icon: TrendingUp,
  },
  {
    title: "Premium Execution, Efficient Delivery",
    description:
      "High-quality output with India-based production efficiency - without compromising on craft.",
    icon: BadgeDollarSign,
  },
  {
    title: "Global Client Readiness",
    description:
      "U.S.-accessible, globally capable. We work with organizations across markets and time zones.",
    icon: Globe2,
  },
  {
    title: "Digital Twin Depth When You Need It",
    description:
      "For high-fidelity requirements, we go deeper - intelligent environments, operational analytics, and system-accurate simulation.",
    icon: Layers3,
  },
];

const ease = [0.25, 0.1, 0.25, 1];

export function SystemsMindset() {
  const firstRow = items.slice(0, 3);
  const secondRow = items.slice(3);

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
            Why ArkaForge
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            A Different Kind of Training Partner
          </h2>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            We bring game-tech thinking to real-world training problems - with
            the execution quality and delivery efficiency to back it up.
          </p>
        </motion.div>

        {/* Row 1 - 3 columns */}
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 mb-5">
          {firstRow.map((item, i) => (
            <WhyCard key={item.title} item={item} index={i} />
          ))}
        </div>

        {/* Row 2 - 2 columns, centered */}
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-2 md:max-w-2xl md:mx-auto">
          {secondRow.map((item, i) => (
            <WhyCard key={item.title} item={item} index={firstRow.length + i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyCard({ item, index }: { item: WhyItem; index: number }) {
  const Icon = item.icon;
  const ease = [0.25, 0.1, 0.25, 1];
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease }}
      className="group"
    >
      <div className="h-full text-center glass-card p-8 transition-all duration-300 hover:-translate-y-1.5">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl glass-icon mb-5 group-hover:scale-105 transition-transform duration-300">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors">
          {item.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}
