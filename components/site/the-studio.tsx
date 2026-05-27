import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function TheStudio() {
  return (
    <section className="relative py-24 text-foreground md:py-32">
      <div className="mx-auto max-w-5xl px-5">
        <div className="grid gap-8 md:grid-cols-[minmax(0,18rem)_1fr] md:gap-14">
          <div>
            <span className="mb-3 block font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
              // the studio
            </span>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Founder-led. Built from a curated network.
            </h2>
          </div>
          <div className="max-w-2xl space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            <p>
              ArkaForge is founder-led, with a core background spanning AI/ML and
              agentic systems, game development, AR/VR, full-stack engineering,
              and applied simulation — including the nuclear glovebox training
              work, connected to Los Alamos National Laboratory, that this
              company is built on.
            </p>
            <p>
              Around that core is a curated network of senior game engineers,
              developers, and designers we&apos;ve worked with before. We
              assemble a project-fit team for the work in front of us. The team
              is scoped to the project — not the project to the team.
            </p>
            <Link
              href="/company"
              className="inline-flex items-center gap-2 pt-1 text-sm font-semibold text-primary transition-all hover:gap-3"
            >
              More about ArkaForge <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
