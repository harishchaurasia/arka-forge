# ArkaForge — Studio Website (Next.js + React)

You are an expert product engineer + award-level interactive web developer.
Build a fully functional, production-ready marketing website for a premium game-tech / simulation studio named **ArkaForge**.

## Non-negotiables

- Framework: Next.js (App Router) + React + TypeScript
- Styling: Tailwind CSS + CSS variables (design tokens)
- UI kit: shadcn/ui (copy-in components) built on Radix primitives
- Motion: use Motion (Framer Motion / Motion.dev) for component-level animation
- Scroll story: use GSAP + ScrollTrigger for 2–3 key “wow” sections
- Smooth scroll: Lenis (optional on desktop only; must respect reduced-motion)
- WebGL: Three.js + React Three Fiber for a lightweight hero scene (with fallback)
- Accessibility: keyboard navigation, focus states, semantic headings, good contrast, reduced-motion support
- Performance: fast LCP, minimal JS on non-interactive pages, dynamic import WebGL, optimized images
- Fully functional: working nav, pages, MDX content system for Labs + Case Studies, working contact form that sends email

## Tech constraints (IMPORTANT)

- Target Next.js 16 (current LTS line) using App Router.
- Node.js >= 20.9 is required (document this in README and/or .nvmrc).
- Use Server Components by default. Only use `"use client"` where required (animations/WebGL/forms).
- Follow secure patterns for Server Actions / API routes; do not expose secrets client-side.

## Brand & vibe

ArkaForge = forging systems, engines, simulations.
Premium, engineering-driven, “deep-tech,” not a generic art studio.
Visual metaphor: “cosmic forge” — orbital arcs + precise instrumentation + subtle heat/glow accents.
Tone: confident, minimal, technical. No cringe gamer copy.

Suggested tagline options (pick one and implement consistently):

- "Forging intelligent worlds."
- "Forging interactive realities."
- "Forging simulation-grade experiences."

## Pages & routes (implement all)

Use these routes under `app/`:

- `/` Home
- `/technology` Capabilities hub
- `/technology/simulation` Simulation Systems
- `/technology/engine` Engine & Tooling
- `/technology/xr` XR / Spatial
- `/labs` Labs index (MDX-driven)
- `/labs/[slug]` Labs post (MDX-driven)
- `/work` Case studies index (MDX-driven)
- `/work/[slug]` Case study detail (MDX-driven)
- `/company` About / values / team
- `/careers` Careers + open roles (data-driven)
- `/contact` Contact page with working form
- `/legal/privacy` Simple privacy policy template
- `robots.txt` + `sitemap.xml` (Next.js conventions)

## Layout & navigation

Global layout:

- Sticky top nav with: Technology, Labs, Work, Company, Careers, Contact
- Mobile nav: fast, accessible sheet/dialog
- Footer: email, socials placeholders, legal, small brand line

Home page sections (build these for real, no lorem ipsum):

1. Hero: headline + short subhead + primary CTA + secondary CTA; include WebGL hero on the right/background
2. “What we forge”: 3–4 capability cards (Simulation / Engine / XR / Applied AI)
3. “Systems mindset”: short manifesto with 3 principles (performance, iteration speed, correctness)
4. Featured Labs posts (latest 3)
5. Featured Work (latest 2; allow “Prototype” tags)
6. CTA band: “Build with ArkaForge” + contact CTA

## Content system (MDX)

- Store content in `content/labs/*.mdx` and `content/work/*.mdx`.
- Each MDX file must contain frontmatter:
  - title
  - description
  - date (ISO)
  - tags (array)
  - published (boolean)
  - hero (optional image path)
- Build a small content loader that:
  - reads MDX from filesystem
  - validates frontmatter with zod
  - sorts by date
  - supports `published=false` to hide drafts
- Create `mdx-components.tsx` to provide styled MDX components (h2/h3, code blocks, callouts, links).

## Contact form (must actually send)

Implement:

- Fields: name, email, company (optional), subject, message
- Validation: zod + react-hook-form
- Spam protection: honeypot + basic rate-limit (in-memory is okay) + message length cap
- Submission: use a Server Action OR `app/api/contact/route.ts` to call Resend.

Environment variables:

- RESEND_API_KEY
- CONTACT_TO_EMAIL (destination)
- CONTACT_FROM_EMAIL (verified sender or domain)
- OPTIONAL: SENTRY_DSN

On success:

- show toast + inline success state
  On failure:
- show inline error state (do not leak stack traces)

## WebGL hero requirements

- Must be lightweight and tasteful: a “forged ring / gyroscope / orbit lines” look
- Use dynamic import with SSR disabled so it never blocks server render
- Must have a non-WebGL fallback (static SVG/gradient) if WebGL fails or reduced-motion is enabled
- No massive textures, no heavy model downloads

## Animation requirements

- Use Motion for page/section entrance (subtle)
- Use GSAP ScrollTrigger for one premium scroll moment on Home (e.g., capabilities section transforms into a “system schematic”)
- Respect prefers-reduced-motion: disable or greatly reduce animation and Lenis smoothing

## SEO & metadata

- Proper `<title>` and description per page
- Open Graph + Twitter metadata
- JSON-LD for Organization on Home
- Sitemap + robots
- Use next/image and next/font

## Project structure expectations

