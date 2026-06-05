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
    "ArkaForge is a video games engineering & technology studio - game co-development for studios and publishers, plus interactive products and the simulation depth behind a nuclear training simulator.",
};

const values = [
  {
    title: "Problems first",
    description:
      "We don't lead with a stack. We start with what's broken and work backward to the right system.",
  },
  {
    title: "Distance is a non-issue",
    description:
      "Led from the US - your project lead works your hours. A named lead, your pipeline, your standards. We run the studio so geography never costs you anything.",
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
          <span className="font-mono text-xs font-medium uppercase tracking-wider text-primary/70 mb-4 block">
            About ArkaForge
          </span>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            A game engineering &amp; technology studio.
          </h1>
          <div className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto space-y-4">
            <p>
              ArkaForge co-develops games with studios and publishers - UE5 and
              Unity, features, systems, AI, prototypes, vertical slices - and
              builds interactive products for teams outside games. Led directly
              by its founder and run as a distributed studio - a curated network
              of senior engineers, developers, and designers, several
              US-educated.
            </p>
          </div>
        </Reveal>

        {/* Origin */}
        <Reveal className="mb-20">
          <span className="font-mono text-xs font-medium uppercase tracking-wider text-primary/70 mb-4 block">
            Origin
          </span>
          <div className="glass-card p-8 md:p-10 space-y-5 text-sm md:text-base text-muted-foreground leading-relaxed">
            <p>
              ArkaForge was founded by Harish - a US-based computer science
              graduate with a background spanning AI/ML, LLMs and agentic AI,
              game development, AR/VR systems, full-stack engineering, and
              applied simulation. He leads engineering and works directly with
              clients.
            </p>
            <p>
              Before founding ArkaForge, Harish worked on the design and
              development of a nuclear glovebox training simulator connected to
              Los Alamos National Laboratory - as a graduate researcher at
              ASU&apos;s School of Manufacturing Systems and Networks.
              Interactive environment, custom game logic, task-sequence
              tracking, real-time performance assessment. That work is the
              technical foundation this company is built on.
            </p>
            <p>
              Today ArkaForge works with game studios and publishers as a
              co-development partner - full-cycle Unreal Engine 5 and Unity
              capability for teams that need high-quality execution without
              growing headcount - and with teams outside games who need
              interactive product work.
            </p>
          </div>
        </Reveal>

        {/* Values */}
        <Reveal className="mb-20">
          <span className="font-mono text-xs font-medium uppercase tracking-wider text-primary/70 mb-5 block">
            How we work
          </span>
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
              <Link href="/contact">
                Get In Touch <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" className="glow px-8">
              <Link href="/contact">Schedule a Call</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
