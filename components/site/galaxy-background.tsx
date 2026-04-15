"use client";

import * as React from "react";
import Galaxy from "@/components/Galaxy";

type NetworkInformation = {
  effectiveType?: string;
};

function isConstrainedClient() {
  const params = new URLSearchParams(window.location.search);
  const forcedConstrained = params.get("constrained") === "1";
  if (forcedConstrained) return true;

  const lowConcurrency = (navigator.hardwareConcurrency ?? 8) <= 4;
  const lowMemory =
    "deviceMemory" in navigator &&
    Number((navigator as Navigator & { deviceMemory?: number }).deviceMemory) <= 4;
  const connection = (navigator as Navigator & { connection?: NetworkInformation })
    .connection;
  const slowNetwork =
    connection?.effectiveType === "slow-2g" || connection?.effectiveType === "2g";

  return lowConcurrency || lowMemory || slowNetwork;
}

export function GalaxyBackground() {
  const [enabled, setEnabled] = React.useState(false);

  React.useEffect(() => {
    setEnabled(!isConstrainedClient());
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
