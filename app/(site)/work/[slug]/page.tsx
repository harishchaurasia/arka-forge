import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getWorkPost, getWork } from "@/lib/content/loader";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { Section } from "@/components/site/section";

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
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{work.frontmatter.title}</h1>
          <p className="text-xl text-muted-foreground mb-4">
            {work.frontmatter.description}
          </p>
          {work.frontmatter.client && (
            <p className="text-lg text-muted-foreground mb-4">
              Client: {work.frontmatter.client}
            </p>
          )}
          {work.frontmatter.metrics && (
            <div className="mb-4 p-4 rounded-lg bg-muted">
              <h3 className="font-semibold mb-2">Key Metrics</h3>
              <ul className="space-y-1">
                {Object.entries(work.frontmatter.metrics).map(([key, value]) => (
                  <li key={key} className="text-sm">
                    <span className="font-medium">{key}:</span> {String(value)}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex flex-wrap gap-2 mb-4">
            {work.frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm px-3 py-1 rounded-full bg-muted text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
          <time className="text-sm text-muted-foreground">
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
