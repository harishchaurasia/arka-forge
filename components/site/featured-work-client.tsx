"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Layers } from "lucide-react";
import type { WorkPost } from "@/lib/content/loader";

const ease = [0.25, 0.1, 0.25, 1];

const placeholders = [
  {
    title: "Building Digital Twins for Manufacturing",
    description:
      "We're actively scoping and building digital twin systems for real manufacturing workflows. Case studies coming as projects ship.",
    tags: ["manufacturing", "in progress"],
    client: null as string | null,
  },
];

export function FeaturedWorkClient({ work }: { work: WorkPost[] }) {
  const featured = work.slice(0, 2);
  const hasContent = featured.length > 0;
  const items = hasContent
    ? featured.map((item) => ({
        title: item.frontmatter.title,
        description: item.frontmatter.description,
        tags: item.frontmatter.tags.slice(0, 3),
        client: item.frontmatter.client || null,
        href: `/work/${item.slug}`,
        date: item.frontmatter.date,
      }))
    : placeholders.map((p) => ({
        ...p,
        href: "/work",
        date: null as string | null,
      }));

  return (
    <section className="py-28 md:py-36 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.001] via-white/[0.002] to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-12"
        >
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary/70 mb-3 block">
              Portfolio
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              Work
            </h2>
            <p className="text-base text-muted-foreground max-w-md">
              We&apos;re actively building digital twins for real organizations.
              Case studies coming as projects ship.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="hidden sm:inline-flex gap-1.5"
          >
            <Link href="/work">
              View All <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease }}
            >
              <Link href={item.href} className="group block h-full">
                <article className="h-full glass-card p-7 transition-all duration-300 hover:-translate-y-1.5">
                  {!hasContent && (
                    <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-lg glass-icon">
                      <Layers className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    {item.description}
                  </p>
                  {item.client && (
                    <p className="text-xs font-medium text-primary mb-4">
                      {item.client}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] px-2.5 py-1 rounded-full glass-pill text-primary/80 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {item.date && (
                    <time className="block mt-4 text-xs text-muted-foreground">
                      {new Date(item.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                  )}
                </article>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Button asChild variant="outline" size="sm">
            <Link href="/work">View All Work</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
