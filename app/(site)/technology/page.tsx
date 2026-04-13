import { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/site/section";
import { BackLink } from "@/components/site/back-link";
import { Cpu, Code, Boxes, Gamepad2, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Capabilities - Arka Forge",
  description:
    "Simulation-based training, game-based learning, and digital twin systems — built with game technology for high-stakes industries.",
};

const technologies = [
  {
    title: "Game-Based Learning",
    description:
      "Game design applied to serious training objectives - branching scenarios, scoring, feedback loops, and measurable skill progression.",
    href: "/technology/learning",
    icon: Gamepad2,
  },
  {
    title: "Digital Twins",
    description:
      "Interactive replicas of real-world systems - factories, equipment, workflows - that mirror operational reality in real time.",
    href: "/technology/digitaltwins",
    icon: Cpu,
  },
  {
    title: "Simulation Development",
    description:
      "End-to-end simulation engineering - Unreal, Unity, custom engines - with gamification, analytics, and multi-platform delivery.",
    href: "/technology/simulation",
    icon: Code,
  },
  {
    title: "XR & Spatial",
    description:
      "Digital twins delivered in AR, VR, and mixed reality - across headsets, web, desktop, and mobile.",
    href: "/technology/xr",
    icon: Boxes,
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
          Technology
        </h1>
        <p className="text-base text-muted-foreground max-w-xl">
          Simulation, game-based learning, and digital twins for Enterprise
          Workforce, Robotics, Manufacturing, Energy, Defense, and Research.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-4">
        {technologies.map((tech) => {
          const Icon = tech.icon;
          return (
            <Link key={tech.href} href={tech.href} className="group block">
              <div className="h-full glass-card p-6 transition-all duration-300 hover:-translate-y-1.5">
                <div className="mb-5 inline-flex items-center justify-center w-12 h-12 rounded-xl glass-icon">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-[15px] font-semibold mb-2 group-hover:text-primary transition-colors flex items-center gap-1.5">
                  {tech.title}
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-60 transition-opacity" />
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
