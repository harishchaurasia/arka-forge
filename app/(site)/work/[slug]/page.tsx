import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getWorkPost, getWork } from "@/lib/content/loader";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { Section } from "@/components/site/section";
import { BackLink } from "@/components/site/back-link";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const work = await getWork();
  return work.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const work = await getWorkPost(slug);

  if (!work) {
    return {};
  }

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

  if (!work) {
    notFound();
  }

  return (
    <Section>
      <article className="max-w-3xl mx-auto">
        <BackLink href="/work" label="Back to Work" />
        <header className="mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary/70 mb-3 block">
            Work
          </span>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {work.frontmatter.title}
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed mb-6 max-w-2xl">
            {work.frontmatter.description}
          </p>
          {work.frontmatter.client && (
            <p className="text-xs text-foreground/60 mb-6">
              {work.frontmatter.client}
            </p>
          )}
          <div className="flex flex-wrap gap-2 mb-6">
            {work.frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs uppercase tracking-wider px-3 py-1 rounded-full border border-primary/30 text-primary/90 bg-primary/[0.05]"
              >
                {tag}
              </span>
            ))}
          </div>
          <time className="text-xs text-muted-foreground">
            {new Date(work.frontmatter.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </header>

        <div className="prose prose-invert max-w-none">
          <MDXRemote source={work.content} components={mdxComponents} />
        </div>
      </article>
    </Section>
  );
}
