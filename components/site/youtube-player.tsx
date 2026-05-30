"use client";

import * as React from "react";
import Image from "next/image";
import { Play } from "lucide-react";

interface YouTubePlayerProps {
  id: string;
  label?: string;
}

// Lite-YouTube pattern: render only the thumbnail + a custom play affordance
// on first paint; swap in the YouTube iframe on click. Keeps the page fast and
// keeps the heavy YT player out of initial load. Once playing, the iframe takes
// over and YouTube's controls are used.
export function YouTubePlayer({ id, label }: YouTubePlayerProps) {
  const [playing, setPlaying] = React.useState(false);
  const thumb = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
  const embedSrc = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;

  if (playing) {
    return (
      <iframe
        src={embedSrc}
        title={label ?? "YouTube video"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group absolute inset-0 block h-full w-full cursor-pointer"
      aria-label={`Play ${label ?? "video"}`}
    >
      <Image
        src={thumb}
        alt={label ?? ""}
        fill
        sizes="(min-width: 1024px) 900px, (min-width: 640px) 80vw, 100vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        style={{ filter: "saturate(0.82) contrast(1.04) brightness(0.9)" }}
      />

      {/* Vignette - draws the eye to centre */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, hsl(224 16% 3% / 0.72) 100%)",
        }}
      />

      {/* Play affordance - pulsing ring + glassy disc + filled icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="relative flex h-16 w-16 items-center justify-center sm:h-20 sm:w-20">
          {/* Outer pulse */}
          <span className="absolute inline-flex h-full w-full rounded-full border border-primary/40 opacity-60 motion-safe:animate-ping" />
          {/* Solid disc */}
          <span className="relative flex h-full w-full items-center justify-center rounded-full border border-primary/60 bg-background/30 shadow-[0_8px_24px_-8px_hsl(var(--primary)/0.6)] backdrop-blur-md transition-all duration-300 ease-out group-hover:scale-110 group-hover:border-primary group-hover:bg-primary/30">
            <Play
              className="ml-0.5 h-6 w-6 fill-primary text-primary sm:h-8 sm:w-8"
              strokeWidth={1.5}
            />
          </span>
        </span>
      </div>
    </button>
  );
}
