import Link from "next/link";

const footerLinks = {
  company: [
    { href: "/company", label: "About" },
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact" },
  ],
  legal: [
    { href: "/legal/privacy", label: "Privacy Policy" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] glass-surface">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-10 mb-10">
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-base font-semibold tracking-tight mb-2">Arka Forge</h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-[240px]">
              Forging intelligent worlds through cutting-edge technology.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Company</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Legal</h4>
            <ul className="space-y-2.5">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-white/[0.04]">
          <p className="text-xs text-muted-foreground text-center" suppressHydrationWarning>
            &copy; {new Date().getFullYear()} Arka Forge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
