# ArkaForge Website Repositioning — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reposition and refresh the ArkaForge site so a first-time visitor instantly understands it is a **game engineering & technology studio** (game co-development as the lead offer, interactive products as the second offer, simulation/digital-twin work as proof of depth), the proof backs the claims, and the site reads like a game studio rather than a generic dark-glass SaaS template.

**Architecture:** Existing Next.js 16 App Router site + Tailwind + framer-motion + React-Three-Fiber. Approach "A+B": keep the framework and component kit; rewrite copy, restructure routes, fix SEO, purge dead code (Phase 1 — the message fix); re-grade the visuals (Phase 2); upgrade the hero to a visible real-time scene (Phase 3); build out two real case studies + a testimonials collection (Phase 4); polish (Phase 5).

**Tech Stack:** Next.js 16 (App Router, RSC), TypeScript, Tailwind CSS 3, framer-motion, three / @react-three/fiber / @react-three/drei / postprocessing, next-mdx-remote, gray-matter, zod, lucide-react.

**No test runner exists.** Per-task verification = `npx tsc --noEmit` + `npx next lint` (both clean) and the stated manual check. Phase boundary = `npm run build` succeeds + redirect/route QA. Run the dev server (`npm run dev`) for manual checks.

**Source spec:** `docs/superpowers/specs/2026-05-12-arkaforge-website-repositioning-design.md` — read §3 (messaging guardrails) before writing any copy.

**Branch:** `website-repositioning` (already created; the spec is committed there).

---

## Messaging guardrails (apply to every copy step)

1. Say what we do plainly above the fold. Identity line: **"a game engineering & technology studio."** Homepage subhead must spell it out (game co-dev for studios/publishers; interactive products for everyone else; engine depth proven on a nuclear training simulator).
2. Never claim shipped commercial game titles.
3. Never claim active digital-twin/enterprise clients. The Los Alamos work = a nuclear glovebox training simulator built by the founder as a graduate researcher at ASU's School of Manufacturing Systems & Networks, in connection with Los Alamos National Laboratory — "the technical foundation this company is built on," not an ArkaForge client engagement.
4. Never "I." Always "we / the team / ArkaForge." Studio = founder-led + a curated network of senior game engineers, developers, designers — stated honestly, framed as a deliberate model, no individual bios.
5. Geography-neutralization claims (overlap hours, named lead, "your repo/tools/standards") must be promises that will be kept. **Leave the exact overlap-hours number as `{{OVERLAP_HOURS}}` for the founder to fill** — do not invent it.
6. Pricing = indicative ranges, labelled as such.
7. Imperfect/sensitive assets: honest presentation, visible redactions.
8. No keyword stuffing.

---

# PHASE 1 — The message fix (positioning, copy, IA, SEO, dead-code purge)

*Completing Phase 1 yields a working, deployable site that clearly states what ArkaForge does. Phases 2–5 are enhancements.*

---

### Task 1.1: Baseline build check

**Files:** none (verification only)

- [ ] **Step 1: Confirm clean starting state**

Run: `npm run build`
Expected: build succeeds. If it fails, stop and report — do not proceed on a broken baseline.

- [ ] **Step 2: Confirm typecheck + lint clean**

Run: `npx tsc --noEmit && npx next lint`
Expected: both clean (warnings OK, errors not).

---

### Task 1.2: Delete dead code

**Files:**
- Delete: `components/site/capabilities-grid.tsx`, `components/site/services-grid.tsx`, `components/site/proof-strip.tsx`, `components/site/vision-section.tsx`, `components/site/why-it-matters.tsx`, `components/site/how-we-work.tsx`, `components/site/use-cases.tsx`, `components/site/systems-mindset.tsx`, `components/site/featured-labs.tsx`, `components/site/featured-labs-client.tsx`, `components/site/featured-work.tsx`, `components/site/featured-work-client.tsx`
- Delete: `app/(site)/careers/page_old.tsx`
- Delete: `components/site/splash-screen.tsx`
- Modify: `app/(site)/layout.tsx` (remove `SplashScreen` import + usage)

- [ ] **Step 1: Verify each component is unimported before deleting**

Run: `grep -rn "capabilities-grid\|services-grid\|proof-strip\|vision-section\|why-it-matters\|how-we-work\|use-cases\|systems-mindset\|featured-labs\|featured-work\|splash-screen\|page_old" app components --include="*.tsx" --include="*.ts" | grep -v "components/site/\(capabilities-grid\|services-grid\|proof-strip\|vision-section\|why-it-matters\|how-we-work\|use-cases\|systems-mindset\|featured-labs\|featured-labs-client\|featured-work\|featured-work-client\|splash-screen\)\.tsx" | grep -v "careers/page_old.tsx"`
Expected: the only remaining match is `app/(site)/layout.tsx` importing `SplashScreen`. If anything else references these, stop and reassess.

- [ ] **Step 2: Delete the files**

```bash
git rm components/site/capabilities-grid.tsx components/site/services-grid.tsx components/site/proof-strip.tsx components/site/vision-section.tsx components/site/why-it-matters.tsx components/site/how-we-work.tsx components/site/use-cases.tsx components/site/systems-mindset.tsx components/site/featured-labs.tsx components/site/featured-labs-client.tsx components/site/featured-work.tsx components/site/featured-work-client.tsx "app/(site)/careers/page_old.tsx" components/site/splash-screen.tsx
```

- [ ] **Step 3: Remove SplashScreen from the site layout**

In `app/(site)/layout.tsx`: delete the line `import { SplashScreen } from "@/components/site/splash-screen";` and delete the `<SplashScreen />` element. Result:

