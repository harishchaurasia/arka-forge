"use client";

import * as React from "react";

type Theme = "dark" | "light";

const ThemeContext = React.createContext<{ theme: Theme; toggle: () => void }>({
  theme: "dark",
  toggle: () => {},
});

export const useTheme = () => React.useContext(ThemeContext);

// Sets data-theme on <html> so every section themes together, persists the
// choice, and exposes the toggle to anything that needs it (the nav).
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState<Theme>("dark");

  React.useEffect(() => {
    const saved = localStorage.getItem("af-theme");
    const params = new URLSearchParams(window.location.search);
    if (params.get("hero") === "light" || saved === "light") setTheme("light");
    else if (saved === "dark") setTheme("dark");
  }, []);

  React.useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("af-theme", theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  const toggle = React.useCallback(
    () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    [],
  );

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
