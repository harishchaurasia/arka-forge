"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/site/theme-provider";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/company", label: "Company" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

const SCROLL_THRESHOLD = 24;

function isActive(pathname: string, href: string) {
  return pathname === href || (href !== "/" && pathname.startsWith(href + "/"));
}

function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const isLight = theme === "light";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      title={isLight ? "Switch to dark mode" : "Switch to light mode"}
      className={cn(
        "inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors duration-200 hover:bg-foreground/[0.06] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
        className,
      )}
    >
      {isLight ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </button>
  );
}

export function Nav() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();
  const { theme } = useTheme();

  const logoSrc =
    theme === "light" ? "/arka-forge-logo-black.png" : "/arka-forge-logo.png";

  React.useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > SCROLL_THRESHOLD);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <nav
      className={cn(
        "fixed left-1/2 z-50 w-full max-w-6xl -translate-x-1/2 px-4 transition-all duration-300",
        scrolled ? "top-3" : "top-4",
      )}
    >
      <div
        className={cn(
          "relative mx-auto flex h-16 items-center justify-between rounded-2xl border px-4 transition-all duration-300 sm:px-5",
          scrolled
            ? "border-border bg-background/70 shadow-lg shadow-black/5 backdrop-blur-xl"
            : "border-transparent hover:border-border hover:bg-background/70 hover:shadow-lg hover:shadow-black/5 hover:backdrop-blur-xl",
        )}
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label="ArkaForge Home"
          className="flex flex-shrink-0 items-center gap-2 transition-opacity hover:opacity-90"
        >
          <Image
            src={logoSrc}
            alt="ArkaForge logo"
            width={36}
            height={36}
            className="h-9 w-9 rounded-full object-contain"
          />
          <span className="pt-0.5 font-display text-xl font-bold leading-none text-primary">
            ArkaForge
          </span>
        </Link>

        {/* Desktop nav — links + theme toggle */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                isActive(pathname, item.href)
                  ? "bg-foreground/[0.06] text-primary"
                  : "text-muted-foreground hover:bg-foreground/[0.06] hover:text-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
          <ThemeToggle className="ml-1" />
        </div>

        {/* Mobile — theme toggle + hamburger → X + drawer */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 cursor-pointer"
                aria-expanded={mobileOpen}
                aria-controls="mobile-navigation-drawer"
              >
                {mobileOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              id="mobile-navigation-drawer"
              className="w-72 border-l border-border bg-background/95 backdrop-blur-2xl"
            >
              <nav className="mt-10 flex w-full flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    aria-current={
                      isActive(pathname, item.href) ? "page" : undefined
                    }
                    className={cn(
                      "w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium transition-colors duration-200",
                      isActive(pathname, item.href)
                        ? "bg-primary/[0.08] text-primary"
                        : "text-muted-foreground hover:bg-foreground/[0.06] hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
