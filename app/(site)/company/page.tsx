import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/site/section";
import { BackLink } from "@/components/site/back-link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Company - ArkaForge",
  description:
    "ArkaForge is a game co-development studio with serious technical depth - end-to-end UE5 and Unity for studios and publishers, plus digital twins for high-stakes industries.",
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
            About ArkaForge
          </span>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            A game co-development studio with serious technical depth.
          </h1>
          <div className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto space-y-4">
            <p>
              ArkaForge is a game co-development studio. We embed into studios
              and publishers as a senior UE5 and Unity partner - features,
              systems, AI, prototypes, and serious games. The same engine
              depth, applied to digital twins, is what we ship for high-stakes
              operators in nuclear, manufacturing, energy, and defense.
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
              ArkaForge was founded by Harish, a Techie, Computer Science
              Graduate, with a strong background in AI/ML, LLMs, Agentic AI,
              Game Development, AR/VR Systems, Full-Stack Engineering, and
              Applied Simulation.
            </p>
            <p>
              Before founding ArkaForge, Harish worked on the design and
              development of a nuclear glovebox training simulator at Los Alamos
              National Laboratory - as a researcher at ASU&apos;s School of
              Manufacturing Systems and Networks. Interactive environment,
              custom game logic, task sequence tracking, real-time performance
              assessment. That work is the technical foundation this company is
              built on.
            </p>
            <p>
              Arka Forge also partners with game studios and publishers as a
              co-development partner - bringing full-cycle Unreal Engine 5 and
              Unity development capability to teams that need high-quality
              execution without growing their own headcount.
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
                Schedule a Call
              </a>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
