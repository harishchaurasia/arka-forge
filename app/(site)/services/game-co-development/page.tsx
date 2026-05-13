import { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/site/section";
import { BackLink } from "@/components/site/back-link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Game Co-Development - ArkaForge",
  description:
    "Embed ArkaForge into your UE5 or Unity pipeline as a senior co-development partner — features, systems, AI, prototypes, and vertical slices.",
};

const shapes = [
  {
    title: "Features & systems engineering",
    description:
      "Combat, AI, netcode, tools, UI, content pipelines. Scoped sprints that ship into your codebase at your quality bar — the fastest way to add senior UE5 or Unity capacity without growing headcount.",
  },
  {
    title: "AI & agentic systems",
    description:
      "LLM-driven NPCs, agentic behaviours, generative content pipelines, in-game AI tooling — built by an AI/ML engineer who has been shipping agentic systems since before the category had a name.",
  },
  {
    title: "Prototypes & vertical slices",
    description:
      "Fixed-bid playable builds. Take a pitch deck to a demo a publisher will sit through. For studios validating ideas, indies pitching, or non-game teams entering interactive.",
  },
  {
    title: "Serious games & gamification",
    description:
      "Game design applied to non-game products — branching scenarios, scoring, progression, performance analytics. Where game design crosses into product; the bridge into our Interactive Products work.",
  },
];

const engagements = [
  {
    title: "Scoped sprint",
    description:
      "Two-to-six-week fixed scope. One or two engineers from our network embedded into your pipeline. Best for a defined feature, system, or audit. Indicative range: $8k–$40k.",
  },
  {
    title: "Fixed-bid prototype / vertical slice",
    description:
      "Four-to-twelve-plus weeks to a defined milestone — a playable demo, a vertical slice, a system proof. Fixed price, fixed deliverable. Indicative range: $15k for a prototype to $60k+ for a vertical slice.",
  },
  {
    title: "Co-dev retainer",
    description:
      "Ongoing capacity month-to-month — useful when you need a partner who stays in your codebase across multiple feature waves.",
  },
];

export default function GameCoDevelopmentPage() {
  return (
    <Section>
      <div className="max-w-3xl">
        <BackLink href="/services" label="Back to Services" />
        <span className="font-mono text-xs font-medium uppercase tracking-wider text-primary/70 mb-3 block">
          Game co-development
        </span>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          End-to-end UE5 &amp; Unity co-development
        </h1>
        <p className="text-base text-muted-foreground mb-12 leading-relaxed">
          We embed into your pipeline as a senior co-development partner. You
          bring the vision; we bring engineering, AI, and delivery — scoped to
          your roadmap. Co-develop as a partner, or commission an original title.
        </p>

        <div className="space-y-10 text-sm text-muted-foreground leading-relaxed">
          <div>
            <h2 className="text-base font-semibold text-foreground mb-4">
              What we build
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {shapes.map((s) => (
                <div key={s.title} className="glass-card p-5">
                  <h3 className="text-sm font-semibold text-foreground mb-2">
                    {s.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {s.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-base font-semibold text-foreground mb-2">
              Engagement models
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Pricing below is indicative — every engagement is scoped on a call.
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              {engagements.map((e) => (
                <div key={e.title} className="glass-card p-5">
                  <h3 className="text-sm font-semibold text-foreground mb-2">
                    {e.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {e.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-base font-semibold text-foreground mb-3">
              How we work
            </h2>
            <p>
              We embed into your pipeline — your tools, your processes, your
              standards. ArkaForge is led from the US, so your project lead and
              single point of contact works your hours; the engineering team
              behind them keeps building around the clock. We assemble a
              project-fit team from a curated network of senior engineers,
              artists, and designers — the team is scoped to the project, not the
              other way around.
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-foreground mb-3">
              Who it&apos;s for
            </h2>
            <ul className="space-y-2">
              <li>- Studios that need additional UE5 or Unity capacity on a deadline</li>
              <li>- Publishers managing multiple titles who need a reliable co-dev partner</li>
              <li>- Teams shipping a vertical slice or prototype to pitch</li>
              <li>- Companies building interactive experiences outside traditional games</li>
            </ul>
          </div>

          <p>
            Every engagement starts with a scoping call. We define the work, the
            timeline, and the delivery standard before anything begins.
          </p>

          <Link
            href="https://calendar.app.google/9HXdsiKfCXCPeUya9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
          >
            Schedule a scoping call <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </Section>
  );
}
