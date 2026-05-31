import { cn } from "@/lib/utils";

// Physical -> digital twin (train/learn/assess) -> physical - the full training
// loop. Endpoints muted (real world); middle two primary (digital). Last cube
// carries a small primary tick: the skill has landed, closing the cycle.
export function TwinSchematic({ className }: { className?: string }) {
  const cubes = [
    { cx: 80, tone: "muted", label1: "PHYSICAL WORLD", label2: "WORKSPACE", tick: false, glyph: false },
    { cx: 240, tone: "primary", label1: "DIGITAL TWIN", label2: "TRAIN · LEARN · ASSESS", tick: false, glyph: true },
    { cx: 400, tone: "muted", label1: "PHYSICAL WORLD", label2: "READY", tick: true, glyph: false },
  ] as const;

  const connectorLabels = ["MODELED", "TRANSFERRED"];

  return (
    <svg
      viewBox="40 25 400 112"
      className={cn("block h-auto w-full max-w-xl", className)}
      fill="none"
      strokeLinejoin="round"
      aria-hidden
    >
      {cubes.slice(0, -1).map((c, i) => {
        const next = cubes[i + 1];
        const startX = c.cx + 25;
        const endX = next.cx - 25;
        const midX = (startX + endX) / 2;
        return (
          <g key={`conn-${i}`}>
            <path
              d={`M${startX} 65 H${endX}`}
              className="stroke-primary"
              strokeWidth="1.5"
              strokeDasharray="3 4"
            />
            <path
              d={`M${endX - 7} 60 L${endX + 3} 65 L${endX - 7} 70`}
              className="stroke-primary"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <text
              x={midX}
              y="57"
              textAnchor="middle"
              className="fill-primary/70 font-mono"
              fontSize="7"
              letterSpacing="1.5"
            >
              {connectorLabels[i]}
            </text>
          </g>
        );
      })}

      {cubes.map((c, i) => {
        const stroke =
          c.tone === "primary" ? "stroke-primary" : "stroke-muted-foreground";
        const topFill =
          c.tone === "primary" ? "fill-primary/15" : "fill-card/40";
        const leftFill =
          c.tone === "primary" ? "fill-primary/10" : "fill-background/50";
        const rightFill =
          c.tone === "primary" ? "fill-primary/20" : "fill-card/30";
        const labelStroke =
          c.tone === "primary" ? "fill-primary" : "fill-muted-foreground";
        const labelSubStroke =
          c.tone === "primary"
            ? "fill-primary/60"
            : "fill-muted-foreground/60";

        return (
          <g key={`cube-${i}`}>
            <g className={stroke} strokeWidth="1.5">
              <path
                d={`M${c.cx - 20} 50 L${c.cx} 40 L${c.cx + 20} 50 L${c.cx} 60 Z`}
                className={`${topFill} ${stroke}`}
              />
              <path
                d={`M${c.cx - 20} 50 L${c.cx - 20} 80 L${c.cx} 90 L${c.cx} 60 Z`}
                className={`${leftFill} ${stroke}`}
              />
              <path
                d={`M${c.cx + 20} 50 L${c.cx + 20} 80 L${c.cx} 90 L${c.cx} 60 Z`}
                className={`${rightFill} ${stroke}`}
              />
            </g>

            {c.glyph && (
              <g className="fill-primary">
                <circle cx={c.cx} cy="30" r="2.8" />
                <path d={`M${c.cx - 5.5} 41 Q${c.cx} 33.5 ${c.cx + 5.5} 41 Z`} />
              </g>
            )}

            {c.tick && (
              <g
                className="stroke-primary"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle
                  cx={c.cx + 18}
                  cy="42"
                  r="6"
                  className="fill-background"
                />
                <path d={`M${c.cx + 15} 42 L${c.cx + 17.5} 44.5 L${c.cx + 21} 40`} />
              </g>
            )}

            <text
              x={c.cx}
              y="115"
              textAnchor="middle"
              className={`${labelStroke} font-mono`}
              fontSize="9"
              letterSpacing="1"
            >
              {c.label1}
            </text>
            <text
              x={c.cx}
              y="128"
              textAnchor="middle"
              className={`${labelSubStroke} font-mono`}
              fontSize="7"
              letterSpacing="1.5"
            >
              {c.label2}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
