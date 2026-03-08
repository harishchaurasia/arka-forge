import { Metadata } from "next";
import Link from "next/link";
import { getWork } from "@/lib/content/loader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Section } from "@/components/site/section";

export const metadata: Metadata = {
  title: "Work",
  description: "Case studies and projects from Arka Forge.",
};

export default async function WorkPage() {
  const work = await getWork();

  return (
    <Section>
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Work</h1>
        <p className="text-xl text-muted-foreground">
          Case studies and projects showcasing our technical capabilities.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {work.map((item) => (
          <Link key={item.slug} href={`/work/${item.slug}`}>
            <Card className="h-full transition-all hover:border-primary/50 hover:shadow-lg">
              <CardHeader>
                <CardTitle>{item.frontmatter.title}</CardTitle>
                <CardDescription>{item.frontmatter.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {item.frontmatter.client && (
                  <p className="text-sm text-muted-foreground mb-2">
                    Client: {item.frontmatter.client}
                  </p>
                )}
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.frontmatter.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <time className="text-sm text-muted-foreground">
                  {new Date(item.frontmatter.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {work.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No work items yet. Check back soon!</p>
        </div>
      )}
    </Section>
  );
}
