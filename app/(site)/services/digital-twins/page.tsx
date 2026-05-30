import { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/site/section";
import { BackLink } from "@/components/site/back-link";
import { Reveal } from "@/components/site/reveal";
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
          <span className="mb-3 block font-mono text-xs font-medium uppercase tracking-wider text-primary">
            Digital twins
          </span>
          <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Digital twins for high-stakes training
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground">
            We turn real-world procedures into interactive, performance-tracked
            training simulations - the real-time 3D systems that power games,
            applied where the cost of error is severe. Immersive training twins,
            not industrial IoT dashboards.
          </p>
          <div className="mt-10 flex justify-center">
            <TwinSchematic />
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
            ArkaForge&apos;s founder built a performance-tracked nuclear glovebox
            training simulator - interactive environment, custom task-sequence
            logic, real-time error detection and readiness scoring - as a
            graduate researcher connected to Los Alamos National Laboratory.
            It&apos;s the direct technical foundation for this work.
          </p>
          <Link
            href="/work/los-alamos-asu-simulation"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all hover:gap-3"
          >
            See the case study <ArrowRight className="h-4 w-4" />
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
          </ul>
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-muted-foreground">
            Every engagement starts with a scoping call. We define the procedure,
            the milestones, and the delivery standard before anything begins.
          </p>
          <Link
            href="https://calendar.app.google/9HXdsiKfCXCPeUya9"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Schedule a scoping call <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </Section>
  );
}

// Physical → digital twin (train/learn/assess) → physical — the full training
// loop. Endpoints muted (real world); middle two primary (digital). Last cube
// carries a small primary tick: the skill has landed, closing the cycle.
function TwinSchematic() {
  // Cube positions (cy = 60, half-side = 20, height = 30)
  const cubes = [
    { cx: 80, tone: "muted", label1: "PHYSICAL WORLD", label2: "WORKSPACE", tick: false, glyph: false },
    { cx: 240, tone: "primary", label1: "DIGITAL TWIN", label2: "TRAIN · LEARN · ASSESS", tick: false, glyph: true },
    { cx: 400, tone: "muted", label1: "PHYSICAL WORLD", label2: "READY", tick: true, glyph: false },
  ] as const;

  const connectorLabels = ["MODELED", "TRANSFERRED"];

  return (
    <svg
      viewBox="0 0 480 150"
      className="h-auto w-full max-w-2xl"
      fill="none"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* ── Connectors between cubes ── */}
      {cubes.slice(0, -1).map((c, i) => {
        const next = cubes[i + 1];
        const startX = c.cx + 25;
        const endX = next.cx - 25;
        const midX = (startX + endX) / 2;
        return (
          <g key={`conn-${i}`}>
            <path
              d={`M${startX} 65 H${endX}`}
              className="stroke-primary"
              strokeWidth="1.5"
              strokeDasharray="3 4"
            />
            <path
              d={`M${endX - 7} 60 L${endX + 3} 65 L${endX - 7} 70`}
              className="stroke-primary"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <text
              x={midX}
              y="57"
              textAnchor="middle"
              className="fill-primary/70 font-mono"
              fontSize="7"
              letterSpacing="1.5"
            >
              {connectorLabels[i]}
            </text>
          </g>
        );
      })}

      {/* ── Cubes ── */}
      {cubes.map((c, i) => {
        const stroke =
          c.tone === "primary" ? "stroke-primary" : "stroke-muted-foreground";
        const topFill =
          c.tone === "primary" ? "fill-primary/15" : "fill-card/40";
        const leftFill =
          c.tone === "primary" ? "fill-primary/10" : "fill-background/50";
        const rightFill =
          c.tone === "primary" ? "fill-primary/20" : "fill-card/30";
        const labelStroke =
          c.tone === "primary" ? "fill-primary" : "fill-muted-foreground";
        const labelSubStroke =
          c.tone === "primary"
            ? "fill-primary/60"
            : "fill-muted-foreground/60";

        return (
          <g key={`cube-${i}`}>
            <g className={stroke} strokeWidth="1.5">
              {/* top face */}
              <path
                d={`M${c.cx - 20} 50 L${c.cx} 40 L${c.cx + 20} 50 L${c.cx} 60 Z`}
                className={`${topFill} ${stroke}`}
              />
              {/* left face */}
              <path
                d={`M${c.cx - 20} 50 L${c.cx - 20} 80 L${c.cx} 90 L${c.cx} 60 Z`}
                className={`${leftFill} ${stroke}`}
              />
              {/* right face */}
              <path
                d={`M${c.cx + 20} 50 L${c.cx + 20} 80 L${c.cx} 90 L${c.cx} 60 Z`}
                className={`${rightFill} ${stroke}`}
              />
            </g>

            {/* Trainee glyph: head + shoulders silhouette on top of the twin */}
            {c.glyph && (
              <g className="fill-primary">
                <circle cx={c.cx} cy="30" r="2.8" />
                <path d={`M${c.cx - 5.5} 41 Q${c.cx} 33.5 ${c.cx + 5.5} 41 Z`} />
              </g>
            )}

            {/* Final-cube tick: skill landed, loop closed */}
            {c.tick && (
              <g
                className="stroke-primary"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle
                  cx={c.cx + 18}
                  cy="42"
                  r="6"
                  className="fill-background"
                />
                <path d={`M${c.cx + 15} 42 L${c.cx + 17.5} 44.5 L${c.cx + 21} 40`} />
              </g>
            )}

            <text
              x={c.cx}
              y="115"
              textAnchor="middle"
              className={`${labelStroke} font-mono`}
              fontSize="9"
              letterSpacing="1"
            >
              {c.label1}
            </text>
            <text
              x={c.cx}
              y="128"
              textAnchor="middle"
              className={`${labelSubStroke} font-mono`}
              fontSize="7"
              letterSpacing="1.5"
            >
              {c.label2}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
