import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/site/section";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Company — Arka Forge",
  description:
    "Arka Forge is a game technology studio building simulation-based training systems and digital twins. Founded at the intersection of game development, applied simulation, and real-world systems.",
};

const values = [
  {
    title: "Problems Before Technology",
    description:
      "We don't lead with a stack or a platform. We start with what's actually broken and work backward to the right system.",
  },
  {
    title: "Interactivity Is the Point",
    description:
      "The difference between watching a simulation and being inside one is the same difference between reading about surgery and performing it. We build the second kind.",
  },
  {
    title: "Quality Is Non-Negotiable",
    description:
      "We're building a premium studio, not a dev shop. Every system we ship has to work, look right, and perform — because our clients' credibility is tied to it, and so is ours.",
  },
];

export default function CompanyPage() {
  return (
    <Section>
      <div className="max-w-4xl mx-auto">
        {/* Masthead */}
        <div className="text-center mb-20">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary/70 mb-4 block">
            About Arka Forge
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-8">
            Built on a simple belief:
            <br />
            <span className="gradient-text">
              training should be interactive, not passive.
            </span>
          </h1>
          <div className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto space-y-4">
            <p>
              Arka Forge is a game technology studio that uses the systems
              behind real-time 3D games to build training environments and
              digital twins for organizations that operate in the physical
              world.
            </p>
            <p>
              We&apos;re not a generic software agency. We&apos;re not an XR
              production house. We build systems designed to close the gap
              between how people train and how they actually work.
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
              Arka Forge was founded by Harish, a computer science graduate
              researcher at Arizona State University with a background spanning
              game development, AR/VR systems, full-stack engineering, and
              applied simulation.
            </p>
            <p>
              The company&apos;s capabilities are grounded in direct experience:
              Harish led the design and development of a game-modified digital
              twin for nuclear glovebox workforce training at Los Alamos
              National Laboratory, in partnership with ASU&apos;s School of
              Manufacturing Systems and Networks.
            </p>
            <p>
              That project — interactive environment, custom game logic, task
              sequence tracking, real-time performance assessment — is the
              working proof of what Arka Forge builds and how it builds it.
            </p>
            <p>
              The company operates with a distributed model: client
              relationships and business development based in the United
              States, with production capabilities in India. This isn&apos;t an
              outsourcing play — it&apos;s a structural advantage that lets us
              maintain high quality and fast iteration without the overhead of
              a U.S.-only studio.
            </p>
          </div>
        </div>

        {/* Direction */}
        <div className="mb-20">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary/70 mb-4 block">
            Direction
          </span>
          <div className="glass-card p-8 md:p-10 space-y-5 text-sm md:text-base text-muted-foreground leading-relaxed">
            <p>We&apos;re building in phases, and we&apos;re transparent about where we are.</p>
            <p>
              Right now, we&apos;re focused on custom simulation-based training
              and game-based learning systems for enterprise and research
              clients. These are the projects where our capabilities are most
              directly applicable and where the value is clearest.
            </p>
            <p>
              As we grow — in team, in technical depth, and in client
              relationships — we&apos;re moving toward full-scale digital twin
              systems: real-time connected environments that mirror operational
              reality and enable ongoing scenario simulation, performance
              analytics, and predictive modeling.
            </p>
            <p>
              Longer term, the same technical pipelines that power our client
              work will feed into original interactive products. But that&apos;s
              later. Right now, we&apos;re here to build serious systems for
              serious problems.
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
            We&apos;re selective about the projects we take on. If you have a
            real training or simulation problem, we want to hear about it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="glow px-8">
              <Link href="/contact">
                Get In Touch <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="px-8">
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