```tsx
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { Toaster } from "@/components/ui/toaster";
import { SmoothScroll } from "@/components/site/smooth-scroll";
import { SkipToContent } from "@/components/site/skip-to-content";
import { GalaxyBackground } from "@/components/site/galaxy-background";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GalaxyBackground />
      <SmoothScroll>
        <SkipToContent />
        <Nav />
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
        <Footer />
        <Toaster />
      </SmoothScroll>
    </>
  );
}
```

- [ ] **Step 4: Also remove splash-related CSS**

In `app/globals.css`, delete the `SPLASH / INTRO SCREEN` block (the `.splash-overlay`, `.splash-logo-img`, `@keyframes splash-*`, `.splash-text`, etc. — everything from `/* ═══ SPLASH / INTRO SCREEN ═══ */` down to and including `@keyframes splash-fade-out { ... }`). Leave the `NAV LOGO` comment block and the `prefers-reduced-motion` block (but remove the now-dead `.nav-logo-rotate` rule reference inside reduced-motion if it has no counterpart — it's harmless either way; leave it).

- [ ] **Step 5: Verify**

Run: `npx tsc --noEmit && npx next lint`
Expected: clean. Run `npm run dev`, load `/` — splash screen no longer appears, page renders.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "remove dead components, page_old, and the splash screen"
```

---

### Task 1.3: Restructure routes — `/services` replaces `/technology`, delete `/labs`, add redirects

**Files:**
- Create: `app/(site)/services/page.tsx`, `app/(site)/services/game-co-development/page.tsx`, `app/(site)/services/interactive-products/page.tsx`
- Delete: `app/(site)/technology/` (entire directory: `page.tsx`, `gamedev/page.tsx`, `digitaltwins/page.tsx`, `simulation/page.tsx`, `xr/page.tsx`, `learning/page.tsx`)
- Delete: `app/(site)/labs/` (entire directory: `page.tsx`, `[slug]/page.tsx`)
- Delete: `content/labs/` (`.gitkeep`, `simulation-systems.mdx`)
- Modify: `next.config.ts` (add redirects)
- Modify: `lib/content/loader.ts` (remove `getLabs`, `getLab`, `LabPost`, lab schema import)
- Modify: `lib/content/schemas.ts` (remove `labFrontmatterSchema`, `LabFrontmatter`)
- Modify: `app/sitemap.ts` (remove `/technology*`, `/labs*`; add `/services*`; remove `getLabs` usage)
- Modify: `components/mdx/mdx-components.tsx` — only if it imports lab types (check)

This task creates the three new service pages with **placeholder copy** — real copy lands in Task 1.7. The point of doing routes first is to get redirects + sitemap consistent before touching content.

- [ ] **Step 1: Delete `/labs` route + content + loader/schema lab code**

```bash
git rm -r "app/(site)/labs" "content/labs"
```

In `lib/content/schemas.ts` — remove the lab schema and type, leaving:

```ts
import { z } from "zod";

export const workFrontmatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  tags: z.array(z.string()).default([]),
  published: z.boolean().default(true),
  hero: z.string().optional(),
  client: z.string().optional(),
  metrics: z.record(z.string(), z.union([z.string(), z.number()])).optional(),
});

export type WorkFrontmatter = z.infer<typeof workFrontmatterSchema>;
```

In `lib/content/loader.ts` — remove the `labFrontmatterSchema`/`LabFrontmatter` import, the `LabPost` interface, and the `getLabs`/`getLab` functions. Leave `getSlugFromFilename`, `WorkPost`, `getWork`, `getWorkPost`. Result imports line:

```ts
import { workFrontmatterSchema, type WorkFrontmatter } from "./schemas";
```

- [ ] **Step 2: Fix `app/sitemap.ts`**

Replace its content with:

```ts
import { MetadataRoute } from "next";
import { getWork } from "@/lib/content/loader";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://arkaforge.com";
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/services/game-co-development`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/services/interactive-products`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/work`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/company`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/careers`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/legal/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const work = await getWork();
  const workRoutes: MetadataRoute.Sitemap = work.map((item) => ({
    url: `${baseUrl}/work/${item.slug}`,
    lastModified: new Date(item.frontmatter.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...workRoutes];
}
```

- [ ] **Step 3: Delete the `/technology` tree**

```bash
git rm -r "app/(site)/technology"
```

- [ ] **Step 4: Create the three new service pages (placeholder copy — real copy in Task 1.7)**

`app/(site)/services/page.tsx`:

```tsx
import { Metadata } from "next";
import { Section } from "@/components/site/section";
import { BackLink } from "@/components/site/back-link";

export const metadata: Metadata = {
  title: "Services - ArkaForge",
  description: "Game co-development for studios and publishers, and interactive products for teams outside games.",
};

export default function ServicesPage() {
  return (
    <Section>
      <BackLink href="/" label="Back to Home" />
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Services</h1>
      <p className="text-base text-muted-foreground">Placeholder — real copy in Task 1.7.</p>
    </Section>
  );
}
```

`app/(site)/services/game-co-development/page.tsx`:

```tsx
import { Metadata } from "next";
import { Section } from "@/components/site/section";
import { BackLink } from "@/components/site/back-link";

export const metadata: Metadata = {
  title: "Game Co-Development - ArkaForge",
  description: "Embed ArkaForge into your UE5 or Unity pipeline — features, systems, AI, prototypes, and vertical slices.",
};

export default function GameCoDevelopmentPage() {
  return (
    <Section>
      <BackLink href="/services" label="Back to Services" />
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Game Co-Development</h1>
      <p className="text-base text-muted-foreground">Placeholder — real copy in Task 1.7.</p>
    </Section>
  );
}
```

