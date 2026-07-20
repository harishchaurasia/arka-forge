import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/reveal";

export function GameCoDev() {
  return (
    <section className="relative pt-14 pb-14 md:pt-16 md:pb-20">
      <Reveal className="mx-auto max-w-3xl px-5 text-center">
        <div className="mb-8 flex justify-center">
          <CoDevSchematic />
        </div>
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          The same engine team,{" "}
          <span className="text-primary">pointed at your game.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
          Studios and publishers embed us into their UE5 or Unity pipeline for
          features, systems, AI gameplay, prototypes, and vertical slices. Senior
          hands, no headcount to carry.
        </p>
        <Link
          href="/services/game-co-development"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all hover:gap-3"
        >
          How co-dev works <ArrowRight className="h-4 w-4" />
        </Link>
      </Reveal>
    </section>
  );
}

// "Two streams merge into one build" - the co-development idea.
function CoDevSchematic() {
  return (
    <svg
      viewBox="0 0 280 140"
      className="h-auto w-full max-w-xs"
      fill="none"
      aria-hidden
    >
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
