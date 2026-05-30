import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getWorkPost, getWork } from "@/lib/content/loader";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { BackLink } from "@/components/site/back-link";
import { MediaFrame } from "@/components/site/media-frame";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const work = await getWork();
  return work.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const work = await getWorkPost(slug);
  if (!work) return {};

  return {
    title: work.frontmatter.title,
    description: work.frontmatter.description,
    openGraph: {
      title: work.frontmatter.title,
      description: work.frontmatter.description,
      images: work.frontmatter.hero ? [work.frontmatter.hero] : [],
    },
  };
}

export default async function WorkPostPage({ params }: Props) {
  const { slug } = await params;
  const work = await getWorkPost(slug);
  if (!work) notFound();

  const fm = work.frontmatter as {
    title: string;
    description: string;
    client?: string;
    tags: string[];
    date: string;
    hero?: string;
    metrics?: Record<string, string>;
  };

  const specRows = fm.metrics
    ? (
        [
          ["Domain", fm.metrics.domain],
          ["Technology", fm.metrics.technology],
          ["Scope", fm.metrics.scope],
          ["Type", fm.metrics.type],
        ] as [string, string | undefined][]
      ).filter((row): row is [string, string] => Boolean(row[1]))
    : [];

  return (
    <section className="relative bg-background py-28 text-foreground md:py-36">
      <div className="mx-auto max-w-4xl px-5">
        <BackLink href="/work" label="Back to Work" />

        {/* Editorial header */}
        <header className="mb-10 mt-8">
          <span className="mb-4 block font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
            // case study
          </span>
          <h1 className="font-grotesk text-3xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
            {fm.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {fm.description}
          </p>
          {fm.client && (
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground/70">
              {fm.client}
            </p>
          )}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {fm.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Cover media */}
        <MediaFrame
          src={fm.hero}
          alt={`In-engine view of ${fm.title}`}
          label={`${fm.title} · selected views`}
          note="UE5 · real-time"
          aspect="16/9"
          dims="1920 × 1080"
          className="mb-12"
        />

        {/* Spec sheet from frontmatter metrics */}
        {specRows.length > 0 && (
          <dl className="mb-12 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card/50">
            {specRows.map(([k, v]) => (
              <div
                key={k}
                className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
              >
                <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground/70 sm:shrink-0">
                  {k}
                </dt>
                <dd className="text-sm text-foreground sm:text-right">{v}</dd>
              </div>
            ))}
          </dl>
        )}

        {/* Body - prose follows the theme tokens. Images are now embedded
            inline in the MDX via <MediaFrame /> at editorial breakpoints. */}
        <div className="prose max-w-none prose-headings:font-grotesk prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground prose-a:text-primary prose-hr:border-border prose-em:text-muted-foreground/80">
          <MDXRemote source={work.content} components={mdxComponents} />
        </div>
      </div>
    </section>
  );
}
