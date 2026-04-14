import { Metadata } from "next";
import Link from "next/link";
import { getLabs } from "@/lib/content/loader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Section } from "@/components/site/section";
import { BackLink } from "@/components/site/back-link";

export const metadata: Metadata = {
  title: "Labs",
  description:
    "Research, experiments, and technical deep-dives from ArkaForge.",
};

export default async function LabsPage() {
  const labs = await getLabs();

  return (
    <Section>
      <BackLink href="/" label="Back to Home" />
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Labs</h1>
        <p className="text-xl text-muted-foreground">
          Technical research and deep-dives on digital twins, simulation, and
          game-tech. Coming soon.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {labs.map((lab) => (
          <Link key={lab.slug} href={`/labs/${lab.slug}`}>
            <Card className="h-full transition-all hover:border-primary/50 hover:shadow-lg">
              <CardHeader>
                <CardTitle>{lab.frontmatter.title}</CardTitle>
                <CardDescription>{lab.frontmatter.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {lab.frontmatter.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
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
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {labs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No labs posts yet. Check back soon!
          </p>
        </div>
      )}
    </Section>
  );
}
