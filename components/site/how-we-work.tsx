import type { ComponentType, SVGProps } from "react";
import { Reveal } from "@/components/site/reveal";

type ProcessIcon = ComponentType<SVGProps<SVGSVGElement>>;

const points: { title: string; body: string; icon: ProcessIcon }[] = [
  {
    title: "Align around the system",
    body: "We map the environment, users, data sources, platform constraints, and business outcome the digital twin or experience needs to represent.",
    icon: AlignIcon,
  },
  {
    title: "Set one clear owner",
    body: "A senior lead translates requirements into priorities, coordinates the production team, and keeps feedback, risks, and decisions moving.",
    icon: OwnerIcon,
  },
  {
    title: "Build in your stack",
    body: "Our team works directly in your engine, repository, tools, and review process so the output becomes part of your product, not a detached handoff.",
    icon: PipelineIcon,
  },
  {
    title: "Deliver against milestones",
    body: "Milestones are tied to fidelity, performance, acceptance criteria, and documentation, giving your team a clear path from prototype to production.",
    icon: ScopeIcon,
  },
];

export function HowWeWork() {
  return (
    <section className="relative py-24 text-foreground md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="mb-12 max-w-2xl">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            We build to the standard the work demands.
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Every build ships production-grade and lands in your stack:
            versioned, tested, documented, and yours. We work inside your engine,
            your repo, and your review process, and we measure what we make.
          </p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:gap-5">
          {points.map((point, index) => {
            const Icon = point.icon;
            return (
              <Reveal
                key={point.title}
                delay={index * 0.08}
                className="glass-card p-6 md:p-7"
              >
                <div className="mb-5 flex items-center justify-between gap-4">
                  <span className="rounded-full border border-primary/25 bg-primary/[0.06] px-3 py-1 font-mono text-[11px] font-medium text-primary">
                    0{index + 1}
                  </span>
                  <span className="glass-icon flex h-10 w-10 items-center justify-center rounded-lg">
                    <Icon className="h-5 w-5" />
                  </span>
                </div>
                <h3 className="text-lg font-semibold tracking-tight">
                  {point.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {point.body}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AlignIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 1.5v3" />
      <path d="M12 19.5v3" />
      <path d="M1.5 12h3" />
      <path d="M19.5 12h3" />
    </svg>
  );
}

function OwnerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="8" r="3" />
      <path d="M7 19a5 5 0 0 1 10 0" />
      <path d="M4.5 12.5h3" />
      <path d="M16.5 12.5h3" />
      <path d="M6 10.5v4" />
      <path d="M18 10.5v4" />
      <path d="M9.8 15.7 12 18l3.8-4" />
    </svg>
  );
}

function PipelineIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M4 7h5" />
      <path d="M15 7h5" />
      <path d="M9 7c3 0 3 5 6 5" />
      <path d="M9 17c3 0 3-5 6-5" />
      <path d="M4 17h5" />
      <path d="M15 17h5" />
      <rect x="3" y="5" width="3" height="4" rx="1" />
      <rect x="18" y="5" width="3" height="4" rx="1" />
      <rect x="3" y="15" width="3" height="4" rx="1" />
      <rect x="18" y="15" width="3" height="4" rx="1" />
    </svg>
  );
}

function ScopeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="6" y="4" width="12" height="16" rx="2" />
      <path d="M9 4.5h6" />
      <path d="M9 10h6" />
      <path d="M9 14h3" />
      <path d="m13.5 16 1.6 1.6L18 14.5" />
      <path d="M4 8h2" />
      <path d="M18 8h2" />
    </svg>
  );
}