`app/(site)/services/interactive-products/page.tsx`:

```tsx
import { Metadata } from "next";
import { Section } from "@/components/site/section";
import { BackLink } from "@/components/site/back-link";

export const metadata: Metadata = {
  title: "Interactive Products - ArkaForge",
  description: "Game-engine craft outside games — gamified products, training simulations, configurators, and interactive 3D/data experiences.",
};

export default function InteractiveProductsPage() {
  return (
    <Section>
      <BackLink href="/services" label="Back to Services" />
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Interactive Products</h1>
      <p className="text-base text-muted-foreground">Placeholder — real copy in Task 1.7.</p>
    </Section>
  );
}
```

- [ ] **Step 5: Add redirects in `next.config.ts`**

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/technology", destination: "/services", permanent: true },
      { source: "/technology/gamedev", destination: "/services/game-co-development", permanent: true },
      { source: "/technology/digitaltwins", destination: "/work/los-alamos-asu-simulation", permanent: true },
      { source: "/technology/simulation", destination: "/work/los-alamos-asu-simulation", permanent: true },
      { source: "/technology/xr", destination: "/services/game-co-development", permanent: true },
      { source: "/technology/learning", destination: "/services/interactive-products", permanent: true },
      { source: "/technology/engine", destination: "/services/game-co-development", permanent: true },
      { source: "/labs", destination: "/work", permanent: true },
      { source: "/labs/:slug", destination: "/work", permanent: true },
    ];
  },
};

export default nextConfig;
```

- [ ] **Step 6: Verify**

Run: `npx tsc --noEmit && npx next lint`
Expected: clean (in particular, no dangling `getLabs`/`LabPost` references — if `components/mdx/mdx-components.tsx` or anything else still imports lab types, fix it).
Run: `npm run dev` → visit `/technology` (should 308→`/services`), `/labs` (should 308→`/work`), `/services`, `/services/game-co-development`, `/services/interactive-products` (all render placeholder), `/work` (still renders).

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "restructure routes: /services replaces /technology, drop /labs, add redirects"
```

---

### Task 1.4: Fix root layout metadata + kill the SEO keyword stuffing

**Files:**
- Modify: `app/layout.tsx`
- Modify: `lib/seo/metadata.ts` (`generateOrganizationSchema` description + logo path)

- [ ] **Step 1: Rewrite `app/layout.tsx` metadata**

Replace the `metadata` export with:

```ts
export const metadata: Metadata = {
  title: {
    default: "ArkaForge — Game Engineering & Technology Studio",
    template: "%s | ArkaForge",
  },
  description:
    "ArkaForge is a game engineering & technology studio. We co-develop games with studios and publishers — UE5 and Unity, features, systems, AI, prototypes, vertical slices — and build interactive products for teams outside games. The same engine depth is behind a performance-tracked nuclear training simulator.",
  keywords: [
    "game co-development",
    "game development outsourcing",
    "Unreal Engine 5 development",
    "Unity development studio",
    "vertical slice development",
    "game prototype studio",
    "AI in games",
    "serious games",
    "interactive product development",
    "simulation-based training",
  ],
  authors: [{ name: "ArkaForge" }],
  creator: "ArkaForge",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://arkaforge.com",
    siteName: "ArkaForge",
    title: "ArkaForge — Game Engineering & Technology Studio",
    description:
      "Game co-development for studios and publishers — UE5/Unity, features, systems, AI, prototypes, vertical slices — plus interactive products for teams outside games.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ArkaForge — Game Engineering & Technology Studio",
    description:
      "Game co-development for studios and publishers — UE5/Unity, features, systems, AI, prototypes, vertical slices — plus interactive products for teams outside games.",
  },
  robots: { index: true, follow: true },
};
```

- [ ] **Step 2: Update `generateOrganizationSchema` in `lib/seo/metadata.ts`**

Change the `description` to:
```ts
description: "ArkaForge is a game engineering & technology studio — game co-development for studios and publishers (UE5/Unity, features, systems, AI, prototypes, vertical slices) and interactive products for teams outside games.",
```
And change the `logo` value from `/logo.png` to `/arka-forge-logo.png` (the file that actually exists in `public/`) — both in `generateOrganizationSchema` and `generateArticleSchema`.

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit && npx next lint`
Run: `npm run dev`, view page source of `/` — `<title>` and `<meta name="description">` reflect the new copy; no 90-keyword block.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "rewrite root metadata; remove keyword stuffing"
```

---

### Task 1.5: Rewrite the nav

**Files:** Modify `components/site/nav.tsx`

- [ ] **Step 1: Update `navItems`**

