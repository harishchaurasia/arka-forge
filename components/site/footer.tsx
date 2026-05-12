import Link from "next/link";
import { Linkedin, Instagram, Mail } from "lucide-react";

const footerLinks = {
  company: [
    { href: "/company", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  legal: [{ href: "/legal/privacy", label: "Privacy Policy" }],
};

const socials = [
  {
    href: "https://www.linkedin.com/company/arkaforge",
    label: "LinkedIn",
    icon: Linkedin,
  },
  {
    href: "https://instagram.com/arka.forge",
    label: "Instagram",
    icon: Instagram,
  },
  { href: "mailto:contact@arkaforge.com", label: "Email", icon: Mail },
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] glass-surface">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-10 mb-10">
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-base font-semibold tracking-tight mb-2">
              ArkaForge
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-[280px] mb-4">
              Game engineering &amp; technology studio — game co-development for
              studios and publishers, plus interactive products for teams outside
              games.
            </p>
            <div className="flex gap-3">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("mailto") ? undefined : "_blank"}
                    rel={
                      s.href.startsWith("mailto")
                        ? undefined
                        : "noopener noreferrer"
                    }
                    className="flex items-center justify-center w-8 h-8 rounded-lg glass-pill text-muted-foreground hover:text-primary transition-colors"
                    aria-label={s.label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-white/[0.04]">
          <p
            className="text-xs text-muted-foreground text-center"
            suppressHydrationWarning
          >
            &copy; {new Date().getFullYear()} ArkaForge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
