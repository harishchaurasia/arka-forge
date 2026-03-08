"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/technology", label: "Technology" },
  { href: "/labs", label: "Labs" },
  { href: "/work", label: "Work" },
  { href: "/company", label: "Company" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

const SCROLL_THRESHOLD = 80;

export function Nav() {
  const [isOpen, setIsOpen] = React.useState(false);
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

  return (
    <nav
      className={cn(
        "fixed left-1/2 z-50 w-full max-w-6xl -translate-x-1/2 px-4 transition-all duration-300",
        atTop ? "top-4" : "top-3",
        "before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:blur-3xl before:bg-[radial-gradient(circle_at_20%_20%,rgba(82,179,255,0.12),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(124,58,237,0.10),transparent_35%)]"
      )}
    >
      <div
        className={cn(
          "relative mx-auto flex h-16 items-center justify-between rounded-2xl border border-white/10 bg-background/65 px-5 shadow-[0_10px_60px_-30px_rgba(80,140,255,0.7)]",
          "backdrop-blur-2xl ring-1 ring-white/5"
        )}
      >
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-72 border-r border-white/10 bg-background/60 backdrop-blur-2xl shadow-[0_20px_70px_-30px_rgba(0,0,0,0.7)]"
          >
            <nav className="flex flex-col gap-1 mt-10">
              {navItems.map((item) => {
                const active =
                  pathname === item.href ||
                  pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                      active
                        ? "text-primary bg-primary/[0.08]"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/[0.05]"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </SheetContent>
        </Sheet>

        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-foreground transition-colors hover:text-primary"
        >
          Arka Forge
        </Link>

        <div className="h-9 w-9 md:hidden" aria-hidden />

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3.5 py-1.5 text-[13px] font-medium rounded-lg transition-all duration-200",
                  active
                    ? "text-primary bg-primary/[0.08] shadow-[inset_0_0.5px_0_0_rgba(77,154,245,0.2)]"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/[0.05] hover:-translate-y-[1px]"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

      </div>

    </nav>
  );
}
