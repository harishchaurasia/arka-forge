"use client";

import * as React from "react";
import Image from "next/image";

const SPIN_DURATION = 1600;
const COLLAPSE_DURATION = 600;

export function SplashScreen() {
  const [phase, setPhase] = React.useState<"spin" | "collapse" | "done">("spin");

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
      className={`splash-overlay ${phase === "collapse" ? "splash-collapse" : ""}`}
      aria-hidden="true"
    >
      <div className={`splash-logo ${phase === "collapse" ? "splash-logo-collapse" : ""}`}>
        <Image
          src="/arka-forge-logo.png"
          alt=""
          width={96}
          height={96}
          priority
          className="h-24 w-24 rounded-full object-contain"
        />
      </div>
    </div>
  );
}
