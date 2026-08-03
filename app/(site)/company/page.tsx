import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/site/section";
import { BackLink } from "@/components/site/back-link";
import { Reveal } from "@/components/site/reveal";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Company - ArkaForge",
  description:
    "ArkaForge is a game engineering & technology studio - digital twins for high-stakes training, game co-development for studios and publishers, and interactive products beyond games.",
};

const values = [
  {
    title: "Problems first",
    description:
      "We don't lead with a stack. We start with what's broken and work backward to the right system.",
  },
  {
    title: "Led from the US",
    description:
      "A named lead in your time zone, on your pipeline, to your standards. We run the studio so geography never costs you anything.",
  },
  {
    title: "Craft over throughput",
    description:
      "Small core, curated network, high bar. Everything we ship has to work, look right, and perform.",
  },
];

export default function CompanyPage() {
  return (
    <Section>
      <BackLink href="/" label="Back to Home" />
      <div className="max-w-4xl mx-auto">
        {/* Masthead */}
        <Reveal className="text-center mb-20">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            A game engineering &amp; technology studio.
          </h1>
          <div className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto space-y-4">
            <p>
              ArkaForge builds digital twins for high-stakes training: real-world
              procedures rebuilt inside a game engine and measured to the fidelity
              safety-critical work demands. We also co-develop games with studios
              and publishers, and build interactive products beyond games.
              Founder-led, run as a distributed studio - a curated network of
              senior engineers, developers, and designers.
            </p>
          </div>
        </Reveal>

        {/* Origin */}
        <Reveal className="mb-20">
          <div className="glass-card p-8 md:p-10 space-y-5 text-sm md:text-base text-muted-foreground leading-relaxed">
            <p>
              ArkaForge was founded by Harish - a US-based computer science
              graduate working across game development, simulation, AI, AR/VR,
              and full-stack engineering. He leads engineering and works directly
              with clients.
            </p>
            <p>
              He engineered a performance-tracked nuclear glovebox training
              simulator inside a national-lab research program at Los Alamos,
              with ASU&apos;s School of Manufacturing Systems and Networks:
              interactive environment, custom game logic, task-sequence tracking,
              real-time performance assessment. That project set the bar he now
              runs the studio to.
            </p>
            <p>
              Today the studio holds that same standard across every engagement -
              senior execution without the headcount to carry.
            </p>
          </div>
        </Reveal>

        {/* Values */}
        <Reveal className="mb-20">
          <div className="grid gap-5 md:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="glass-card p-7">
                <h3 className="text-base font-semibold mb-3 tracking-tight">
                  {v.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal className="glass-card p-10 md:p-14 text-center">
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto mb-8">
            We&apos;re selective about what we take on. If you have a real
            project, we want to hear it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="outline" className="glow px-8">
              <Link href="/work">
                See our work <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" className="glow px-8">
              <Link href="/contact">Schedule a call</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
