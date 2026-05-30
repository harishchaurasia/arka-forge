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

  React.useEffect(() => {
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
        <span
          className={`splash-text font-display text-lg font-semibold tracking-tight text-primary md:text-2xl lg:text-3xl ${
            phase === "collapse" ? "splash-text-collapse" : ""
          }`}
        >
          ArkaForge
        </span>
      </div>
    </div>
  );
}
