"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
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
    <section className="relative min-h-[88vh] flex items-start md:items-center overflow-hidden pt-20 pb-16 md:pt-16 md:pb-0">
      {/* Background ambient glow */}
      <div className="absolute top-1/3 right-1/4 w-[700px] h-[700px] rounded-full bg-primary/[0.07] blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-accent/[0.05] blur-[120px] pointer-events-none" />

      {/* WebGL scene — right side, large and visible on desktop */}
      <div className="absolute right-[-5%] top-[-5%] bottom-[-5%] w-[65%] pointer-events-none opacity-40 md:opacity-50 hidden md:block">
        {mounted && (
          <React.Suspense fallback={null}>
            <HeroScene />
          </React.Suspense>
        )}
      </div>

      {/* Content — centered on mobile */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5">
        <div className="max-w-2xl text-center md:text-left flex flex-col items-center md:items-start gap-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="relative h-52 w-52 sm:h-64 sm:w-64 md:hidden"
          >
            <div className="absolute inset-0 rounded-full bg-primary/[0.08] blur-2xl" />
            {mounted && (
              <React.Suspense fallback={null}>
                <HeroScene />
              </React.Suspense>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <span className="inline-block mb-2 px-4 py-2 text-xs font-medium tracking-widest uppercase text-primary/90 rounded-full glass-pill">
              Digital Twins · Simulation · Workforce Training
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]"
          >
            Forging{" "}<br className="hidden sm:block" />
            Intelligent{" "}
            <span className="gradient-text">Worlds</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease }}
            className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-md md:max-w-lg"
          >
            We build digital twins of real-world systems — interactive replicas that
            let organizations train, test, and optimize before touching real equipment.
            Delivered across AR/VR, desktop, and web.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease }}
            className="inline-flex flex-col items-stretch gap-4"
          >
            <div className="flex justify-center md:justify-start gap-3">
              <Button asChild size="lg" variant="outline" className="px-8 flex-1 sm:flex-none">
                <Link href="/contact">
                  Get in Touch <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-8 flex-1 sm:flex-none">
                <Link href="/work">View Our Work</Link>
              </Button>
            </div>
            <Button asChild size="lg" className="glow py-6 text-base font-semibold w-full">
              <a href="https://calendar.app.google/9HXdsiKfCXCPeUya9" target="_blank" rel="noopener noreferrer" className="justify-center">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule a Meeting
              </a>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
