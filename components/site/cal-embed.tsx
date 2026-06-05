"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect, useState } from "react";
import { useTheme } from "@/components/site/theme-provider";

export function CalEmbed() {
  const { theme } = useTheme();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
    (async function () {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
        theme: theme === "light" ? "light" : "dark",
      });
      cal("on", {
        action: "linkReady",
        callback: () => setLoaded(true),
      });
    })();
  }, [theme]);

  return (
    <div className="relative min-h-[600px]">
      {!loaded && <CalSkeleton />}
      <Cal
        key={theme}
        namespace="30min"
        calLink="harishchaurasia/30min"
        style={{
          width: "100%",
          height: "100%",
          minHeight: "600px",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
        config={{ layout: "month_view", theme: theme === "light" ? "light" : "dark" }}
      />
    </div>
  );
}

function CalSkeleton() {
  return (
    <div className="absolute inset-0 flex gap-6 p-6 animate-pulse">
      {/* Left panel */}
      <div className="flex flex-col gap-4 w-56 shrink-0">
        <div className="h-8 w-8 rounded-full bg-muted" />
        <div className="h-4 w-32 rounded bg-muted" />
        <div className="h-3 w-44 rounded bg-muted" />
        <div className="h-3 w-28 rounded bg-muted mt-2" />
        <div className="h-3 w-36 rounded bg-muted" />
        <div className="h-3 w-24 rounded bg-muted" />
      </div>
      {/* Calendar grid */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="h-5 w-28 rounded bg-muted" />
          <div className="flex gap-2">
            <div className="h-6 w-6 rounded bg-muted" />
            <div className="h-6 w-6 rounded bg-muted" />
          </div>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="h-3 rounded bg-muted" />
          ))}
          {Array.from({ length: 35 }).map((_, i) => (
            <div key={i} className="h-10 rounded-lg bg-muted" />
          ))}
        </div>
      </div>
    </div>
  );
}
