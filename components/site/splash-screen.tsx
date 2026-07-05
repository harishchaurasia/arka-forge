"use client";

import * as React from "react";
import Image from "next/image";

const SPIN_DURATION = 2400;
const COLLAPSE_DURATION = 600;

export function SplashScreen() {
  const [phase, setPhase] = React.useState<"spin" | "collapse" | "done">(
    "spin",
  );

  React.useEffect(() => {
    const spinTimer = setTimeout(() => setPhase("collapse"), SPIN_DURATION);
    return () => clearTimeout(spinTimer);
  }, []);

  React.useEffect(() => {
    if (phase !== "collapse") return;
    const collapseTimer = setTimeout(() => setPhase("done"), COLLAPSE_DURATION);
    return () => clearTimeout(collapseTimer);
  }, [phase]);

  React.useEffect(() => {
    if (phase === "done") return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      className={`splash-overlay ${
        phase === "collapse" ? "splash-collapse" : ""
      }`}
      aria-hidden="true"
    >
      <div
        className={`flex flex-col items-center gap-5 ${
          phase === "collapse" ? "splash-container-collapse" : ""
        }`}
      >
        <div
          className={`splash-logo-img ${phase === "collapse" ? "splash-logo-collapse" : ""}`}
        >
          <Image
            src="/arka-forge-logo.png"
            alt=""
            width={160}
            height={160}
            priority
            className="h-24 w-24 rounded-full object-contain md:h-36 md:w-36 lg:h-40 lg:w-40"
          />
        </div>
        <div
          className={`splash-text flex flex-col items-center gap-2 md:gap-3 ${
            phase === "collapse" ? "splash-text-collapse" : ""
          }`}
        >
          <span className="font-display text-3xl font-bold leading-none tracking-tight text-primary text-center md:text-5xl lg:text-6xl">
            ArkaForge
          </span>
          <span className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-primary/70 text-center text-balance max-w-[15rem] md:max-w-none md:text-sm md:tracking-[0.2em] lg:text-base">
            Game Engineering &amp; Technology Studio
          </span>
        </div>
      </div>
    </div>
  );
}
