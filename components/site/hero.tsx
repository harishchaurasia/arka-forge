"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import dynamic from "next/dynamic";

const HeroScene = dynamic(
  () =>
    import("@/components/webgl/hero-scene").then((m) => ({
      default: m.HeroScene,
    })),
  { ssr: false, loading: () => null },
);

const ease = [0.25, 0.1, 0.25, 1];

export function Hero() {
  const [mounted, setMounted] = React.useState(false);
  const [hideHeroVisual, setHideHeroVisual] = React.useState(false);

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setHideHeroVisual(params.get("constrained") === "1");
  }, []);

  React.useEffect(() => setMounted(true), []);

  return (
    <section
      className={`relative flex pt-24 md:pt-24 ${
        hideHeroVisual
          ? "min-h-[68vh] md:min-h-[72vh] items-center pb-12 md:pb-10"
          : "min-h-[88vh] items-start md:items-center pb-16 md:pb-0"
      }`}
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/3 right-1/4 w-[700px] h-[700px] rounded-full bg-primary/[0.03] blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-accent/[0.02] blur-[120px] pointer-events-none" />

      {/* WebGL scene - right side, large and visible on desktop */}
      {!hideHeroVisual && (
        <div className="absolute right-[-5%] top-[-5%] bottom-[-5%] w-[65%] pointer-events-none opacity-16 md:opacity-18 hidden md:block">
          {mounted && (
            <React.Suspense fallback={null}>
              <HeroScene />
            </React.Suspense>
          )}
        </div>
      )}

      {/* Content - centered on mobile */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5">
        <div
          className={`flex flex-col items-center gap-6 text-center ${
            hideHeroVisual
              ? "max-w-4xl mx-auto"
              : "max-w-2xl md:text-left md:items-start"
          }`}
        >
          {!hideHeroVisual && (
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
          )}

          {!hideHeroVisual && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="hidden md:block"
            >
              <span className="inline-block mb-2 px-3 py-1.5 text-[10px] sm:text-[11px] font-medium tracking-[0.16em] uppercase text-primary/90 rounded-full glass-pill font-display">
                Game Co-Dev · UE5 / Unity · AI Systems · Digital Twins
              </span>
            </motion.div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] font-sans ${
              hideHeroVisual ? "mt-6 md:mt-8" : ""
            }`}
          >
            Forging
            <br />
            <span className="gradient-text">Intelligent Worlds</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className={hideHeroVisual ? "" : "md:hidden"}
          >
            <span className="inline-block px-3 py-1.5 text-[10px] sm:text-[11px] font-medium tracking-[0.16em] uppercase text-primary/90 rounded-full glass-pill font-display">
              Game Co-Dev · UE5 / Unity · AI Systems · Digital Twins
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease }}
            className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-md md:max-w-lg"
          >
            Game co-development studio. End-to-end UE5 and Unity development
            for studios and publishers - features, systems, AI, vertical slices,
            serious games. Built by engineers who also ship digital twins for
            high-stakes industries.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease }}
            className={`inline-flex flex-col md:flex-row md:items-center items-stretch gap-4 ${
              hideHeroVisual ? "justify-center" : ""
            }`}
          >
            <Button
              asChild
              size="lg"
              className="glow py-6 text-base font-semibold w-full"
            >
              <a
                href="https://calendar.app.google/9HXdsiKfCXCPeUya9"
                target="_blank"
                rel="noopener noreferrer"
                className="justify-center"
              >
                Schedule a Call
                <Phone className="h-4 w-4" />
              </a>
            </Button>
            <div
              className={`flex justify-center gap-3 ${
                hideHeroVisual ? "" : "md:justify-start"
              }`}
            >
              <Button
                asChild
                size="lg"
                variant="outline"
                className="px-8 flex-1 sm:flex-none font-display"
              >
                <Link href="/work">
                  See Our Work <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
