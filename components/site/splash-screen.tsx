"use client";

import * as React from "react";

const SPIN_DURATION = 2400;
const COLLAPSE_DURATION = 600;

export function SplashScreen() {
  const [phase, setPhase] = React.useState<"spin" | "collapse" | "done">(
    "spin",
  );
  React.useEffect(() => {
    const spinTimer = setTimeout(
      () => setPhase("collapse"),
      SPIN_DURATION,
    );
    return () => clearTimeout(spinTimer);
  }, []);

  React.useEffect(() => {
    if (phase !== "collapse") return;
    const collapseTimer = setTimeout(
      () => setPhase("done"),
      COLLAPSE_DURATION,
    );
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
          <img
            src="/arka-forge-logo.png"
            alt=""
            width={160}
            height={160}
            className="h-24 w-24 md:h-36 md:w-36 lg:h-40 lg:w-40 rounded-full object-contain"
          />
        </div>
        <span
          className={`text-lg md:text-2xl lg:text-3xl font-semibold tracking-tight text-primary splash-text font-display ${
            phase === "collapse" ? "splash-text-collapse" : ""
          }`}
        >
          Arka Forge
        </span>
      </div>
    </div>
  );
}
