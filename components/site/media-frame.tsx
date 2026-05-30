import Image from "next/image";
import { cn } from "@/lib/utils";
import { YouTubePlayer } from "./youtube-player";

const ASPECT_MAP: Record<string, string> = {
  "16/9": "56.25%",
  "4/3": "75%",
  "3/2": "66.67%",
  "1/1": "100%",
  "21/9": "42.86%",
};

interface MediaFrameProps {
  src?: string;
  videoSrc?: string;
  ytId?: string;
  poster?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  alt?: string;
  label?: string;
  aspect?: "16/9" | "4/3" | "3/2" | "1/1" | "21/9";
  redacted?: boolean;
  note?: string;
  dims?: string;
  className?: string;
}

export function MediaFrame({
  src,
  videoSrc,
  ytId,
  poster,
  autoplay = true,
  loop = true,
  muted = true,
  controls = false,
  alt,
  label,
  aspect = "16/9",
  redacted = false,
  note,
  dims,
  className,
}: MediaFrameProps) {
  const paddingTop = ASPECT_MAP[aspect] ?? ASPECT_MAP["16/9"];

  return (
    <figure
      className={cn(
        "relative select-none not-prose",
        className
      )}
    >
      {/* Outer dark frame */}
      <div className="relative bg-[hsl(224,16%,3%)] border border-white/[0.08] rounded-sm overflow-hidden">

        {/* Media container - letterbox via padding-top trick */}
        <div className="relative w-full overflow-hidden" style={{ paddingTop }}>
          {ytId ? (
            <YouTubePlayer id={ytId} label={label} />
          ) : videoSrc ? (
            <video
              src={videoSrc}
              poster={poster}
              autoPlay={autoplay}
              loop={loop}
              muted={muted}
              playsInline
              controls={controls}
              preload={poster ? "metadata" : "auto"}
              aria-label={alt ?? label ?? undefined}
              className="absolute inset-0 h-full w-full object-cover"
              style={{
                filter: "saturate(0.82) contrast(1.04) brightness(0.97)",
              }}
            />
          ) : src ? (
            <Image
              src={src}
              alt={alt ?? label ?? ""}
              fill
              sizes="(min-width: 1024px) 900px, (min-width: 640px) 80vw, 100vw"
              className="object-cover"
              style={{
                filter: "saturate(0.82) contrast(1.04) brightness(0.97)",
              }}
            />
          ) : (
            <div
              aria-hidden="true"
              className="absolute inset-0 flex flex-col items-center justify-center gap-1.5"
              style={{
                background:
                  "repeating-linear-gradient(135deg, hsl(224 16% 6%) 0, hsl(224 16% 6%) 10px, hsl(224 16% 8%) 10px, hsl(224 16% 8%) 20px)",
              }}
            >
              <span className="font-mono text-2xs uppercase tracking-[0.3em] text-white/35">
                Placeholder
              </span>
              {dims && (
                <span className="font-mono text-2xs tracking-wider text-white/25">
                  {dims}
                </span>
              )}
            </div>
          )}

          {/* Vignette overlay */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 55%, hsl(224 16% 3% / 0.55) 100%)",
            }}
          />

          {/* Top-edge grade toward background */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-8 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, hsl(224 16% 3% / 0.35), transparent)",
            }}
          />

          {/* Bottom-edge grade - creates space the label bar sits against */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, hsl(224 16% 3% / 0.75), transparent)",
            }}
          />

          {/* Redaction overlay */}
          {redacted && (
            <div
              aria-hidden="true"
              className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
              style={{
                background: "hsl(224 16% 3% / 0.82)",
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 3px, hsl(220 13% 16% / 0.4) 3px, hsl(220 13% 16% / 0.4) 4px)",
              }}
            >
              <span
                className="font-mono text-2xs font-medium tracking-[0.3em] uppercase text-white/30 border border-white/10 px-3 py-1"
              >
                Selected Views Shown
              </span>
            </div>
          )}
        </div>

        {/* Label bar */}
        {(label || note) && (
          <div className="flex items-center justify-between px-3 py-1.5 border-t border-white/[0.06] bg-[hsl(224,16%,3%)]">
            {label && (
              <span className="font-mono text-2xs font-medium text-white/35 tracking-wide truncate">
                {label}
              </span>
            )}
            {note && (
              <span className="font-mono text-2xs font-medium text-white/20 tracking-wide ml-4 shrink-0">
                {note}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Corner brackets - sit on the outer border edge */}
      <CornerBrackets />

      {/* Screen-reader caption */}
      {label && (
        <figcaption className="sr-only">{label}</figcaption>
      )}
    </figure>
  );
}

function CornerBrackets() {
  const size = "10px";
  const color = "hsl(var(--primary) / 0.5)";
  const thickness = "1px";

  const corners = [
    { top: -1, left: -1, borderTop: thickness, borderLeft: thickness, borderRight: "none", borderBottom: "none" },
    { top: -1, right: -1, borderTop: thickness, borderRight: thickness, borderLeft: "none", borderBottom: "none" },
    { bottom: -1, left: -1, borderBottom: thickness, borderLeft: thickness, borderTop: "none", borderRight: "none" },
    { bottom: -1, right: -1, borderBottom: thickness, borderRight: thickness, borderTop: "none", borderLeft: "none" },
  ];

  return (
    <>
      {corners.map((c, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            position: "absolute",
            width: size,
            height: size,
            borderStyle: "solid",
            borderColor: color,
            borderTopWidth: c.borderTop,
            borderLeftWidth: c.borderLeft,
            borderRightWidth: c.borderRight,
            borderBottomWidth: c.borderBottom,
            top: c.top,
            left: c.left,
            right: c.right,
            bottom: c.bottom,
          }}
        />
      ))}
    </>
  );
}
