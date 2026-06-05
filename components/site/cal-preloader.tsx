"use client";

import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export function CalPreloader() {
  useEffect(() => {
    getCalApi({ namespace: "30min" }).then((cal) => {
      cal("preload", { calLink: "harishchaurasia/30min" });
    });
  }, []);

  return null;
}
