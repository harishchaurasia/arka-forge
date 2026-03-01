"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";

const HeroScene = dynamic(
  () => import("@/components/webgl/hero-scene").then((m) => ({ default: m.HeroScene })),
  { ssr: false, loading: () => null }
);

const ease = [0.25, 0.1, 0.25, 1];

export function Hero() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/3 right-1/4 w-[700px] h-[700px] rounded-full bg-primary/[0.07] blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-accent/[0.05] blur-[120px] pointer-events-none" />

      {/* WebGL scene — right side, large and visible */}
      <div className="absolute right-[-5%] top-[-5%] bottom-[-5%] w-[65%] pointer-events-none opacity-40 md:opacity-50">
        {mounted && (
          <React.Suspense fallback={null}>
            <HeroScene />
          </React.Suspense>
        )}
      </div>

      {/* Content — left aligned */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 py-28 md:py-36">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <span className="inline-block mb-8 px-4 py-2 text-xs font-medium tracking-widest uppercase text-primary/90 rounded-full glass-pill">
              Engineering-First Game-Tech Studio
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6"
          >
            Forging<br />
            Intelligent{" "}
            <span className="gradient-text">Worlds</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-md"
          >
            We build simulation systems, real-time engines, and spatial computing
            platforms for the world&apos;s most demanding applications.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease }}
            className="flex flex-wrap gap-4"
          >
            <Button asChild size="lg" className="glow px-8">
              <Link href="/contact">
                Get in Touch <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8">
              <Link href="/work">View Our Work</Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
