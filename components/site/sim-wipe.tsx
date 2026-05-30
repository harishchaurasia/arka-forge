"use client";

import * as React from "react";

// Before/after "viewport wipe": a procedure schematic on the left, the same
// scene running in-engine on the right. Lightweight - SVG + clip-path + a
// transparent range input for drag/keyboard. Real glovebox capture replaces
// <RenderArt /> once assets are in hand.
export function SimWipe() {
  const [split, setSplit] = React.useState(52);

  return (
    <section className="relative overflow-hidden bg-background py-20 text-foreground md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-8 max-w-2xl">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-signal">
            // from blueprint to runtime
          </span>
          <h2 className="mt-3 font-grotesk text-3xl font-bold tracking-tight sm:text-4xl">
            We turn real procedures into digital twins you train in.
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Drag the divider - a procedure goes from schematic to a running,
            performance-tracked training build.
          </p>
        </div>

        <div className="panel-brackets relative aspect-[16/9] w-full select-none overflow-hidden rounded-xl border border-border">
          {/* BEFORE - blueprint (base layer) */}
          <div className="absolute inset-0 bg-card">
            <BlueprintArt />
          </div>

          {/* AFTER - in-engine render, revealed to the right of the divider */}
          <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${split}%)` }}>
            <RenderArt />
          </div>

          {/* Divider + grab handle (visual only) */}
          <div
            className="pointer-events-none absolute inset-y-0 z-10 w-px bg-primary/80"
            style={{ left: `${split}%` }}
          >
            <div className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary/70 bg-background/80 backdrop-blur-sm">
              <span className="font-mono text-[11px] text-primary">⟷</span>
            </div>
          </div>

          {/* Labels */}
          <span className="absolute left-3 top-3 rounded bg-background/70 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground backdrop-blur-sm">
            Blueprint
          </span>
          <span className="absolute right-3 top-3 rounded bg-background/70 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-signal backdrop-blur-sm">
            In-engine
          </span>

          {/* Range input - captures drag + keyboard, transparent over the panel */}
          <input
            type="range"
            min={0}
            max={100}
            value={split}
            onChange={(e) => setSplit(Number(e.target.value))}
            aria-label="Reveal the in-engine render"
            className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
          />
        </div>

        <p className="mt-3 font-mono text-[11px] text-muted-foreground/70">
          glovebox digital twin · selected views · grad-research build
        </p>
      </div>
    </section>
  );
}

function BlueprintArt() {
  return (
    <svg viewBox="0 0 320 180" className="h-full w-full text-signal" fill="none" aria-hidden>
      <g stroke="currentColor" strokeWidth="0.5" opacity="0.2">
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={`v${i}`} x1={(i + 1) * 40} y1="0" x2={(i + 1) * 40} y2="180" />
        ))}
        {Array.from({ length: 4 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={(i + 1) * 36} x2="320" y2={(i + 1) * 36} />
        ))}
      </g>
      <g stroke="currentColor" strokeLinecap="round">
        <rect x="78" y="52" width="164" height="78" rx="6" strokeWidth="1.3" opacity="0.85" />
        <rect x="92" y="60" width="136" height="40" rx="3" strokeWidth="1" opacity="0.6" />
        <ellipse cx="128" cy="116" rx="14" ry="9" strokeWidth="1.3" opacity="0.85" />
        <ellipse cx="192" cy="116" rx="14" ry="9" strokeWidth="1.3" opacity="0.85" />
        <line x1="96" y1="130" x2="88" y2="152" strokeWidth="1" opacity="0.6" />
        <line x1="224" y1="130" x2="232" y2="152" strokeWidth="1" opacity="0.6" />
        <g opacity="0.45" strokeWidth="0.75">
          <line x1="78" y1="44" x2="242" y2="44" />
          <line x1="78" y1="40" x2="78" y2="48" />
          <line x1="242" y1="40" x2="242" y2="48" />
        </g>
      </g>
    </svg>
  );
}

function RenderArt() {
  return (
    <svg
      viewBox="0 0 320 180"
      className="h-full w-full"
      aria-hidden
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="sw-steel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2c333d" />
          <stop offset="1" stopColor="#171b21" />
        </linearGradient>
        <linearGradient id="sw-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#10131a" />
          <stop offset="1" stopColor="#05070a" />
        </linearGradient>
        <radialGradient id="sw-emis" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ff8c42" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ff6a00" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="sw-vig" cx="0.5" cy="0.42" r="0.75">
          <stop offset="0.55" stopColor="#000000" stopOpacity="0" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.55" />
        </radialGradient>
      </defs>
      <rect width="320" height="180" fill="#0b0d12" />
      <rect y="118" width="320" height="62" fill="url(#sw-floor)" />
      <ellipse cx="160" cy="82" rx="46" ry="16" fill="url(#sw-emis)" />
      <rect x="78" y="52" width="164" height="78" rx="6" fill="url(#sw-steel)" stroke="#3b4350" />
      <rect x="92" y="60" width="136" height="40" rx="3" fill="#0e1a22" />
      <rect x="96" y="63" width="54" height="8" rx="2" fill="#ffffff" opacity="0.06" />
      <line x1="80" y1="53" x2="240" y2="53" stroke="#ff8c42" strokeWidth="1" opacity="0.5" />
      <ellipse cx="128" cy="116" rx="14" ry="9" fill="#08090d" stroke="#ff6a00" strokeOpacity="0.5" />
      <ellipse cx="192" cy="116" rx="14" ry="9" fill="#08090d" stroke="#ff6a00" strokeOpacity="0.5" />
      <circle cx="216" cy="68" r="2.2" fill="#38e1ff" />
      <rect width="320" height="180" fill="url(#sw-vig)" />
    </svg>
  );
}