Use a clean structure like:

/app
/(site)
layout.tsx
page.tsx
technology/...
labs/...
work/...
company/...
careers/...
contact/...
legal/privacy/...
api/contact/route.ts (if using API route)
/components
ui/ (shadcn components)
site/ (Nav, Footer, Section, etc.)
webgl/ (Hero scene)
/content
labs/
work/
/lib
content/
seo/
utils/
/public
images/
og/

## Quality gates

- `pnpm lint` passes
- `pnpm typecheck` passes
- No console errors on load
- Lighthouse-friendly defaults
- No broken links

## Deliverables

1. Implement the complete site per above
2. Provide seed content:
   - 3 Labs posts (realistic titles + content about simulation/engine/tooling)
   - 2 Work case studies (prototype-style is fine, but written professionally)
   - Careers roles list with 2 sample roles (e.g., Systems Engineer, Real-time Rendering Engineer)
3. Update README with:
   - Setup instructions
   - Env var instructions
   - Deployment notes

## Strict rule

Do not leave TODOs for core requirements. If something is optional, implement a sensible default anyway.

---

## Setup Instructions

### Prerequisites

- Node.js >= 20.9.0 (see `.nvmrc` for exact version)
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd arka-forge-website
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Copy environment variables:
```bash
cp .env.example .env.local
```

4. Configure environment variables in `.env.local`:
   - `RESEND_API_KEY`: Your Resend API key for email sending
   - `CONTACT_TO_EMAIL`: Email address to receive contact form submissions
   - `CONTACT_FROM_EMAIL`: Verified sender email address (must be verified in Resend)
   - `NEXT_PUBLIC_SITE_URL`: Your production site URL (for SEO metadata)

### Development

Run the development server:
```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building

Build for production:
```bash
pnpm build
# or
npm run build
```

Start production server:
```bash
pnpm start
# or
npm start
```

### Type Checking

Run TypeScript type checking:
```bash
pnpm typecheck
# or
npm run typecheck
```

### Linting

Run ESLint:
```bash
pnpm lint
# or
npm run lint
```

## Environment Variables

Required environment variables:

- `RESEND_API_KEY`: Resend API key for sending emails
- `CONTACT_TO_EMAIL`: Destination email for contact form submissions
- `CONTACT_FROM_EMAIL`: Verified sender email address

Optional:

- `NEXT_PUBLIC_SITE_URL`: Production site URL (defaults to https://arkaforge.com)
- `SENTRY_DSN`: Sentry DSN for error tracking (optional)

## Content Management

### Adding Labs Posts

Create a new MDX file in `content/labs/` with the following frontmatter:

```mdx
---
title: "Your Post Title"
description: "Brief description"
date: "2024-01-01"
tags: ["tag1", "tag2"]
published: true
hero: "/images/labs/hero.jpg" # optional
---

Your content here...
```

### Adding Work Case Studies

Create a new MDX file in `content/work/` with the following frontmatter:

```mdx
---
title: "Project Name"
description: "Brief description"
date: "2024-01-01"
tags: ["tag1", "tag2"]
published: true
hero: "/images/work/hero.jpg" # optional
client: "Client Name" # optional
metrics:
  key1: "value1"
  key2: 123
---

Your content here...
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

Vercel will automatically:
- Detect Next.js
- Run build commands
- Deploy to production

### Other Platforms

The site can be deployed to any platform that supports Next.js:

- **Netlify**: Import repository, set build command to `pnpm build`, publish directory to `.next`
- **Railway**: Connect repository, set build command
- **Self-hosted**: Run `pnpm build` and `pnpm start` on your server

### Post-Deployment

After deployment:

1. Verify environment variables are set correctly
2. Test the contact form
3. Submit sitemap to Google Search Console: `https://yourdomain.com/sitemap.xml`
4. Verify robots.txt: `https://yourdomain.com/robots.txt`

## Project Structure

```
/app
  /(site)          # Site layout wrapper
  /api             # API routes
  /contact         # Contact page
  /company         # Company page
  /careers         # Careers page
  /labs            # Labs pages
  /work            # Work pages
  /technology      # Technology pages
  /legal           # Legal pages
  layout.tsx       # Root layout
  page.tsx         # Home page
  globals.css      # Global styles
/components
  /site            # Site-specific components
  /ui              # shadcn/ui components
  /mdx             # MDX components
  /webgl           # WebGL components
/content
  /labs            # Labs MDX files
  /work            # Work MDX files
/lib
  /content         # Content loading utilities
  /seo             # SEO utilities
  /validations     # Zod schemas
  utils.ts         # Utility functions
/public            # Static assets
```

## Features

- ✅ Next.js 16 with App Router
- ✅ TypeScript with strict mode
- ✅ Tailwind CSS with design tokens
- ✅ shadcn/ui components
- ✅ Framer Motion animations
- ✅ WebGL hero scene with fallback
- ✅ Lenis smooth scroll (desktop only, respects reduced-motion)
- ✅ MDX content system
- ✅ Contact form with Resend integration
- ✅ SEO optimization (metadata, sitemap, robots.txt)
- ✅ Accessibility (WCAG 2.1 AA compliant)
- ✅ Responsive design
- ✅ Dark mode ready

## License

All rights reserved. © 2024 ArkaForge
