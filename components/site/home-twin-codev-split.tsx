import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/site/reveal";
import { TwinSchematic } from "@/components/site/twin-schematic";

// The two core offers as one split section: training (blue) and game co-dev
// (orange) meeting at a glowing slit. Side by side from xl up (iPads/phones
// stack); no framed card - it sits directly on the dark page.
const SLIT_STYLE: React.CSSProperties = {
  background:
    "linear-gradient(180deg, transparent, #38bdf8 22%, #ffffff 50%, hsl(15 100% 55%) 78%, transparent)",
  boxShadow:
    "0 0 14px 1px rgba(56,189,248,0.35), 0 0 14px 1px rgba(255,90,30,0.35)",
};

export function TwinCodevSplit() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-start px-5 xl:grid-cols-2 xl:px-0">
        {/* glowing slit where the two worlds meet (desktop only) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-6 left-1/2 hidden w-px -translate-x-1/2 xl:block"
          style={SLIT_STYLE}
        />

        {/* ── Left: training (blue) ── */}
        <Reveal className="flex flex-col items-center text-center xl:items-end xl:pr-14 xl:text-right">
          <div className="mb-7 flex w-full justify-center xl:h-[120px] xl:items-end xl:justify-end">
            <TwinSchematic tone="sky" glow className="max-w-[430px]" />
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-sky-400">
            Training simulation
          </div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            We build <span className="text-sky-400">digital twins</span> of the
            work itself.
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
            We rebuild your equipment, procedures, and failure modes inside a
            game engine. People practice the real task, fail without
            consequence, and leave a record that proves they are ready. Built to
            the fidelity safety-critical work demands.
          </p>
          <Link
            href="/services/digital-twins"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-400 transition-all hover:gap-3"
          >
            See digital twins <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        {/* ── Right: game co-dev (orange) ── */}
        <Reveal className="mt-12 flex flex-col items-center border-t border-border pt-12 text-center xl:mt-0 xl:items-start xl:border-0 xl:pl-14 xl:pt-0 xl:text-left">
          <div className="mb-7 flex w-full justify-center xl:h-[120px] xl:items-end xl:justify-start">
            <CoDevSchematic className="max-w-[212px]" />
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
            Game co-development
          </div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            The same engine team,{" "}
            <span className="text-primary">pointed at your game.</span>
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
            Studios and publishers embed us into their UE5 or Unity pipeline for
            features, systems, AI gameplay, prototypes, and vertical slices.
            Senior hands, no headcount to carry.
          </p>
          <Link
            href="/services/game-co-development"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all hover:gap-3"
          >
            How co-dev works <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

// "Two streams merge into one build" - the co-development idea, with a soft
// bloom behind the build target so it reads as emissive.
function CoDevSchematic({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 140"
      className={cn("h-auto w-full", className)}
      fill="none"
      aria-hidden
    >
      <defs>
        <filter id="codevGlow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>
      <ellipse
        cx="239"
        cy="70"
        rx="34"
        ry="26"
        className="fill-primary/40"
        filter="url(#codevGlow)"
      />

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
