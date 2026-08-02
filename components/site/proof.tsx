import Link from "next/link";
import { getWork } from "@/lib/content/loader";
import { ArrowUpRight } from "lucide-react";
import { MediaFrame } from "@/components/site/media-frame";
import { Reveal } from "@/components/site/reveal";

export async function Proof() {
  const work = await getWork();
  if (work.length === 0) return null;

  // Glovebox is the flagship - feature it; fall back to the first item.
  const featured = work.find((w) => w.slug.includes("los-alamos")) ?? work[0];
  const rest = work.filter((w) => w.slug !== featured.slug).slice(0, 2);

  return (
    <section
      id="work"
      className="relative py-20 text-foreground md:py-32"
    >
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="mb-10 flex items-end justify-between">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
              Proof
            </span>
            <h2 className="mt-2 font-grotesk text-3xl font-bold tracking-tight md:text-4xl">
              What we&apos;re capable of.
            </h2>
          </div>
          <Link
            href="/work"
            className="hidden font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-primary sm:block"
          >
            All work →
          </Link>
        </Reveal>

        {/* Featured case study - the flagship, with media */}
        <Reveal>
        <Link href={`/work/${featured.slug}`} className="group block">
          <div className="flex flex-col gap-6 rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 sm:p-6 md:grid md:grid-cols-2 md:items-center md:gap-8 md:p-8">
            <MediaFrame
              src={featured.frontmatter.hero}
              alt={`In-engine view of ${featured.frontmatter.title}`}
              label={`${featured.frontmatter.title} · selected views`}
              note="UE5 · real-time"
              aspect="16/9"
              dims="1600 × 900"
              className="min-w-0"
            />
            <div className="min-w-0">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Flagship · {featured.frontmatter.client ?? "Case study"}
              </span>
              <h3 className="mt-2 font-grotesk text-xl font-semibold transition-colors group-hover:text-primary sm:text-2xl">
                {featured.frontmatter.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {featured.frontmatter.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {featured.frontmatter.tags.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                Read the case study <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </Link>
        </Reveal>

        {/* Remaining case studies */}
        {rest.length > 0 && (
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {rest.map((item, i) => (
              <Reveal key={item.slug} delay={i * 0.08}>
              <Link
                href={`/work/${item.slug}`}
                className="group block"
              >
                <div className="flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1">
                  <MediaFrame
                    label={item.frontmatter.title}
                    aspect="16/9"
                    dims="1600 × 900"
                    className="mb-5"
                  />
                  <h3 className="font-grotesk text-lg font-semibold transition-colors group-hover:text-primary">
                    {item.frontmatter.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.frontmatter.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    Read the case study <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
