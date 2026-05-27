import { Clock, UserCheck, GitBranch, ClipboardCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const points: { title: string; body: string; icon: LucideIcon }[] = [
  {
    title: "Your lead is in your timezone",
    body: "ArkaForge is led from the US — your project lead and main point of contact works your hours. No 12-hour lag on a decision; the team behind them keeps building while you sleep.",
    icon: Clock,
  },
  {
    title: "One point of contact",
    body: "A named project lead — US-based — owns the relationship and the delivery. You're working with a team, not managing a pool.",
    icon: UserCheck,
  },
  {
    title: "Your pipeline, your standards",
    body: "Your repo, your engine version, your tools, your review process, your quality bar. We adapt to how you build — not the other way around.",
    icon: GitBranch,
  },
  {
    title: "Scoped before it starts",
    body: "Every engagement opens with a scoping call: the work, the milestones, the delivery bar — defined before anyone writes a line.",
    icon: ClipboardCheck,
  },
];

export function HowWeWork() {
  return (
    <section className="relative py-24 text-foreground md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-12 max-w-2xl">
          <span className="mb-3 block font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
            // how we work
          </span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Built to work with teams in the US, UK &amp; EU.
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            We&apos;re a distributed studio, led from the US, and we run it so
            distance is a non-issue — because for the studios that hire co-dev
            partners, it&apos;s the first thing they worry about.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
          {points.map((p, i) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="bg-card p-7">
                <div className="mb-3 flex items-center gap-3">
                  <span className="font-mono text-xs text-primary">
                    0{i + 1}
                  </span>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <h3 className="text-base font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {p.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
