import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLab, getLabs } from "@/lib/content/loader";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { Section } from "@/components/site/section";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const labs = await getLabs();
  return labs.map((lab) => ({
    slug: lab.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const lab = await getLab(slug);

  if (!lab) {
    return {};
  }

  return {
    title: lab.frontmatter.title,
    description: lab.frontmatter.description,
    openGraph: {
      title: lab.frontmatter.title,
      description: lab.frontmatter.description,
      images: lab.frontmatter.hero ? [lab.frontmatter.hero] : [],
    },
  };
}

export default async function LabPage({ params }: Props) {
  const { slug } = await params;
  const lab = await getLab(slug);

  if (!lab) {
    notFound();
  }

  return (
    <Section>
      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{lab.frontmatter.title}</h1>
          <p className="text-xl text-muted-foreground mb-4">
            {lab.frontmatter.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {lab.frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm px-3 py-1 rounded-full bg-muted text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
          <time className="text-sm text-muted-foreground">
            {new Date(lab.frontmatter.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </header>

        <div className="prose prose-invert max-w-none">
          <MDXRemote source={lab.content} components={mdxComponents} />
        </div>
      </article>
    </Section>
  );
}
