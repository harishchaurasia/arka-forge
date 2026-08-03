import { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/site/section";
import { BackLink } from "@/components/site/back-link";
import { Reveal } from "@/components/site/reveal";
import { TwinSchematic } from "@/components/site/twin-schematic";
import { ListChecks, Box, Gauge, BarChart3, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Digital Twins - ArkaForge",
  description:
    "Immersive digital twins of real-world procedures, built in game engines for high-stakes training - interactive environments, task-sequence logic, real-time error detection, and readiness scoring.",
};

const shapes: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "Procedure & task-sequence simulation",
    description:
      "Real operational sequences encoded as game events - correct completion, skipped or out-of-order steps, hesitation and time-on-task all detected. Training becomes a structured data event.",
    icon: ListChecks,
  },
  {
    title: "Faithful interactive environments",
    description:
      "First-person, physically faithful replicas of the real workspace - spatial layout, equipment, and constraints modeled so trainees meet the same logic they will on the job.",
    icon: Box,
  },
  {
    title: "Performance & readiness scoring",
    description:
      "Weighted task completion, sequence accuracy, and time efficiency surfaced in real time and post-session - a measurable readiness benchmark for trainees and managers.",
    icon: Gauge,
  },
  {
    title: "Assessment & analytics layer",
    description:
      "Event logging, sequence validation, and metric aggregation, with UI that shows exactly which steps trainees miss. Objective records, not subjective sign-off.",
    icon: BarChart3,
  },
];

const engagements = [
  {
    title: "Pilot / proof-of-concept",
    description:
      "A single procedure built end-to-end as a working training sim - environment, task logic, scoring. The fastest way to prove the model on your highest-stakes task.",
  },
  {
    title: "Full training build",
    description:
      "A complete digital twin of a workspace and its procedures, with the assessment and analytics layer. Fixed milestones, fixed deliverables.",
  },
  {
    title: "Program partnership",
    description:
      "Ongoing capacity to expand a simulation program across procedures, sites, and trainee cohorts as it scales.",
  },
];

export default function DigitalTwinsPage() {
  return (
    <Section>
      <div className="mx-auto max-w-3xl">
        <BackLink href="/services" label="Back to Services" />

        {/* Centered header */}
        <Reveal className="mt-8 text-center">
          <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            We build digital twins of high-stakes work
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground">
            We rebuild the procedure, the equipment, and the failure modes inside
            a game engine, then measure every action against it. The real-time 3D
            systems that power games, applied where the cost of error is severe -
            to train people and physical-AI systems alike. Twins of the work
            itself, not industrial IoT dashboards.
          </p>
          <div className="mt-8 flex justify-center">
            <TwinSchematic className="max-w-2xl" />
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
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            A performance-tracked nuclear glovebox training simulator -
            interactive environment, task-sequence logic, real-time error
            detection, readiness scoring - built as founder-led research with
            ASU, inside a national-lab program at Los Alamos. That research is
            the technical foundation this work builds on.
          </p>
          <Link
            href="/work/los-alamos-asu-simulation"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all hover:gap-3"
          >
            Read the case study <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Engagement models */}
        <div className="mt-14">
          <h2 className="text-center text-xl font-semibold tracking-tight">
            Engagement models
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-sm text-muted-foreground">
            Every engagement is scoped on a call.
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

        {/* Who it's for */}
        <div className="mt-14 text-center">
          <h2 className="text-xl font-semibold tracking-tight">
            Who it&apos;s for
          </h2>
          <ul className="mx-auto mt-4 max-w-xl space-y-2 text-sm text-muted-foreground">
            <li>Workforce-training programs for high-consequence, procedure-driven operations</li>
            <li>Teams where on-equipment training carries cost, risk, or scheduling constraints</li>
            <li>Programs that need objective, measurable readiness signals - not impressions</li>
            <li>Research and industrial groups exploring simulation-based training</li>
            <li>Robotics and physical-AI teams that need faithful simulation to train and validate systems</li>
          </ul>
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-muted-foreground">
            Every engagement starts with a scoping call. We define the procedure,
            the milestones, and the delivery standard before anything begins.
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
