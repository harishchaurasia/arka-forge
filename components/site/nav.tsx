"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/technology", label: "Technology" },
  { href: "/work", label: "Work" },
  { href: "/company", label: "Company" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

const SCROLL_THRESHOLD = 80;

export function Nav() {
  const [desktopOpen, setDesktopOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const pathname = usePathname();

  const [atTop, setAtTop] = React.useState(true);

  React.useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setAtTop(window.scrollY < SCROLL_THRESHOLD);
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    // Close menus on navigation.
    setDesktopOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  return (
    <nav
      className={cn(
        "fixed left-1/2 z-50 w-full max-w-6xl -translate-x-1/2 px-4 transition-all duration-300",
        atTop ? "top-4" : "top-3",
        "before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:blur-3xl before:bg-[radial-gradient(circle_at_20%_20%,rgba(82,179,255,0.12),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(124,58,237,0.10),transparent_35%)]",
      )}
    >
      <div
        className={cn(
          // Outer nav shell.
          // - `rounded-2xl` controls the big bar corner radius.
          // - `border`/`ring` define edge contrast.
          "relative mx-auto flex h-16 items-center justify-between rounded-2xl border border-white/10 px-5 shadow-[0_10px_60px_-28px_rgba(80,140,255,0.7)]",
          // Desktop open state uses solid background to avoid see-through artifacts.
          // Closed state stays slightly translucent.
          desktopOpen ? "md:bg-background" : "bg-background/25",
          // Frosted effect for the outer shell. Reduce/remove blur if you want a flatter style.
          "backdrop-blur-2xl ring-1 ring-white/5",
        )}
      >
        <div className="flex w-full items-center">
          {/* Mobile-only left spacer to visually center the logo. */}
          <div className="h-9 w-9 md:hidden flex-shrink-0" aria-hidden />

          {/* Left / center: logo area */}
          <div
            className={cn(
              "flex-1 flex justify-center",
              desktopOpen ? "md:justify-start" : "",
            )}
          >
            <Link
              href="/"
              className="flex items-center gap-2 transition-opacity hover:opacity-90"
              aria-label="Arka Forge Home"
              onClick={() => {
                setDesktopOpen(false);
                setMobileOpen(false);
              }}
            >
              <div className="nav-logo-rotate">
                <Image
                  src="/arka-forge-logo.png"
                  alt="Arka Forge logo"
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full object-contain"
                />
              </div>
              <span className="hidden md:inline pt-1 text-xl font-bold text-primary font-display leading-none">
                Arka Forge
              </span>
            </Link>
          </div>

          {/* Sliding drawer: opens from behind the right hamburger */}
          <div
            id="site-navigation-drawer"
            aria-hidden={!desktopOpen}
            className={cn(
              // Desktop drawer panel that expands from right to left.
              // - `bg-background` is the panel fill color.
              // - `overflow-hidden` clips children during scale animation.
              // "hidden md:block h-full overflow-hidden border-l border-white/10 bg-backgroundshadow-[0_20px_70px_-30px_rgba(0,0,0,0.55)] origin-right transition-[width,opacity,transform] duration-500 ease-out",
              "hidden md:block h-full  origin-right transition-[width,opacity,transform] duration-500 ease-out",

              // Desktop positioning overrides.

              "md:absolute md:top-0 md:right-0 md:h-full md:border-none md:shadow-none",
              // Open vs closed animation state.
              // - `md:w-[72vw] md:max-w-[860px]` controls expanded size.
              // - `md:scale-x-0` collapses horizontally while keeping layout stable.
              desktopOpen
                ? "w-[20vw] max-w-xs opacity-100 translate-x-0 md:w-[72vw] md:max-w-[860px] md:scale-x-100"
                : "w-0 opacity-0 translate-x-0 pointer-events-none md:w-[72vw] md:max-w-[860px] md:scale-x-0",
            )}
          >
            {/* Inner links row:
                - `md:rounded-xl` is the radius you asked about.
                - `md:bg-transparent` means no extra background layer here.
                - `overflow-x-auto` allows horizontal scroll if links overflow. */}
            <nav className="py-4 flex flex-row flex-nowrap items-center justify-start gap-2 w-full px-2 overflow-x-auto scrollbar-thin md:bg-transparent md:rounded-xl">
              {navItems.map((item, idx) => {
                const active =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href + "/"));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setDesktopOpen(false)}
                    className={cn(
                      // Each nav pill.
                      // - `rounded-lg` controls button corner radius.
                      // - Active state background is `bg-primary/[0.08]`.
                      "flex-none whitespace-nowrap text-left px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 will-change-transform",
                      desktopOpen
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-2",
                      active
                        ? "text-primary bg-primary/[0.08]"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/[0.05]",
                    )}
                    style={{
                      // Stagger reveal for a cascading animation.
                      // Increase `60` for slower stagger, decrease for snappier feel.
                      transitionDelay: desktopOpen ? `${idx * 45}ms` : "0ms",
                    }}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right side: mobile sheet + desktop drawer toggle */}
          <div className="flex-shrink-0 z-[1] flex items-center gap-2">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild className="md:hidden flex-shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9"
                  aria-expanded={mobileOpen}
                  aria-controls="mobile-navigation-drawer"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-72 border-r border-white/10 bg-background/60 backdrop-blur-2xl shadow-[0_20px_70px_-30px_rgba(0,0,0,0.7)] [&>button]:left-4 [&>button]:right-auto"
              >
                <nav className="flex flex-col gap-1 mt-10 w-full">
                  {navItems.map((item) => {
                    const active =
                      pathname === item.href ||
                      (item.href !== "/" &&
                        pathname.startsWith(item.href + "/"));
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "w-full text-left px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                          active
                            ? "text-primary bg-primary/[0.08]"
                            : "text-muted-foreground hover:text-foreground hover:bg-white/[0.05]",
                        )}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>
              </SheetContent>
            </Sheet>

            <Button
              variant="ghost"
              size="icon"
              className="hidden md:inline-flex h-9 w-9"
              onClick={() => setDesktopOpen((v) => !v)}
              aria-expanded={desktopOpen}
              aria-controls="site-navigation-drawer"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
