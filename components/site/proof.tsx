import Link from "next/link";
import { getWork } from "@/lib/content/loader";
import { ArrowRight } from "lucide-react";

export async function Proof() {
  const work = (await getWork()).slice(0, 2);
  if (work.length === 0) return null;

  return (
    <section className="py-28 md:py-36 relative" id="work">
      <div className="relative mx-auto max-w-6xl px-5">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="font-mono text-xs font-medium uppercase tracking-wider text-primary/70 mb-3 block">
              Selected work
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Proof
            </h2>
          </div>
          <Link
            href="/work"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            All work →
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {work.map((item) => (
            <Link
              key={item.slug}
              href={`/work/${item.slug}`}
              className="group block"
            >
              <div className="h-full glass-card p-7 transition-all duration-300 hover:-translate-y-1.5">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {item.frontmatter.title}
                </h3>
                {item.frontmatter.client && (
                  <p className="text-xs text-foreground/60 mb-3">
                    {item.frontmatter.client}
                  </p>
                )}
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {item.frontmatter.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {item.frontmatter.tags.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="text-xs uppercase tracking-wider px-3 py-1 rounded-full border border-primary/30 text-primary/90 bg-primary/[0.05]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <span className="text-sm font-semibold text-primary inline-flex items-center gap-1.5">
                  Read the case study <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
