"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";

const ease = [0.25, 0.1, 0.25, 1];

export function CTABand() {
  return (
    <section className="py-28 md:py-36 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.06] blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-5">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="glass-card p-12 md:p-20 text-center"
        >
          <span className="font-mono text-xs font-medium uppercase tracking-wider text-primary/70 mb-4 block">
            Let&apos;s talk
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">
            Tell us what you&apos;re <span className="gradient-text">building</span>
          </h2>
          <p className="text-base text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
            A game in production and not enough hands. A pitch that needs a
            vertical slice. A product that should be an experience. If it runs on
            a game engine — or should — we want to hear about it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="glow px-8">
              <a
                href="https://calendar.app.google/9HXdsiKfCXCPeUya9"
                target="_blank"
                rel="noopener noreferrer"
              >
                Schedule a Call
                <Phone className="h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="glass-subtle"
              className="glow px-8"
            >
              <Link href="/contact">
                Get In Touch <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
