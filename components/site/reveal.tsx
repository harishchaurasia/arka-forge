"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import type { ReactNode } from "react";

// Shared scroll-in reveal: fade + lift, fires once on enter.
// Degrades to a plain wrapper when the visitor prefers reduced motion.
// Uses useInView hook + a 2s fallback timer so content is never permanently
// invisible when IntersectionObserver misfires (e.g. Windows DPI-scaling bug).
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
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [forceVisible, setForceVisible] = useState(false);

  // Safety net: if IntersectionObserver never fires (seen on Windows with
  // certain DPI / zoom configurations), reveal after 2s so content is never
  // permanently invisible.
  useEffect(() => {
    if (isInView) return;
    const timer = setTimeout(() => setForceVisible(true), 2000);
    return () => clearTimeout(timer);
  }, [isInView]);

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const visible = isInView || forceVisible;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.5, delay, ease }}
    >
      {children}
    </motion.div>
  );
}