In `components/site/nav.tsx`, change:
```ts
const navItems = [
  { href: "/technology", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/company", label: "Company" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];
```
to:
```ts
const navItems = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/company", label: "Company" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];
```
(That's the only change — label, route, and active-state logic now all agree.)

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit && npx next lint`. Manual: nav "Services" link goes to `/services` and shows active state there and on `/services/*`.

- [ ] **Step 3: Commit**

```bash
git add components/site/nav.tsx
git commit -m "point nav 'Services' at /services"
```

---

### Task 1.6: Rewrite the homepage

**Files:**
- Modify: `app/(site)/page.tsx`
- Modify: `components/site/hero.tsx` (copy only — the WebGL upgrade is Phase 3)
- Create: `components/site/what-we-do.tsx` (replaces the old `what-we-build.tsx` — keep that file for now, just stop importing it; it'll be deleted in cleanup if unused, or repurpose it)
- Create: `components/site/proof.tsx`
- Create: `components/site/how-we-work.tsx` (NOTE: a file by this name was deleted in Task 1.2 — this is a fresh, different component; the old one was dead code)
- Create: `components/site/the-studio.tsx`
- Modify: `components/site/cta-band.tsx` (copy only)
- Modify: `components/site/digital-twins-band.tsx` → repurpose or delete; the "deep end" content moves into `what-we-do.tsx` as the third card. **Delete `digital-twins-band.tsx` and `core-belief.tsx` and `featured-case.tsx`** (their content is absorbed/replaced).

> Implementation note: the new homepage = `<Hero/>` → `<WhatWeDo/>` → `<Proof/>` → `<HowWeWork/>` → `<TheStudio/>` → `<CTABand/>`. Keep using `framer-motion` `whileInView` fade-ups for now (the motion pass is Phase 2). Keep `glass-card`, `glass-icon`, `glass-pill`, `gradient-text` utility classes.

- [ ] **Step 1: Rewrite `components/site/hero.tsx` copy**

Keep the file's structure (the `?constrained=1` handling, the `HeroScene` dynamic import, the motion wrappers — all stay; Phase 3 swaps the scene). Change the **text content** to:

- Eyebrow pill text → `GAME ENGINEERING & TECHNOLOGY STUDIO`
- H1 → `Forging` / `<span className="gradient-text">intelligent worlds</span>` (keep)
- Subhead `<p>` → `A game engineering & technology studio. We co-develop games with studios and publishers — UE5 and Unity, features, systems, AI, prototypes, vertical slices — and build interactive products for teams outside games. The engine depth is the same depth behind a performance-tracked nuclear training simulator.`
- Primary CTA → `Schedule a call` → `https://calendar.app.google/9HXdsiKfCXCPeUya9` (keep)
- Secondary CTA → `See our work` → `/work` (keep)

- [ ] **Step 2: Create `components/site/what-we-do.tsx`**

```tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Boxes, Layers, FlaskConical } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ease = [0.25, 0.1, 0.25, 1];

interface Item {
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  cta: string;
  icon: LucideIcon;
  primary?: boolean;
}

const items: Item[] = [
  {
    eyebrow: "For studios & publishers",
    title: "Game co-development",
    body:
      "Embed us into your UE5 or Unity pipeline as a senior co-dev partner. Features, systems, AI and agentic NPCs, netcode, tools, UI — plus prototypes and vertical slices that take a pitch deck to a build a publisher will sit through. Scoped to your roadmap, shipped to your quality bar.",
    href: "/services/game-co-development",
    cta: "How co-dev works",
    icon: Layers,
    primary: true,
  },
  {
    eyebrow: "For teams outside games",
    title: "Interactive products",
    body:
      "Game-engine craft applied beyond games — gamified products and onboarding, training simulations, configurators, interactive 3D and data experiences. For teams that need something people use, not a page they skim.",
    href: "/services/interactive-products",
    cta: "What we build",
    icon: Boxes,
  },
  {
    eyebrow: "How deep it goes",
    title: "The deep end",
    body:
      "We built a performance-tracked nuclear glovebox training simulator — interactive environment, custom task-sequence logic, real-time error detection and readiness scoring — as graduate research connected to Los Alamos National Laboratory. That's the engineering floor, not the ceiling.",
    href: "/work/los-alamos-asu-simulation",
    cta: "See the case study",
    icon: FlaskConical,
  },
];

export function WhatWeDo() {
  return (
    <section className="py-28 md:py-36 relative" id="what-we-do">
      <div className="relative mx-auto max-w-6xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="mb-14"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary/70 mb-3 block">
            What we do
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            One engine room, two ways to hire it
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
            Co-develop a game with us, or commission an interactive product. Same
            engineers, same engines, same bar.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease }}
                className={item.primary ? "md:row-span-1" : ""}
              >
                <Link href={item.href} className="group block h-full">
                  <div
                    className={`h-full glass-card p-8 transition-all duration-300 hover:-translate-y-1.5 ${
                      item.primary ? "ring-1 ring-primary/20" : ""
                    }`}
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl glass-icon mb-5 group-hover:scale-105 transition-transform duration-300">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground block mb-1.5">
                      {item.eyebrow}
                    </span>
                    <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors flex items-center gap-1.5">
                      {item.title}
                      <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-60 transition-opacity" />
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {item.body}
                    </p>
                    <span className="text-sm font-semibold text-primary inline-flex items-center gap-1.5">
                      {item.cta} <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create `components/site/proof.tsx`**

This renders up to two case-study cards from `getWork()` plus a testimonial pull-quote slot (the testimonial collection is Phase 4 — for now the quote is a hard-coded `null` and the block is hidden). It is a server component (async) since `getWork` reads the filesystem.

```tsx
import Link from "next/link";
import { getWork } from "@/lib/content/loader";
import { ArrowRight } from "lucide-react";

export async function Proof() {
  const work = (await getWork()).slice(0, 2);
  if (work.length === 0) return null;

  return (
    <section className="py-28 md:py-36 relative" id="work">
      <div className="relative mx-auto max-w-6xl px-5">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary/70 mb-3 block">
              Selected work
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Proof</h2>
          </div>
          <Link
            href="/work"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            All work →
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {work.map((item) => (
            <Link key={item.slug} href={`/work/${item.slug}`} className="group block">
              <div className="h-full glass-card p-7 transition-all duration-300 hover:-translate-y-1.5">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {item.frontmatter.title}
                </h3>
                {item.frontmatter.client && (
                  <p className="text-xs text-foreground/60 mb-3">{item.frontmatter.client}</p>
                )}
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {item.frontmatter.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {item.frontmatter.tags.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="text-xs uppercase tracking-wider px-3 py-1 rounded-full border border-primary/30 text-primary/90 bg-primary/[0.05]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <span className="text-sm font-semibold text-primary inline-flex items-center gap-1.5">
                  Read the case study <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create `components/site/how-we-work.tsx` (the geography answer)**

```tsx
"use client";

import { motion } from "framer-motion";
import { Clock, UserCheck, GitBranch, ClipboardCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ease = [0.25, 0.1, 0.25, 1];

const points: { title: string; body: string; icon: LucideIcon }[] = [
  {
    title: "Real overlap, every day",
    body:
      "{{OVERLAP_HOURS}}+ hours of daily overlap with US and EU working hours — not “we’ll get to it tomorrow.” Stand-ups, reviews, and turnaround on your clock.",
    icon: Clock,
  },
  {
    title: "One point of contact",
    body:
      "A named project lead owns the relationship and the delivery. You’re working with a team, not managing a pool.",
    icon: UserCheck,
  },
  {
    title: "Your pipeline, your standards",
    body:
      "Your repo, your engine version, your tools, your review process, your quality bar. We adapt to how you build — not the other way around.",
    icon: GitBranch,
  },
  {
    title: "Scoped before it starts",
    body:
      "Every engagement opens with a scoping call: the work, the milestones, the delivery bar — defined before anyone writes a line.",
    icon: ClipboardCheck,
  },
];

export function HowWeWork() {
  return (
    <section className="py-28 md:py-36 relative">
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] rounded-full bg-primary/[0.03] blur-[140px] pointer-events-none" />
      <div className="relative mx-auto max-w-6xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="mb-14 max-w-2xl"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary/70 mb-3 block">
            How we work
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Built to work with teams in the US, UK, and EU
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            We’re a distributed studio, and we run it so distance is a non-issue
            — because for the studios that hire co-dev partners, it’s the first
            thing they worry about.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2">
          {points.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease }}
              >
                <div className="h-full glass-card p-7 flex items-start gap-4">
                  <div className="flex-shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-xl glass-icon">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold mb-2">{p.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```
> Note for the executor: the literal text `{{OVERLAP_HOURS}}` must remain in the output — it is a deliberate fill-in for the founder. Flag it in the task completion summary.

- [ ] **Step 5: Create `components/site/the-studio.tsx`**

```tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ease = [0.25, 0.1, 0.25, 1];

export function TheStudio() {
  return (
    <section className="py-28 md:py-36 relative">
      <div className="relative mx-auto max-w-4xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="glass-card p-10 md:p-14"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary/70 mb-3 block">
            The studio
          </span>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-5">
            Founder-led. Built from a curated network.
          </h2>
          <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
            <p>
              ArkaForge is founder-led, with a core background spanning AI/ML and
              agentic systems, game development, AR/VR, full-stack engineering, and
              applied simulation — including the nuclear glovebox training work,
              connected to Los Alamos National Laboratory, that this company is
              built on.
            </p>
            <p>
              Around that core is a curated network of senior game engineers,
              developers, and designers we’ve worked with before. We assemble a
              project-fit team for the work in front of us. The team is scoped to
              the project — not the project to the team.
            </p>
          </div>
          <Link
            href="/company"
            className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
          >
            More about ArkaForge <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Rewrite `components/site/cta-band.tsx` copy**

Keep the component's structure (the `glass-card`, the two buttons, the glow). Change:
- Eyebrow → `Let's talk`
- H2 → `Tell us what you're building`
- Body `<p>` → `A game in production and not enough hands. A pitch that needs a vertical slice. A product that should be an experience. If it runs on a game engine — or should — we want to hear about it.`
- Buttons stay: `Schedule a call` (calendar link) + `Get in touch` (`/contact`).

- [ ] **Step 7: Delete the now-orphaned homepage components**

```bash
git rm components/site/digital-twins-band.tsx components/site/core-belief.tsx components/site/featured-case.tsx components/site/what-we-build.tsx
```
(Their roles are replaced by `what-we-do.tsx` / `proof.tsx`. `what-we-build.tsx` is no longer imported anywhere.)

- [ ] **Step 8: Rewrite `app/(site)/page.tsx`**

```tsx
import { Hero } from "@/components/site/hero";
import { WhatWeDo } from "@/components/site/what-we-do";
import { Proof } from "@/components/site/proof";
import { HowWeWork } from "@/components/site/how-we-work";
import { TheStudio } from "@/components/site/the-studio";
import { CTABand } from "@/components/site/cta-band";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatWeDo />
      <Proof />
      <HowWeWork />
      <TheStudio />
      <CTABand />
    </>
  );
}
```

- [ ] **Step 9: Verify**

Run: `npx tsc --noEmit && npx next lint`
Run: `npm run dev`, load `/` — hero shows the new subhead; "What we do" shows 3 cards (co-dev primary); "Proof" shows the Los Alamos card (and the placeholder gamification one until removed in Phase 4); "How we work" shows 4 points incl. the literal `{{OVERLAP_HOURS}}`; "The studio" renders; CTA band renders. No console errors. No reference to "games are the future of learning" anywhere.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "rewrite homepage: clear positioning, what-we-do, proof, how-we-work, the-studio"
```

---

### Task 1.7: Real copy for the three `/services` pages

**Files:** Modify `app/(site)/services/page.tsx`, `app/(site)/services/game-co-development/page.tsx`, `app/(site)/services/interactive-products/page.tsx`

- [ ] **Step 1: `app/(site)/services/page.tsx`** — overview with two service cards + a "deep end" note. Mirror the visual pattern of the old `technology/page.tsx` (two `glass-card` links). Cards:
  - **Game co-development** → `/services/game-co-development` — body: "Embed into your UE5 or Unity pipeline as a senior co-dev partner — features and systems engineering, AI and agentic systems, prototypes and vertical slices. The fastest way to add senior engine capacity without growing headcount."
  - **Interactive products** → `/services/interactive-products` — body: "Game-engine craft outside games — gamified products and onboarding, training simulations, configurators, interactive 3D and data experiences for teams that need something people operate, not read."
  - Below the grid, a short paragraph: "How deep does the engineering go? We built a performance-tracked nuclear glovebox training simulator — interactive environment, custom task logic, real-time readiness scoring — as graduate research connected to Los Alamos National Laboratory." with a link "See the case study →" → `/work/los-alamos-asu-simulation`.
  - Page H1: "Services" / eyebrow "What we do" / intro: "Two ways to hire the same engine room: co-develop a game with us, or commission an interactive product. Both run on the same engineers, the same engines, the same bar."
  - `metadata` already set in Task 1.3.

- [ ] **Step 2: `app/(site)/services/game-co-development/page.tsx`** — the spear page. Sections (use the `Section` + `BackLink` + `glass-card` patterns from the old `technology/gamedev/page.tsx`, which is the right template — but it was deleted, so rebuild from scratch):
  - `BackLink href="/services" label="Back to Services"`
  - Eyebrow "Game co-development", H1 "End-to-end UE5 & Unity co-development", intro: "We embed into your pipeline as a senior co-development partner. You bring the vision; we bring engineering, AI, and delivery — scoped to your roadmap. Co-develop as a partner, or commission an original title."
  - **What we build** (4 `glass-card`s): *Features & systems engineering* ("Combat, AI, netcode, tools, UI, content pipelines. Scoped sprints that ship into your codebase at your quality bar."); *AI & agentic systems* ("LLM-driven NPCs, agentic behaviours, generative content pipelines, in-game AI tooling — built by an AI/ML engineer."); *Prototypes & vertical slices* ("Fixed-bid playable builds. Take a pitch deck to a demo a publisher will sit through."); *Serious games & gamification* ("Game design applied to non-game products — branching scenarios, scoring, progression, performance analytics. The bridge into Interactive Products." — link "Interactive products →" `/services/interactive-products`).
  - **Engagement models** (3 `glass-card`s, with the indicative-range label): *Scoped sprint* ("Two-to-six-week fixed scope, one or two engineers embedded in your pipeline — a defined feature, system, or audit. Indicative range: $8k–$40k."); *Fixed-bid prototype / vertical slice* ("Four-to-twelve-plus weeks to a defined milestone — a playable demo, a vertical slice, a system proof. Fixed price, fixed deliverable. Indicative range: $15k for a prototype to $60k+ for a vertical slice."); *Co-dev retainer* ("Monthly capacity when you need a partner who stays in your codebase across feature waves."). Above the grid: "Pricing below is indicative — every engagement is scoped on a call."
  - **How we work** — one paragraph that links to the homepage's geography points in spirit: "We embed into your pipeline — your tools, your processes, your standards — with real daily overlap with US and EU hours and a named project lead as your single point of contact. ArkaForge is founder-led and assembles a project-fit team from a curated network of senior engineers, artists, and designers; the team is scoped to the project."
  - **Who it's for** (`<ul>`): studios needing additional UE5/Unity capacity on a deadline; publishers managing multiple titles who need a reliable co-dev partner; teams shipping a vertical slice or prototype to pitch; companies building interactive experiences outside traditional games.
  - Closing line: "Every engagement starts with a scoping call. We define the work, the timeline, and the delivery standard before anything begins." + a "Schedule a call" link to the calendar URL.
  - `id="deep-end"` anchor at the bottom won't be needed (the `/technology/digitaltwins` redirect points at `/work/los-alamos-asu-simulation`); no anchor required.

- [ ] **Step 3: `app/(site)/services/interactive-products/page.tsx`** — the cash engine.
  - `BackLink href="/services" label="Back to Services"`
  - Eyebrow "Interactive products", H1 "Game-engine craft, outside games", intro: "The same engineering that ships a game feature, pointed at a product. Things people operate — not pages they skim."
  - **What we build** (4 `glass-card`s): *Gamified products & onboarding* ("Progression, scoring, branching, feedback loops built into the product itself — designed as methodology, not decoration."); *Training simulations* ("Interactive 3D environments modelled from real systems and workflows — task tracking, error detection, readiness reporting. Desktop, web, and VR."); *Configurators & interactive 3D* ("Real-time product configurators, interactive scenes, spatial walkthroughs."); *Interactive data experiences* ("Datasets and dashboards turned into things people explore.").
  - **Proof** — short block: "We've built and shipped gamified product work for real clients." Link to `/work` (once the gamified-product case study lands in Phase 4, link it directly).
  - **Who it's for** (`<ul>`): companies whose product would land harder as an experience; teams replacing passive e-learning; technical onboarding for complex systems; anyone who needs users to do, not just read.
  - **How we engage** — paragraph: "Fixed-scope builds on shorter cycles than co-dev — typically a defined deliverable in weeks, not quarters. Indicative range: $5k–$50k depending on scope. Every engagement starts with a scoping call." + "Schedule a call" link.

- [ ] **Step 4: Verify**

Run: `npx tsc --noEmit && npx next lint`. Manual: all three `/services*` pages render the real copy; links between them work; the `/technology*` redirects still land somewhere sensible.

- [ ] **Step 5: Commit**

```bash
git add app/\(site\)/services
git commit -m "real copy for the /services pages"
```

---

### Task 1.8: Rewrite `/company`

**Files:** Modify `app/(site)/company/page.tsx`

- [ ] **Step 1:** Keep the page's structure (masthead / origin / values / CTA, all `glass-card`s). Change copy:
  - `metadata.description` → "ArkaForge is a game engineering & technology studio — game co-development for studios and publishers, plus interactive products and the simulation depth behind a nuclear training simulator."
  - Eyebrow "About ArkaForge", H1 → "A game engineering & technology studio."
  - Masthead paragraph → "ArkaForge co-develops games with studios and publishers — UE5 and Unity, features, systems, AI, prototypes, vertical slices — and builds interactive products for teams outside games. Founder-led, run as a distributed studio with a curated network of senior engineers, developers, and designers."
  - **Origin** block — keep the three paragraphs but tighten and align: para 1 about the founder's background (AI/ML, LLMs, agentic AI, game development, AR/VR, full-stack, applied simulation); para 2 about the Los Alamos / ASU nuclear glovebox training simulator as the technical foundation (interactive environment, custom game logic, task-sequence tracking, real-time performance assessment); para 3: "Today ArkaForge works with game studios and publishers as a co-development partner — full-cycle Unreal Engine 5 and Unity capability for teams that need high-quality execution without growing headcount — and with teams outside games who need interactive product work."
  - **How we work** values — keep three, on-message: *Problems first* ("We don't lead with a stack. We start with what's broken and work backward."); *Distance is a non-issue* ("Real daily overlap with US/EU hours, a named lead, your pipeline and standards. We run the studio so geography never costs you anything."); *Craft over throughput* ("Small core, curated network, high bar. Everything we ship has to work, look right, and perform.").
  - CTA block — keep; copy: "We're selective about what we take on. If you have a real project, we want to hear it." + the two buttons (Get in touch `/contact` / Schedule a call calendar URL).

- [ ] **Step 2: Verify** — `npx tsc --noEmit && npx next lint`; `/company` renders.

- [ ] **Step 3: Commit** — `git add app/\(site\)/company && git commit -m "rewrite /company copy"`

---

### Task 1.9: Rewrite `/careers`

**Files:** Modify `app/(site)/careers/page.tsx` (keep `CareersForm`)

- [ ] **Step 1:** Change the intro `<p>` to: "ArkaForge is a game engineering & technology studio — game co-development for studios and publishers, plus interactive products for teams outside games. We work with a curated network of senior game engineers, developers, and designers, and we're always interested in people who are strong in Unreal Engine 5, Unity, real-time systems, gameplay, AI/ML, tools, or technical art. Tell us what you do." Keep the eyebrow "Join us", H1 "Careers", and `<CareersForm />`. Update `metadata.description` to match.

- [ ] **Step 2: Verify** — `npx tsc --noEmit && npx next lint`; `/careers` renders + form still works.

- [ ] **Step 3: Commit** — `git add app/\(site\)/careers && git commit -m "rewrite /careers copy"`

---

### Task 1.10: Light copy fixes to `/contact`

**Files:** Modify `app/(site)/contact/page.tsx`

- [ ] **Step 1:** Change the intro `<p>` from "Have a project in mind? Let's discuss how we can help." to "A game that needs more hands, a pitch that needs a vertical slice, or a product that should be an experience — tell us what you're building." Everything else (form, info cards, API route) stays.

- [ ] **Step 2: Verify** — `npx tsc --noEmit && npx next lint`; `/contact` renders + submit still works (the API route is untouched).

- [ ] **Step 3: Commit** — `git add app/\(site\)/contact && git commit -m "tweak /contact intro copy"`

---

### Task 1.11: Phase 1 verification

**Files:** none

- [ ] **Step 1: Full build**

Run: `npm run build`
Expected: succeeds, no errors. Check the build output route list: `/services`, `/services/game-co-development`, `/services/interactive-products`, `/`, `/work`, `/work/[slug]`, `/company`, `/careers`, `/contact`, `/legal/privacy` present; no `/technology*`, no `/labs*`.

- [ ] **Step 2: Redirect QA**

Run `npm run dev`. Confirm 308 redirects: `/technology` → `/services`; `/technology/gamedev` → `/services/game-co-development`; `/technology/digitaltwins` → `/work/los-alamos-asu-simulation`; `/technology/simulation` → same; `/technology/xr` → `/services/game-co-development`; `/technology/learning` → `/services/interactive-products`; `/labs` → `/work`; `/labs/anything` → `/work`.

- [ ] **Step 3: Message QA**

Load `/` as a first-time visitor would. The "what does this company do" answer should be obvious from the hero alone. Grep the whole `app/` + `components/` tree for stale phrases — `grep -rn "Game Technology Studio\|games are the future of learning\|future of learning is\|Game-Tech Studio\|digital twin" app components` — and confirm no remaining off-message copy (the only acceptable "digital twin"/"simulator" mentions are the honest Los Alamos framing).

- [ ] **Step 4: Note the open fill-in**

Confirm `{{OVERLAP_HOURS}}` appears exactly once (in `components/site/how-we-work.tsx`) and surface it in the completion summary so the founder fills it in.

- [ ] **Step 5: Commit any final fixes, then Phase 1 is done.**

---

# PHASE 2 — Visual re-grade ("engine viewport") — *scoped outline, to be detailed before execution*

Goal: make the site read like a game-tech studio without rebuilding the framework. Tasks (to be expanded into bite-sized steps):

- **2.1 Palette** — update HSL custom properties in `app/globals.css`: deepen the base off generic navy toward near-black; keep molten orange as `--primary` (used sparingly); add a cold cyan/steel `--secondary`/`--ring-2` token; re-check contrast (WCAG AA on body text). Update `glass-icon` accent (currently hard-coded `rgba(255,61,0,...)`) to derive from the token.
- **2.2 Monospace font** — add a mono face (self-hosted, e.g. JetBrains Mono or IBM Plex Mono, via `next/font/local` or `next/font/google`), wire a `font-mono` Tailwind family; apply to eyebrows/labels/metadata/captions across the site (replace the `uppercase tracking-widest` spans).
- **2.3 `<MediaFrame>` component** — `components/site/media-frame.tsx`: wraps an `<Image>` or `<video>` in a dark frame with corner brackets (CSS pseudo-elements), an optional mono label bar, subtle grade (CSS filter + overlay gradient), letterbox handling for arbitrary aspect ratios, and an optional visible redaction overlay prop. Used in Phase 4.
- **2.4 Engine-UI cues** — add corner-bracket + hairline treatments to `glass-card` (or a `glass-panel` variant), a faint technical grid background option for select sections, small mono "readout" decorations; keep it restrained.
- **2.5 Motion pass** — remove the blanket `whileInView` fade-up on every section; keep it on the first section of a page and use subtler/parallax effects elsewhere; audit `prefers-reduced-motion`.
- **2.6 Verify** — `npm run build` + visual pass at mobile + desktop + reduced-motion.

# PHASE 3 — "The Forge" hero — *scoped outline*

- **3.1** Rebuild `components/webgl/hero-scene.tsx` as a visible R3F scene (molten/displaced geometry + GPU particles + bloom via `postprocessing`), cursor-reactive, capped DPR, paused offscreen.
- **3.2** Rework `components/site/hero.tsx` layout so the scene is foreground/centre (not 16% opacity) with a readable headline treatment (scrim or offset); keep the `?constrained=1` static fallback; add a mobile-light variant and a `prefers-reduced-motion` static frame.
- **3.3** Perf: Lighthouse on `/`, ensure no main-thread jank, lazy-load, `loading="lazy"` posters.

# PHASE 4 — Case-study build-out — *scoped outline; depends on founder assets*

- **4.1** `testimonials` content collection: add `testimonialFrontmatterSchema` to `lib/content/schemas.ts` (`quote`, `author`, `role`, `company`, `logo?`, `link?`, `date`, `relatedCase?`, `published`), `getTestimonials`/`getTestimonialForCase` in `lib/content/loader.ts`, a `content/testimonials/` dir.
- **4.2** Rewrite `content/work/los-alamos-asu-simulation.mdx` into a full case study (problem → approach → what we built → result → tech), with the supplied images/video rendered via `<MediaFrame>` (register `MediaFrame` in `components/mdx/mdx-components.tsx`); annotated diagram(s) for the task-tracking/scoring flow; honest framing per guardrail #3.
- **4.3** New `content/work/<gamified-product-slug>.mdx` — the gamified-product case study + the testimonial. Publish only when assets + written permission are in hand.
- **4.4** Wire the testimonial pull-quote into `components/site/proof.tsx` (fetch `getTestimonialForCase` and render a quote block when present).
- **4.5** Delete the placeholder `content/work/gamification-platform.mdx` (or replace with the real one from 4.3).

# PHASE 5 — Polish — *scoped outline*

- **5.1** Accessibility audit (focus states, alt text, heading order, `aria-*`, reduced-motion), fix issues.
- **5.2** Performance pass (Lighthouse ≥ 90 on mobile for `/`, `/work/[slug]`; image sizing; font display).
- **5.3** Final `npm run build` + `npx tsc --noEmit` + `npx next lint` + full redirect/route QA; squash-merge `website-repositioning` → `main` (or open a PR — founder's call).

---

## Self-review notes

- **Spec coverage:** §1 problems → Tasks 1.2/1.4 (dead code, SEO) + all copy tasks; §2 positioning → Tasks 1.6/1.7/1.8; §3 guardrails → embedded in every copy step + Task 1.11 step 3; §4 IA + redirects → Task 1.3; §5 visual → Phase 2; §6 hero → Phase 3; §7 components → Phase 2 (`MediaFrame`) + Phase 4 (testimonials); §8 page plan → Tasks 1.6–1.10 + Phase 4; §9 cleanup → Tasks 1.2/1.3/1.4 + Task 1.11; §10 sequencing → phase order; §11 founder inputs → noted in Phase 4 + the `{{OVERLAP_HOURS}}` fill-in; §12 non-goals → respected (no DT pillar, no team bios, no `/labs`, no US-entity work, no rating UI).
- **Placeholders:** `{{OVERLAP_HOURS}}` is an intentional founder fill-in, flagged in Task 1.6 step 4 and Task 1.11 step 4 — not a plan gap. Phases 2–5 are deliberately scoped-not-detailed (Phase 4 depends on assets not yet supplied); they must be expanded into bite-sized steps before that phase executes.
- **Type consistency:** new components — `WhatWeDo`, `Proof` (async server component), `HowWeWork`, `TheStudio` — match their imports in `app/(site)/page.tsx`. `getWork`/`WorkPost` signatures unchanged. `getLabs`/`LabPost`/`labFrontmatterSchema` fully removed (loader, schemas, sitemap) — checked in Task 1.3 step 6.
