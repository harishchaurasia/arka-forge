import { Metadata } from "next";
import Link from "next/link";
import { getWork } from "@/lib/content/loader";
import { Section } from "@/components/site/section";

export const metadata: Metadata = {
  title: "Our Work - Arka Forge",
  description: "Simulation projects and training systems from Arka Forge.",
};

export default async function WorkPage() {
  const work = await getWork();
  return (
    <Section>
      <div className="mb-12">
        <span
          className="text-xs font-semibold uppercase
        tracking-widest text-primary/70 mb-3 block"
        >
          Portfolio
        </span>
        <h1
          className="text-3xl md:text-4xl font-bold
        tracking-tight"
        >
          Work
        </h1>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {work.map((item) => (
          <Link
            key={item.slug}
            href={`/work/${item.slug}`}
            className="group block"
          >
            <div
              className="h-full glass-card p-6
            transition-all duration-300
            hover:-translate-y-1.5"
            >
              <h2
                className="text-base font-semibold mb-2
              group-hover:text-primary transition-colors"
              >
                {item.frontmatter.title}
              </h2>
              <p
                className="text-sm text-muted-foreground
              leading-relaxed mb-4"
              >
                {item.frontmatter.description}
              </p>
              {item.frontmatter.client && (
                <p className="text-xs text-foreground/60 mb-4">
                  {item.frontmatter.client}
                </p>
              )}
              <div className="flex flex-wrap gap-2 mb-4">
                {item.frontmatter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs uppercase tracking-wider
                    px-3 py-1 rounded-full border border-primary/30
                    text-primary/90 bg-primary/[0.05]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <time className="text-xs text-muted-foreground">
                {new Date(item.frontmatter.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
