import { Metadata } from "next";
import { Section } from "@/components/site/section";
import { BackLink } from "@/components/site/back-link";

export const metadata: Metadata = {
  title: "Game Co-Development",
  description:
    "End-to-end UE5 and Unity co-development for studios and publishers - features, systems, AI, prototypes, and serious games.",
};

const shapes = [
  {
    title: "Features & Systems Engineering",
    description:
      "Combat, AI, netcode, tools, UI, content pipelines. Scoped sprints that ship into your codebase at your quality bar. The fastest way to add senior UE5 or Unity capacity without growing headcount.",
  },
  {
    title: "Prototypes & Vertical Slices",
    description:
      "Fixed-bid playable builds, 4-8 weeks. Take a pitch deck to a demo a publisher will sit through. For studios validating ideas, indies pitching, or non-game teams entering interactive.",
  },
  {
    title: "AI & Agentic Systems",
    description:
      "LLM-driven NPCs, agentic behaviors, generative content pipelines, in-game AI tooling. Built by an AI/ML engineer who has been shipping agentic systems since before the category had a name.",
  },
  {
    title: "Serious Games & Gamification",
    description:
      "Game design applied to non-game products - branching scenarios, scoring, progression, performance analytics. Where game design crosses into product, training, and operational systems.",
  },
];

const engagements = [
  {
    title: "Scoped Sprint",
    description:
      "Two-to-six-week fixed scope. One or two engineers from our network embedded into your pipeline. Best for a defined feature, system, or audit.",
  },
  {
    title: "Fixed-Bid Prototype",
    description:
      "Six-to-twelve-week build to a defined milestone - a vertical slice, a playable demo, a system proof. Fixed price, fixed deliverable.",
  },
  {
    title: "Co-Dev Retainer",
    description:
      "Ongoing capacity month-to-month. Useful when you need a partner who stays in your codebase across multiple feature waves.",
  },
];

export default function GameDevPage() {
  return (
    <Section>
      <div className="max-w-3xl">
        <BackLink href="/technology" label="Back to Capabilities" />
        <span className="text-xs font-semibold uppercase tracking-widest text-primary/70 mb-3 block">
          Game Co-Development
        </span>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          End-to-End UE5 &amp; Unity Co-Development
        </h1>
        <p className="text-base text-muted-foreground mb-12 leading-relaxed">
          We embed into your pipeline as a senior co-development partner. You
          bring the vision; we bring engineering, AI, and delivery capability -
          scoped to your roadmap. Co-develop as a partner, or commission an
          original title.
        </p>

        <div className="space-y-10 text-sm text-muted-foreground leading-relaxed">
          <div>
            <h2 className="text-base font-semibold text-foreground mb-4">
              What We Build
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
            <h2 className="text-base font-semibold text-foreground mb-4">
              Engagement Models
            </h2>
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
              How We Work
            </h2>
            <p>
              We embed into your pipeline. Your tools, your processes, your
              standards. ArkaForge is a founder-led studio that assembles a
              project-fit team from a curated network - artists, engineers,
              and designers we have worked with before. The team is scoped to
              the project, not the other way around.
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-foreground mb-3">
              Who It&apos;s For
            </h2>
            <ul className="space-y-2">
              <li>- Studios that need additional UE5 or Unity capacity on a deadline</li>
              <li>- Publishers managing multiple titles and need a reliable co-dev partner</li>
              <li>- Teams shipping a vertical slice or prototype to pitch</li>
              <li>- Companies building interactive experiences outside traditional games</li>
            </ul>
          </div>

          <p>
            Every engagement starts with a scoping call. We define the work,
            the timeline, and the delivery standard before anything begins.
          </p>
        </div>
      </div>
    </Section>
  );
}
