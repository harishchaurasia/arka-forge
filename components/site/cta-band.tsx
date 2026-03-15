"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ease = [0.25, 0.1, 0.25, 1];

export function CTABand() {
  return (
    <section className="py-28 md:py-36 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.06] blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
          className="glass-card p-12 md:p-20 text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary/70 mb-4 block">
            Let&apos;s Build Together
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">
            Build with <span className="gradient-text">Arka Forge</span>
          </h2>
          <p className="text-base text-muted-foreground mb-10 max-w-md mx-auto leading-relaxed">
            Need digital twins of your systems, simulation-based training, or workforce readiness analytics? We work with organizations across manufacturing, robotics, energy, and defense.
          </p>
          <Button asChild size="lg" className="glow px-8">
            <Link href="/contact">
              Get in Touch <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
