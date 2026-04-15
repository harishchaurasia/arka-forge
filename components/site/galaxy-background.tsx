"use client";

import * as React from "react";
import Galaxy from "@/components/Galaxy";

export function GalaxyBackground() {
  const [enabled, setEnabled] = React.useState(false);

  React.useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isSmallViewport = window.innerWidth < 1024;
    const lowConcurrency = (navigator.hardwareConcurrency ?? 8) <= 4;

    setEnabled(!reducedMotion && !isSmallViewport && !lowConcurrency);
  }, []);

  if (!enabled) return null;

  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none opacity-[0.65]"
      aria-hidden="true"
    >
      <div className="w-full h-full">
        <Galaxy
          mouseRepulsion={false}
          mouseInteraction={false}
          density={0.8}
          glowIntensity={0.1}
          saturation={0}
          hueShift={140}
          twinkleIntensity={0.4}
          rotationSpeed={0.06}
          repulsionStrength={1}
          autoCenterRepulsion={0}
          starSpeed={0.4}
          speed={0.8}
          transparent
        />
      </div>
    </div>
  );
}
