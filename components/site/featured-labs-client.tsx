"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, FlaskConical } from "lucide-react";
import type { LabPost } from "@/lib/content/loader";

const ease = [0.25, 0.1, 0.25, 1];

const placeholders = [
  {
    title: "Research Post Coming Soon",
    description: "Deep-dives into simulation architecture, rendering pipelines, and systems design.",
    tags: ["research", "deep-dive"],
  },
  {
    title: "Technical Breakdown Coming Soon",
    description: "Exploring performance optimization techniques for real-time applications.",
    tags: ["performance", "engineering"],
  },
  {
    title: "Case Study Coming Soon",
    description: "Detailed analysis of production systems and lessons learned at scale.",
    tags: ["case-study", "production"],
  },
];

export function FeaturedLabsClient({ labs }: { labs: LabPost[] }) {
  const featured = labs.slice(0, 3);
  const hasContent = featured.length > 0;
  const items = hasContent
    ? featured.map((lab) => ({
        title: lab.frontmatter.title,
        description: lab.frontmatter.description,
        tags: lab.frontmatter.tags.slice(0, 3),
        href: `/labs/${lab.slug}`,
        date: lab.frontmatter.date,
      }))
    : placeholders.map((p, i) => ({
        ...p,
        href: "/labs",
        date: null as string | null,
      }));

  return (
    <section className="py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-12"
        >
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary/70 mb-3 block">
              Research
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Labs</h2>
            <p className="text-base text-muted-foreground max-w-md">
              Technical deep-dives, research findings, and engineering insights.
            </p>
          </div>
          <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex gap-1.5">
            <Link href="/labs">View All <ArrowRight className="h-3.5 w-3.5" /></Link>
          </Button>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease }}
            >
              <Link href={item.href} className="group block h-full">
                <article className="h-full glass-card p-6 transition-all duration-300 hover:-translate-y-1.5">
                  {!hasContent && (
                    <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-lg glass-icon">
                      <FlaskConical className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <h3 className="text-[15px] font-semibold mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span key={tag} className="text-[11px] px-2.5 py-1 rounded-full glass-pill text-primary/80 font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  {item.date && (
                    <time className="block mt-4 text-xs text-muted-foreground">
                      {new Date(item.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                    </time>
                  )}
                </article>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Button asChild variant="outline" size="sm">
            <Link href="/labs">View All Labs</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
