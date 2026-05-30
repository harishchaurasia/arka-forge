"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

// Shared scroll-in reveal: fade + lift, fires once on enter.
// Matches the easing the homepage already used inline, and degrades to a
// plain wrapper when the visitor prefers reduced motion (framer animates via
// JS transforms, which the globals.css reduced-motion block can't intercept).
const ease = [0.25, 0.1, 0.25, 1] as const;

interface RevealProps {
  children: ReactNode;
  /** Stagger offset in seconds for siblings. */
  delay?: number;
  /** Lift distance in px before settling. */
  y?: number;
  className?: string;
}

export function Reveal({ children, delay = 0, y = 12, className }: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease }}
    >
      {children}
    </motion.div>
  );
}
