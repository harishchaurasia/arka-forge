"use client";

import Galaxy from "@/components/Galaxy";

export function GalaxyBackground() {
  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none opacity-[0.65]"
      aria-hidden="true"
    >
      <div className="w-full h-full">
        <Galaxy
          mouseRepulsion
          mouseInteraction
          density={1}
          glowIntensity={0.15}
          saturation={0}
          hueShift={140}
          twinkleIntensity={0.6}
          rotationSpeed={0.1}
          repulsionStrength={2}
          autoCenterRepulsion={0}
          starSpeed={0.5}
          speed={1}
          transparent
        />
      </div>
    </div>
  );
}
