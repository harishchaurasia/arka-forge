import { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/site/section";
import { BackLink } from "@/components/site/back-link";
import { Reveal } from "@/components/site/reveal";
import { Layers, Gauge, Boxes, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Services - ArkaForge",
  description:
    "Digital twins for high-stakes training, and game co-development for studios and publishers - plus interactive products for teams outside games.",
};

const pillars = [
  {
    title: "Digital twins",
    body: "Real-world procedures rebuilt as interactive training simulations in a game engine - environments, task-sequence logic, real-time error detection, readiness scoring. Engineered to the standard nuclear-grade training demands.",
    href: "/services/digital-twins",
    icon: Gauge,
  },
  {
    title: "Game co-development",
    body: "Embed into your UE5 or Unity pipeline as a senior co-dev partner - features and systems engineering, AI and agentic systems, prototypes and vertical slices. The fastest way to add senior engine capacity without growing headcount.",
    href: "/services/game-co-development",
    icon: Layers,
  },
];

const supporting = {
  title: "Interactive products",
  body: "Game-engine craft outside games - gamified products and onboarding, configurators, interactive 3D and data experiences for teams that need something people operate, not read.",
  href: "/services/interactive-products",
  icon: Boxes,
};

export default function ServicesPage() {
  return (
    <Section>
      <BackLink href="/" label="Back to Home" />
      <Reveal className="mb-12 max-w-2xl">
        <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
          Services
        </h1>
        <p className="text-base leading-relaxed text-muted-foreground">
          Two specialties, one engine room: digital twins for high-stakes
          training, and game co-development for studios and publishers. Plus
          interactive products for teams outside games - same engineers, same
          engines, same bar.
        </p>
      </Reveal>

      {/* Two primary pillars */}
      <div className="grid auto-rows-fr gap-6 md:grid-cols-2">
        {pillars.map((s, i) => {
          const Icon = s.icon;
          return (
            <Reveal key={s.href} delay={i * 0.08} className="h-full">
            <Link href={s.href} className="group flex h-full flex-col">
              <div className="flex h-full flex-1 flex-col glass-card p-8 transition-all duration-300 hover:-translate-y-1.5">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl glass-icon">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h2 className="mb-3 flex items-center gap-1.5 text-lg font-semibold transition-colors group-hover:text-primary">
                  {s.title}
                  <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-60" />
                </h2>
                <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
              </div>
            </Link>
            </Reveal>
          );
        })}
      </div>

      {/* Supporting third */}
      <Reveal>
      <Link href={supporting.href} className="group mt-6 block">
        <div className="glass-card flex items-center gap-5 p-6 transition-all duration-300 hover:-translate-y-1">
          <div className="glass-icon hidden h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg sm:inline-flex">
            <supporting.icon className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <span className="mb-1 block font-mono text-[10px] font-medium uppercase tracking-wider text-muted-foreground/80">
              Also
            </span>
            <h2 className="text-base font-semibold transition-colors group-hover:text-primary">
              {supporting.title}
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {supporting.body}
            </p>
          </div>
          <ArrowUpRight className="hidden h-4 w-4 flex-shrink-0 self-center text-primary sm:block" />
        </div>
      </Link>
      </Reveal>
    </Section>
  );
}
