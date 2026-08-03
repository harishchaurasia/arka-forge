import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/reveal";

export function TheStudio() {
  return (
    <section className="relative py-24 text-foreground md:py-32">
      <div className="mx-auto max-w-5xl px-5">
        <Reveal className="grid gap-8 md:grid-cols-[minmax(0,18rem)_1fr] md:gap-14">
          <div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              The people who pitch are the people who build.
            </h2>
          </div>
          <div className="max-w-2xl space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            <p>
              Every engagement is led by ArkaForge&apos;s founder, whose work
              spans game development, simulation, AI, AR/VR, and full-stack
              engineering - including training-simulator research at Los Alamos.
            </p>
            <p>
              Behind that core is a curated network of senior engineers,
              developers, and designers, assembled to fit the work in front of
              us. The team is scoped to the project, not the project to the team.
            </p>
            <Link
              href="/company"
              className="inline-flex items-center gap-2 pt-1 text-sm font-semibold text-primary transition-all hover:gap-3"
            >
              About the studio <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
