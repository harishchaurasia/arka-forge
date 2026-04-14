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
  { href: "/technology", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/company", label: "Company" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

const SCROLL_THRESHOLD = 80;
const EASE = "cubic-bezier(0.25, 0.1, 0.25, 1)";

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
          "relative mx-auto flex h-16 items-center rounded-2xl border border-white/10 px-5 shadow-[0_10px_60px_-28px_rgba(80,140,255,0.7)]",
          "bg-background/25",
          "backdrop-blur-2xl ring-1 ring-white/5",
        )}
      >
        {/* Mobile layout: spacer / centered logo / hamburger */}
        <div className="flex w-full items-center md:hidden">
          <div className="h-9 w-9 flex-shrink-0" aria-hidden />
          <div className="flex-1 flex justify-center">
            <Link
              href="/"
              className="flex items-center gap-2 transition-opacity hover:opacity-90"
              aria-label="Arka Forge Home"
            >
              <div className="flex items-center justify-center">
                <Image
                  src="/arka-forge-logo.png"
                  alt="Arka Forge logo"
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full object-contain"
                />
              </div>
            </Link>
          </div>
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="flex-shrink-0">
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
                    (item.href !== "/" && pathname.startsWith(item.href + "/"));
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
        </div>

        {/* Desktop layout: absolute-positioned logo + centered nav items + hamburger */}
        <div className="relative hidden md:block w-full h-full">
          {/* Logo - centered when closed, slides to the left when open */}
          <Link
            href="/"
            aria-label="Arka Forge Home"
            className={cn(
              "absolute top-1/2 flex items-center gap-2 transition-[left,transform] hover:opacity-90",
            )}
            style={{
              left: desktopOpen ? "0px" : "50%",
              transform: desktopOpen
                ? "translate(0, -50%)"
                : "translate(-50%, -50%)",
              transitionDuration: "700ms",
              transitionTimingFunction: EASE,
            }}
            onClick={() => setDesktopOpen(false)}
          >
            <div className="flex items-center justify-center">
              <Image
                src="/arka-forge-logo.png"
                alt="Arka Forge logo"
                width={36}
                height={36}
                className="h-9 w-9 rounded-full object-contain"
              />
            </div>
            <span className="pt-1 text-2xl font-bold text-primary font-display leading-none">
              Arka Forge
            </span>
          </Link>

          {/* Centered nav items - fade in when open */}
          <div
            id="site-navigation-drawer"
            aria-hidden={!desktopOpen}
            className={cn(
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity",
              desktopOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none",
            )}
            style={{
              transitionDuration: "200ms",
              transitionTimingFunction: EASE,
              transitionDelay: desktopOpen ? "200ms" : "0ms",
            }}
          >
            <div className="flex flex-row flex-nowrap items-center gap-2">
              {navItems.map((item) => {
                const active =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href + "/"));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setDesktopOpen(false)}
                    className={cn(
                      "whitespace-nowrap px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-300",
                      active
                        ? "text-primary bg-primary/[0.08]"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/[0.05]",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Hamburger - fixed at the right */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1/2 right-0 -translate-y-1/2 h-9 w-9"
            onClick={() => setDesktopOpen((v) => !v)}
            aria-expanded={desktopOpen}
            aria-controls="site-navigation-drawer"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}
