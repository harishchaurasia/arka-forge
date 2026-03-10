import { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/site/section";
import { Cpu, Code, Boxes, Gamepad2, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Technology",
  description: "Games for learning, gamification, digital twins, and simulation technology at Arka Forge.",
};

const technologies = [
  {
    title: "Games for Learning & Gamification",
    description: "Purpose-built games and gamified experiences that teach complex skills through play — with scoring, analytics, and feedback loops baked in.",
    href: "/technology/engine",
    icon: Gamepad2,
  },
  {
    title: "Simulation & Digital Twins",
    description: "Digitize real-world workflows into interactive simulations. Workers practice inside digital twins before touching real equipment.",
    href: "/technology/simulation",
    icon: Cpu,
  },
  {
    title: "Game Development Services",
    description: "End-to-end game-tech — Unreal, Unity, custom engines — for enterprise simulation and training products.",
    href: "/technology/engine",
    icon: Code,
  },
  {
    title: "XR & Spatial",
    description: "AR, VR, and mixed reality training delivered across headsets, web, desktop, and mobile.",
    href: "/technology/xr",
    icon: Boxes,
  },
];

export default function TechnologyPage() {
  return (
    <Section>
      <div className="mb-12">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary/70 mb-3 block">
          Capabilities
        </span>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Technology</h1>
        <p className="text-base text-muted-foreground max-w-xl">
          Games for learning, gamification, digital twins, and game development for manufacturing, robotics, energy, and defense.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
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
                <p className="text-sm text-muted-foreground leading-relaxed">{tech.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </Section>
  );
}
