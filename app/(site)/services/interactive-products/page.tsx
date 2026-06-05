import { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/site/section";
import { BackLink } from "@/components/site/back-link";
import { Reveal } from "@/components/site/reveal";
import { Trophy, MonitorPlay, Box, LineChart, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Interactive Products - ArkaForge",
  description:
    "Game-engine craft outside games - gamified products, training simulations, configurators, and interactive 3D/data experiences.",
};

const shapes: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "Gamified products & onboarding",
    description:
      "Progression, scoring, branching, feedback loops built into the product itself - designed as methodology, not decoration.",
    icon: Trophy,
  },
  {
    title: "Training simulations",
    description:
      "Interactive 3D environments modelled from real systems and workflows - task tracking, error detection, readiness reporting. Desktop, web, and VR.",
    icon: MonitorPlay,
  },
  {
    title: "Configurators & interactive 3D",
    description:
      "Real-time product configurators, interactive scenes, spatial walkthroughs that respond to what the user does.",
    icon: Box,
  },
  {
    title: "Interactive data experiences",
    description:
      "Datasets and dashboards turned into things people explore, not just read.",
    icon: LineChart,
  },
];

export default function InteractiveProductsPage() {
  return (
    <Section>
      <div className="mx-auto max-w-3xl">
        <BackLink href="/services" label="Back to Services" />

        {/* Centered header */}
        <Reveal className="mt-8 text-center">
          <span className="mb-3 block font-mono text-xs font-medium uppercase tracking-wider text-primary">
            Interactive products
          </span>
          <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Game-engine craft, outside games
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground">
            The same engineering that ships a game feature, pointed at a product.
            Things people operate - not pages they skim.
          </p>
          <div className="mt-10 flex justify-center">
            <ProductSchematic />
          </div>
        </Reveal>

        {/* What we build */}
        <div className="mt-16">
          <h2 className="text-center text-xl font-semibold tracking-tight">
            What we build
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {shapes.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.title} delay={i * 0.06} className="glass-card p-6 text-center">
                  <div className="glass-icon mx-auto mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mb-2 text-sm font-semibold text-foreground">
                    {s.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {s.description}
                  </p>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Proof */}
        <div className="mt-14 text-center">
          <h2 className="text-xl font-semibold tracking-tight">Proof</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            We&apos;ve built and shipped gamified product work for real clients.{" "}
            <Link href="/work" className="text-primary hover:underline">
              See our work
            </Link>
            .
          </p>
        </div>

        {/* Who it's for */}
        <div className="mt-14 text-center">
          <h2 className="text-xl font-semibold tracking-tight">
            Who it&apos;s for
          </h2>
          <ul className="mx-auto mt-4 max-w-xl space-y-2 text-sm text-muted-foreground">
            <li>Companies whose product would land harder as an experience</li>
            <li>Manufacturers, energy, and industrial operators who need operator training, safety simulations, or operational visualization</li>
            <li>Teams replacing passive e-learning with something interactive</li>
            <li>Technical onboarding for complex systems and procedures</li>
            <li>Anyone who needs users to do, not just read</li>
          </ul>
        </div>

        {/* How we engage */}
        <div className="mt-14 text-center">
          <h2 className="text-xl font-semibold tracking-tight">How we engage</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Fixed-scope builds on shorter cycles than co-dev - typically a defined
            deliverable in weeks, not quarters. Indicative range: $5k-$50k
            depending on scope. Every engagement starts with a scoping call.
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Schedule a scoping call <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </Section>
  );
}

// A configurable 3D object you interact with.
function ProductSchematic() {
  return (
    <svg
      viewBox="0 0 280 130"
      className="h-auto w-full max-w-sm"
      fill="none"
      aria-hidden
    >
      {/* Config options */}
      <circle cx="40" cy="52" r="4" className="fill-primary" />
      <circle cx="40" cy="68" r="4" className="fill-muted-foreground/40" />
      <circle cx="40" cy="84" r="4" className="fill-muted-foreground/40" />
      <path d="M46 52 C72 52 84 58 100 64" className="stroke-primary/40" strokeWidth="1" />
      <text x="40" y="38" textAnchor="middle" className="fill-muted-foreground font-mono" fontSize="9" letterSpacing="1">OPTS</text>

      {/* Iso object */}
      <path d="M152 28 L196 54 L152 80 L108 54 Z" className="stroke-muted-foreground/50" strokeWidth="1.5" />
      <path d="M108 54 L108 96 L152 122 L152 80 Z" className="stroke-muted-foreground/50" strokeWidth="1.5" />
      <path d="M196 54 L196 96 L152 122 L152 80 Z" className="fill-primary/10 stroke-primary" strokeWidth="1.5" />

      {/* Cursor */}
      <path d="M168 80 L168 104 L174 98 L178 107 L182 105 L178 96 L186 96 Z" className="fill-foreground" />

      <text x="150" y="18" textAnchor="middle" className="fill-muted-foreground font-mono" fontSize="9" letterSpacing="1">INTERACTIVE</text>
    </svg>
  );
}
