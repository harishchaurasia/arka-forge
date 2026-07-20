import { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/site/section";
import { BackLink } from "@/components/site/back-link";
import { Reveal } from "@/components/site/reveal";
import { Layers, Cpu, Rocket, Gamepad2, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Game Co-Development - ArkaForge",
  description:
    "Embed ArkaForge into your UE5 or Unity pipeline as a senior co-development partner - features, systems, AI, prototypes, and vertical slices.",
};

const shapes: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "Features & systems engineering",
    description:
      "Combat, AI, netcode, tools, UI, content pipelines. Scoped sprints that ship into your codebase at your quality bar - the fastest way to add senior UE5 or Unity capacity without growing headcount.",
    icon: Layers,
  },
  {
    title: "AI & agentic systems",
    description:
      "LLM-driven NPCs, agentic behaviours, generative content pipelines, in-game AI tooling - built by an AI/ML engineer who's been shipping agentic systems since before the category had a name.",
    icon: Cpu,
  },
  {
    title: "Prototypes & vertical slices",
    description:
      "Fixed-bid playable builds. Take a pitch deck to a demo a publisher will sit through. For studios validating ideas, indies pitching, or non-game teams entering interactive.",
    icon: Rocket,
  },
  {
    title: "Serious games & gamification",
    description:
      "Game design applied to non-game products - branching scenarios, scoring, progression, performance analytics. Where game design crosses into product; the bridge into our Interactive Products work.",
    icon: Gamepad2,
  },
];

const engagements = [
  {
    title: "Scoped sprint",
    description:
      "Two-to-six-week fixed scope. One or two engineers from our network embedded into your pipeline. Best for a defined feature, system, or audit. Indicative range: $8k-$40k.",
  },
  {
    title: "Fixed-bid prototype / vertical slice",
    description:
      "Four-to-twelve-plus weeks to a defined milestone - a playable demo, a vertical slice, a system proof. Fixed price, fixed deliverable. Indicative range: $15k for a prototype to $60k+ for a vertical slice.",
  },
  {
    title: "Co-dev retainer",
    description:
      "Ongoing capacity month-to-month - useful when you need a partner who stays in your codebase across multiple feature waves.",
  },
];

export default function GameCoDevelopmentPage() {
  return (
    <Section>
      <div className="mx-auto max-w-3xl">
        <BackLink href="/services" label="Back to Services" />

        {/* Centered header */}
        <Reveal className="mt-8 text-center">
          <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            The same engine team, pointed at your game
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground">
            We embed into your UE5 or Unity pipeline as a senior co-development
            partner and ship into your codebase at your quality bar: features,
            systems, AI, prototypes, and vertical slices. Senior hands, scoped to
            your roadmap, no headcount to carry.
          </p>
          <div className="mt-10 flex justify-center">
            <CoDevSchematic />
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

        {/* Engagement models */}
        <div className="mt-14">
          <h2 className="text-center text-xl font-semibold tracking-tight">
            Engagement models
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-sm text-muted-foreground">
            Pricing below is indicative - every engagement is scoped on a call.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {engagements.map((e, i) => (
              <Reveal key={e.title} delay={i * 0.06} className="glass-card p-6 text-center">
                <h3 className="mb-2 text-sm font-semibold text-foreground">
                  {e.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {e.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* How we work */}
        <div className="mt-14 text-center">
          <h2 className="text-xl font-semibold tracking-tight">How we work</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            We embed into your pipeline - your tools, your processes, your
            standards. ArkaForge is led from the US, so your project lead and
            single point of contact works your hours; the engineering team behind
            them keeps building around the clock. We assemble a project-fit team
            from a curated network of senior engineers, artists, and designers -
            the team is scoped to the project, not the other way around.
          </p>
        </div>

        {/* Who it's for */}
        <div className="mt-14 text-center">
          <h2 className="text-xl font-semibold tracking-tight">Who it&apos;s for</h2>
          <ul className="mx-auto mt-4 max-w-xl space-y-2 text-sm text-muted-foreground">
            <li>Studios that need additional UE5 or Unity capacity on a deadline</li>
            <li>Publishers managing multiple titles who need a reliable co-dev partner</li>
            <li>Teams shipping a vertical slice or prototype to pitch</li>
            <li>Companies building interactive experiences outside traditional games</li>
          </ul>
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-muted-foreground">
            Every engagement starts with a scoping call. We define the work, the
            timeline, and the delivery standard before anything begins.
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

// "Two streams merge into one build" - a co-development schematic.
function CoDevSchematic() {
  return (
    <svg
      viewBox="0 0 280 140"
      className="h-auto w-full max-w-sm"
      fill="none"
      aria-hidden
    >
      {/* Your team - neutral stream */}
      <path
        d="M28 38 H150 C184 38 184 70 214 70"
        className="stroke-muted-foreground/50"
        strokeWidth="1.5"
      />
      <circle cx="28" cy="38" r="5" className="fill-muted-foreground" />
      <text
        x="40"
        y="32"
        className="fill-muted-foreground font-mono"
        fontSize="9"
        letterSpacing="1"
      >
        YOUR TEAM
      </text>

      {/* ArkaForge - accent stream */}
      <path
        d="M28 102 H150 C184 102 184 70 214 70"
        className="stroke-primary"
        strokeWidth="1.5"
      />
      <circle cx="28" cy="102" r="5" className="fill-primary" />
      <text
        x="40"
        y="118"
        className="fill-primary font-mono"
        fontSize="9"
        letterSpacing="1"
      >
        ARKAFORGE
      </text>

      {/* The merged build */}
      <rect
        x="214"
        y="52"
        width="50"
        height="36"
        rx="8"
        className="fill-card stroke-primary"
        strokeWidth="1.5"
      />
      <path d="M232 62 L246 70 L232 78 Z" className="fill-primary" />
      <text
        x="239"
        y="104"
        textAnchor="middle"
        className="fill-muted-foreground font-mono"
        fontSize="9"
        letterSpacing="1"
      >
        BUILD
      </text>
    </svg>
  );
}
