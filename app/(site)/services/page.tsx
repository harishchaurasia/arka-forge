import { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/site/section";
import { BackLink } from "@/components/site/back-link";
import { Layers, Boxes, ArrowUpRight, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Services - ArkaForge",
  description:
    "Game co-development for studios and publishers, and interactive products for teams outside games.",
};

const services = [
  {
    title: "Game co-development",
    body: "Embed into your UE5 or Unity pipeline as a senior co-dev partner — features and systems engineering, AI and agentic systems, prototypes and vertical slices. The fastest way to add senior engine capacity without growing headcount.",
    href: "/services/game-co-development",
    icon: Layers,
  },
  {
    title: "Interactive products",
    body: "Game-engine craft outside games — gamified products and onboarding, training simulations, configurators, interactive 3D and data experiences for teams that need something people operate, not read.",
    href: "/services/interactive-products",
    icon: Boxes,
  },
];

export default function ServicesPage() {
  return (
    <Section>
      <BackLink href="/" label="Back to Home" />
      <div className="mb-12 max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary/70 mb-3 block">
          What we do
        </span>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Services
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          Two ways to hire the same engine room: co-develop a game with us, or
          commission an interactive product. Both run on the same engineers, the
          same engines, the same bar.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {services.map((s) => {
          const Icon = s.icon;
          return (
            <Link key={s.href} href={s.href} className="group block">
              <div className="h-full glass-card p-8 transition-all duration-300 hover:-translate-y-1.5">
                <div className="mb-5 inline-flex items-center justify-center w-12 h-12 rounded-xl glass-icon">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors flex items-center gap-1.5">
                  {s.title}
                  <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-60 transition-opacity" />
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {s.body}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 glass-card p-8 md:p-10 max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary/70 mb-3 block">
          How deep it goes
        </span>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-5">
          We built a performance-tracked nuclear glovebox training simulator —
          interactive environment, custom task-sequence logic, real-time error
          detection and readiness scoring — as graduate research connected to Los
          Alamos National Laboratory. That&apos;s the engineering floor we build
          from — not the ceiling.
        </p>
        <Link
          href="/work/los-alamos-asu-simulation"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
        >
          See the case study <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Section>
  );
}
