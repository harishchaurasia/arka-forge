import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/site/section";
import { BackLink } from "@/components/site/back-link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Company - Arka Forge",
  description:
    "Arka Forge is a game technology studio building simulation-based training systems and digital twins. Founded at the intersection of game development, applied simulation, and real-world systems.",
};

const values = [
  {
    title: "Problems First",
    description:
      "We don't lead with a stack. We start with what's broken and work backward to the right system.",
  },
  {
    title: "Interactivity Is the Method",
    description:
      "There's a difference between watching a simulation and being inside one. We build the second kind.",
  },
  {
    title: "Craft Over Throughput",
    description:
      "Small team. High standards. Every system we ship has to work, look right, and perform.",
  },
];

export default function CompanyPage() {
  return (
    <Section>
      <BackLink href="/" label="Back to Home" />
      <div className="max-w-4xl mx-auto">
        {/* Masthead */}
        <div className="text-center mb-20">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary/70 mb-4 block">
            About Arka Forge
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] mb-8">
            We build systems that close the gap between training and reality.
          </h1>
          <div className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto space-y-4">
            <p>
              Arka Forge is a game technology studio. We use the systems behind
              real-time 3D games to build simulation-based training environments
              and digital twins for organizations that operate in the physical
              world.
            </p>
          </div>
        </div>

        {/* Origin */}
        <div className="mb-20">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary/70 mb-4 block">
            Origin
          </span>
          <div className="glass-card p-8 md:p-10 space-y-5 text-sm md:text-base text-muted-foreground leading-relaxed">
            <p>
              Arka Forge was founded by Harish, a Techie, Computer Science
              Graduate, with a strong background in AI/ML, LLMs, Agentic AI,
              Game Development, AR/VR Systems, Full-Stack Engineering, and
              Applied Simulation.
            </p>
            <p>
              Before founding Arka Forge, Harish worked on the design and
              development of a nuclear glovebox training simulator at Los Alamos
              National Laboratory - as a researcher at ASU&apos;s School of
              Manufacturing Systems and Networks. Interactive environment,
              custom game logic, task sequence tracking, real-time performance
              assessment. That work is the technical foundation this company is
              built on.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary/70 mb-5 block">
            How We Work
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
        </div>

        {/* CTA */}
        <div className="glass-card p-10 md:p-14 text-center">
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto mb-8">
            We&apos;re selective about what we take on. If you have a real
            problem, we want to hear it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="outline" className="glow px-8">
              <Link href="/contact">
                Get In Touch <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" className="glow px-8">
              <a
                href="https://calendar.app.google/9HXdsiKfCXCPeUya9"
                target="_blank"
                rel="noopener noreferrer"
              >
                Schedule a Discovery Call
              </a>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
