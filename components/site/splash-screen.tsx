"use client";

import * as React from "react";
import Image from "next/image";

const SPIN_DURATION = 2400;
const COLLAPSE_DURATION = 600;

export function SplashScreen() {
  const [phase, setPhase] = React.useState<"spin" | "collapse" | "done">(
    "spin",
  );
  const [skip, setSkip] = React.useState(false);

  // useLayoutEffect fires synchronously before the browser paints, so
  // reduced-motion users never see a static flash of the splash frame.
  React.useLayoutEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setSkip(true);
      return;
    }
    const onChange = () => {
      if (mq.matches) setSkip(true);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  React.useEffect(() => {
    if (skip) return;
    const spinTimer = setTimeout(
      () => setPhase("collapse"),
      SPIN_DURATION,
    );
    return () => clearTimeout(spinTimer);
  }, [skip]);

  React.useEffect(() => {
    if (skip || phase !== "collapse") return;
    const collapseTimer = setTimeout(
      () => setPhase("done"),
      COLLAPSE_DURATION,
    );
    return () => clearTimeout(collapseTimer);
  }, [phase, skip]);

  React.useEffect(() => {
    if (skip || phase === "done") return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase, skip]);

  if (skip || phase === "done") return null;

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
          <span className="font-display text-xl font-bold tracking-tight text-primary md:text-3xl lg:text-4xl">
            ArkaForge
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary/60 md:text-xs md:tracking-[0.22em] lg:text-sm">
            Game Engineering &amp; Technology Studio
          </span>
        </div>
      </div>
    </div>
  );
}
