import { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/site/section";
import { BackLink } from "@/components/site/back-link";
import { GitMerge, Joystick, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Capabilities - ArkaForge",
  description:
    "Game co-development for studios and publishers, plus digital twins for high-stakes industries.",
};

const technologies = [
  {
    title: "Game Co-Development",
    description:
      "End-to-end UE5 and Unity development for studios and publishers - features and systems engineering, prototypes and vertical slices, AI and agentic systems, and serious games. Embed into your pipeline as a senior co-dev partner.",
    href: "/technology/gamedev",
    icon: Joystick,
  },
  {
    title: "Digital Twins",
    description:
      "Interactive replicas of real systems for nuclear, manufacturing, energy, and defense - delivered across desktop, VR/AR, and web. Same engine work as a game, with the constraints of an operational system.",
    href: "/technology/digitaltwins",
    icon: GitMerge,
  },
];

export default function TechnologyPage() {
  return (
    <Section>
      <BackLink href="/" label="Back to Home" />
      <div className="mb-12">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary/70 mb-3 block">
          Capabilities
        </span>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
          What We Do
        </h1>
        <p className="text-base text-muted-foreground max-w-xl">
          Game co-development for studios and publishers - and the same engine
          depth, applied to digital twins for the industries that can&apos;t
          afford to get it wrong.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {technologies.map((tech) => {
          const Icon = tech.icon;
          return (
            <Link key={tech.href} href={tech.href} className="group block">
              <div className="h-full glass-card p-8 transition-all duration-300 hover:-translate-y-1.5">
                <div className="mb-5 inline-flex items-center justify-center w-12 h-12 rounded-xl glass-icon">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors flex items-center gap-1.5">
                  {tech.title}
                  <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-60 transition-opacity" />
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {tech.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </Section>
  );
}
