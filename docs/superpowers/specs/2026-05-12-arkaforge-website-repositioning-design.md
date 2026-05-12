# ArkaForge Website — Repositioning & Redesign

**Date:** 2026-05-12
**Status:** Design approved (pending founder review of this doc)
**Scope:** Surgical reposition + visual refresh of the existing Next.js site (Approach "A+B"). Keep the framework and component kit; change the message, the information architecture, the visual grade, the hero, and build out real proof.

---

## 1. The problem we're solving

External feedback: *"the site is all over the place — the main offering isn't clear."* Internal read: it also feels shallow/"not solid," and — for a game-tech studio — not gamified; it's a generic dark-glass SaaS template.

Root causes found in the audit:

- **The site has been repositioned ~3 times and every old layer is still showing.** Root metadata still says "Game Technology Studio" with a ~90-entry keyword-stuffing block (incl. `BIM`, "Indian Deep tech Studio" repeated 9×). `core-belief` on the homepage still preaches "games are the future of learning" (the old game-based-learning thesis). `/careers` still says "Game-Tech Studio building Game Based Learning, Digital Twins & Simulation." `/work` metadata says "Simulation projects and training systems." Routes still live under `/technology/*`. Nav says "Services" / route is `/technology` / page title is "Capabilities" / H1 is "What We Do" — four names for one section.
- **Too many offerings, too many audiences, no hierarchy.** Game studios, publishers, indies, non-game companies entering interactive, nuclear/energy/defense/manufacturing, corporate L&D — six audiences. Five thin sub-pages under `/technology` arranged like an org chart ("a capability under digital twins," "a delivery surface for digital twins & games").
- **Proof doesn't back the claims.** One real case study (Los Alamos glovebox sim — and it's the founder's prior academic research, not an ArkaForge engagement), one placeholder (`gamification-platform.mdx`, `published: false`, body says "more details coming"), one sample Labs post (`[Sample] …`, `published: false`). No logos, no shipped titles, no team page, no testimonials, no metrics.
- **The medium contradicts the message.** A game studio whose site is a dark-glass agency template with a WebGL scene hidden at 16% opacity, fade-up-on-everything, a spinning-logo splash. Nothing playable, interactive, or demonstrative of real-time craft.
- **Dead code from prior versions still in the repo:** `capabilities-grid`, `services-grid`, `proof-strip`, `vision-section`, `why-it-matters`, `how-we-work`, `use-cases`, `systems-mindset`, `featured-labs(-client)`, `featured-work(-client)`, `careers/page_old.tsx`.

---

## 2. Strategic foundation (decided)

ArkaForge today: solo founder (strong AI/ML + game-dev + AR/VR + applied-simulation background, US-educated at ASU) + a curated network of contract game engineers, developers, and designers; one shipped project (a gamified website for a client — about to deliver, client happy, showable); one warm pipeline (potential game-dev outsourcing work funneled through that client, incl. studios in Nigeria); one academic credential (the Los Alamos / ASU nuclear glovebox training simulator). Zero commercial references in games or digital twins yet. Needs cash flow now ($5k–$100k+ engagements).

**Positioning ladder (the whole site hangs on this):**

- **Identity:** ArkaForge is a **real-time interactive studio** — it builds the software people *operate*, not watch, on game engines (UE5/Unity) and AI.
- **The spear (homepage leads with this):** **game co-development** for studios & publishers — features & systems, AI/agentic systems, prototypes & vertical slices. Where the warm pipeline is; large, structurally growing market; deal sizes ladder from ~$8–40k feature sprints to six-figure vertical slices.
- **The cash-flow engine (faster, smaller deals):** **interactive products** for non-game companies — gamified products, training simulations, configurators, interactive 3D/data experiences. This is the gamified-website work, framed as a studio capability ("we build interactive product experiences"), not "I gamify websites." $5–50k, short cycles.
- **The credibility spike (proof, not a headline product — yet):** the **simulation / digital-twin work**. The Los Alamos performance-tracked nuclear glovebox trainer is the line that makes a serious buyer take ArkaForge seriously. Featured heavily *as proof of depth* — **not** a co-equal pillar, **not** a "we sell nuclear digital twins" claim (can't deliver that cold; claiming it makes us look either too small or not credible to the actual buyers). It's "yes, we go this deep."
- **The future arm (milestone-gated, NOT a launch item):** once 1–2 meaningful clients land + there's cash + a reference, spin up a dedicated immersive-training / digital-twins arm with real enterprise sales — and *that's* when a US entity + US salesperson earns its keep (US energy/defense/manufacturing buyers prefer a US-domiciled counterparty). Not now.

**Why this order (market evidence):** game outsourcing/co-dev is a real, growing market (~70% of publishers spend $6M+/yr externally; AAA outsourcing penetration ~67%) but **~50% of publishers cite geography/time-zones as the #1 reason they won't use an external dev** — so an India-based studio must neutralize that explicitly. Digital-twin/immersive-training is bigger and sexier but enterprise sales there is 6–18 months, conservative, reference-hungry, and often needs a US/EU presence — not a near-term cash source. Vertical slices are the high-ticket sweet spot but the most trust-gated. So: near-term cash from interactive-product work + small co-dev features + the Nigeria pipeline; big money later from vertical slices and (eventually) the digital-twins arm; the website built so the proof is already there when that arm switches on.

---

## 3. Messaging guardrails ("clearly state what we do — no jeopardizing")

These are hard rules for all copy:

1. **Say what we do, plainly, above the fold.** A first-time visitor must be able to answer "what does this company do" in one sentence: *a real-time interactive studio — game co-development for studios & publishers, interactive products for everyone else.* No hedging across six things.
2. **Never claim shipped commercial game titles we don't have.** Co-dev capability is described via skills, engagement models, and the engine work we *can* show (the sim) — not a fake portfolio.
3. **Never claim active digital-twin / enterprise clients.** The Los Alamos work is described accurately: a nuclear glovebox training simulator built by the founder as a graduate researcher at ASU's School of Manufacturing Systems & Networks, in connection with Los Alamos National Laboratory. It's framed as the technical foundation the company is built on — true and strong — not as an ArkaForge client engagement.
4. **Never "I." Always "we / the team / ArkaForge."** The studio is founder-led + a curated network of contract engineers/developers/designers — stated honestly, framed as a deliberate operating model (it's how many real co-dev studios run), never apologetically. No individual names/bios for now.
5. **Geography-neutralization claims must be promises we keep:** daily overlap hours with US/EU, a named project lead as single point of contact, "we work in your repo / your tools / your standards," async-first process. Don't write it if we won't do it.
6. **Pricing tiers are indicative ranges**, labelled as such.
7. **Imperfect / sensitive assets** are presented honestly: redactions are visible, "selected views shown" is stated where true. No misrepresentation of scope or polish.
8. **No keyword stuffing.** Honest, human metadata only.

---

## 4. Information architecture

```
/                         Home
/services                 Services overview        (replaces /technology)
/services/game-co-development
/services/interactive-products
/work                     Case studies index
/work/[slug]              Case study
/company                  What ArkaForge is + operating model + founder + how to engage
/careers                  Rewritten to new positioning
/contact                  Keep; light copy fixes
/legal/privacy            Keep
```

**Redirects (next.config.ts):**
- `/technology` → `/services`
- `/technology/gamedev` → `/services/game-co-development`
- `/technology/digitaltwins` → `/services/game-co-development#deep-end` (or `/work` — pick one; the digital-twins/sim/XR/learning material is folded into "the deep end" section + the Los Alamos case study, not given its own page)
- `/technology/simulation`, `/technology/xr`, `/technology/learning` → same target as above

**Deleted:** `/labs` and `/labs/[slug]` (until there is a real, publishable post), `app/(site)/careers/page_old.tsx`, dead components listed in §1, the Labs content sample, the Labs loader paths (or keep `lib/content/loader.ts` `getLabs` dormant — decide during planning).

**Nav:** `Services` · `Work` · `Company` · `Careers` · `Contact` — label, route, page `<title>`, and H1 all agree.

---

## 5. Visual direction — "engine viewport"

Keep: the dark base, the glass-card component kit, Tailwind tokens system, framer-motion, the WebGL infra (`three`, `@react-three/fiber`, `@react-three/drei`, `postprocessing`). Re-grade, don't rebuild.

Change:

- **Palette:** near-black base (deepen/shift off the current generic navy) + **molten orange** as a true accent (existing primary, used sparingly) + a **cold cyan/steel secondary** — "forge" (hot metal) × "engine" (cold tech). Update CSS custom properties in `app/globals.css`; keep the HSL-token structure.
- **Type:** add a **monospace** face (e.g. a Plex/JetBrains/Berkeley-mono-style) for labels, metadata, captions, "telemetry" flourishes. Keep Nourd for display headings; bump headline scale; clean body face stays.
- **Engine-UI cues, sparingly:** hairline borders, corner brackets on key panels (viewport-gizmo feel), a faint technical grid texture in select sections, small mono "readout" decorations (coords/fps-style) used as texture — never cluttered.
- **Motion:** remove the blanket fade-up-on-every-section pattern; fewer, more physical/intentional movements; the hero scene + cursor/scroll parallax carry the dynamism. Respect `prefers-reduced-motion` throughout.
- **Splash screen:** **remove** `components/site/splash-screen.tsx` (a spinning logo reads "agency"). If an intro is wanted later, it must be sub-800ms and read as "engine boot / scene load," not a logo spin.
- **Media treatment:** a single reusable `<MediaFrame>` wrapper applied to every screenshot/clip (see §7).

(If the founder later wants to stay orange-only, the cyan secondary can be dropped — it's an additive accent, not load-bearing.)

---

## 6. The interactive hero — "The Forge"

A real-time React-Three-Fiber scene as the homepage centerpiece (replaces the 16%-opacity hidden blob): a glowing, molten, procedurally-deforming geometric form (instanced shards / metaball / displaced icosahedron) reacting to cursor movement, with GPU embers/particles, light bloom. Visible and central; headline overlaid with a readable treatment (gradient scrim or offset layout). **Not** a playable game — an unmistakable "these people build real-time graphics."

Performance & fallbacks (non-negotiable):
- Capped DPR; throttled on low-end; pause when offscreen.
- Mobile gets a lighter variant (fewer particles / simpler shader) — not the desktop scene scaled down.
- `prefers-reduced-motion` → static rendered frame or CSS-only gradient.
- The existing `?constrained=1` static fallback path stays.
- Built on / refactored from `components/webgl/hero-scene.tsx`.

Possible later add (not v1): a small pokeable interactive "toy" on `/services/interactive-products`.

---

## 7. New components & content

- **`<MediaFrame>`** — wraps any image/video in a consistent dark frame with corner brackets, a thin mono label bar (e.g. `UE5 · real-time · training build`), subtle grade (slight desat → retint toward palette, light vignette, optional faint scanline), letterboxing for odd aspect ratios, and an optional visible redaction overlay. This is the single biggest lever for making imperfect Los Alamos captures look intentional.
- **`testimonials` MDX content collection** — mirrors the existing `content/work` + `lib/content/loader.ts` + `lib/content/schemas.ts` setup. Frontmatter: `quote`, `author`, `role`, `company`, `logo?`, `link?`, `date`, `relatedCase?` (case-study slug), `published`. Used: full quote on the related case-study page; short pull-quote in the homepage "proof" section. No star-rating UI (one review as `★★★★★ (1)` looks thin); a "what clients say" strip is added only once there are 3–5.
- **Reworked `hero-scene.tsx`** — see §6.
- Minor: `back-link`, `section`, `cta-band` etc. stay; copy/visual tweaks only.

---

## 8. Page-by-page content plan

**`/` Home**
1. **Hero** — "The Forge" scene + headline + the one-line positioning + dual CTA (Schedule a call / See our work). Headline keeps "Forging intelligent worlds" energy but the *subhead* must be the plain "what we do" sentence (no run-on).
2. **What we do** — three ranked services, not five flat ones: ① **Game co-development** (features & systems, AI/agentic systems, prototypes & vertical slices) ② **Interactive products** (gamified products, training sims, configurators, interactive 3D/data) ③ **The deep end** (simulation / digital-twin work — framed as proof of how deep the engineering goes; links to the Los Alamos case study). Visual ranking makes ① clearly primary.
3. **Proof** — the two case studies, prominent (cards with `<MediaFrame>` thumbnails) + the testimonial pull-quote.
4. **How we work** — the operating model + **the geography answer** (overlap hours, named lead, "your repo / your tools / your standards," async-first, scoping process). This content is currently *entirely absent* and is the most important addition for the India→US/UK/EU credibility gap.
5. **Who's behind ArkaForge** — founder-led studio + a curated network of game engineers, developers, designers; the project-fit-team model; founder background (AI/ML, game dev, AR/VR, applied simulation, ASU/Los Alamos).
6. **CTA band.**

**`/services`** — overview of the two services + a line on "the deep end." Then:
- **`/services/game-co-development`** — the spear page. What we build (features & systems engineering; AI & agentic systems; prototypes & vertical slices). Engagement models (scoped sprint; fixed-bid prototype; vertical slice; co-dev retainer) with indicative ranges. How we embed (pipeline, tools, standards, overlap hours, named lead). Who it's for (studios needing capacity on a deadline; publishers managing multiple titles; teams shipping a slice/prototype to pitch). Scoping-call close.
- **`/services/interactive-products`** — the cash engine. What we build (gamified products & onboarding; training simulations; configurators; interactive 3D/data experiences). Tie to the gamified-product case study + testimonial. Who it's for (companies that need an experience users *engage with*, not a page they skim). Engagement: fixed-scope builds, faster cycles. (Possible interactive "toy" widget later.)
- **"The deep end"** anchor section (on the game-co-dev page or the services overview): simulation / digital-twin engineering — described via the Los Alamos work; honest about it being founder research; positioned as proof of technical depth; explicitly *not* an enterprise-DT sales pitch.

**`/work` + `/work/[slug]`** — two real, fully-built case studies (template: problem → approach → what we built → result → tech). 
- **Los Alamos nuclear glovebox training simulator** — with the new images/video under `<MediaFrame>` treatment; annotated diagram(s) for the task-tracking/scoring flow; honest framing per §3.3.
- **Gamified product** (the client site) — screenshots / before-after, the problem, what changed (ideally a number), the testimonial in full. Published once the project ships and permission is in hand.
- Remove the placeholder `gamification-platform.mdx` "Digital Twin Training Platform" stub, or rewrite it into a real entry only if there's real content.

**`/company`** — what ArkaForge is (the positioning, plainly); the operating model (founder-led + curated network; project-fit teams; how engagements run); founder background; values (kept tight — 3 max, on-message); how to engage; CTA. Absorbs "who's behind it."

**`/careers`** — rewritten to the new positioning ("a real-time interactive studio — game co-development and interactive products; we work with a curated network of senior game engineers, developers, and designers"). Keep the existing `CareersForm`.

**`/contact`** — keep structure; copy fixes to match new positioning; keep the form + API route.

**`app/layout.tsx` metadata** — rewrite `title`/`description`/OpenGraph/Twitter to the new positioning; **delete the ~90-keyword array** (replace with a short, honest keyword list or none); keep the JSON-LD organization schema (update its description).

---

## 9. Cleanup checklist

- Delete dead components: `capabilities-grid`, `services-grid`, `proof-strip`, `vision-section`, `why-it-matters`, `how-we-work`, `use-cases`, `systems-mindset`, `featured-labs`, `featured-labs-client`, `featured-work`, `featured-work-client`.
- Delete `app/(site)/careers/page_old.tsx`.
- Delete `splash-screen.tsx` + its usage in `app/(site)/layout.tsx`.
- Remove `/labs` route tree + Labs sample content (decide in planning whether to keep `getLabs` dormant or remove).
- Fix `app/layout.tsx` SEO block.
- Verify `next build` + `tsc --noEmit` + `next lint` clean after removals.

---

## 10. Sequencing (so the message is fixed even if the fancy parts land later)

1. **Positioning + copy + IA** — new routes, redirects, rewritten copy across all pages, nav fix, metadata/SEO fix, dead-code purge. *After this step the site already "clearly states what we do."*
2. **Visual re-grade** — palette, mono font, engine-UI cues, motion pass, remove splash, `<MediaFrame>` component.
3. **The Forge hero** — new WebGL scene + fallbacks.
4. **Case-study build-out** — Los Alamos with assets; gamified-product case study + testimonial collection.
5. **Polish** — perf pass (Lighthouse, mobile), accessibility, reduced-motion, redirect QA, build/lint/typecheck.

---

## 11. Needed from the founder (assets / inputs)

- Los Alamos screenshots + video clip(s) — whatever exists; we'll crop/grade/treat them.
- The gamified-product project: live link and/or screenshots, before-after if possible, the problem it solved, any outcome metric.
- The customer testimonial: a specific, attributed quote (name + role + company + logo/photo if possible) — coached toward problem → what changed → a number — plus written permission to use name/logo/quote on the site.
- Confirmation of the geography promises we'll actually commit to (overlap hours, named-lead model) so the "how we work" copy is true.
- Logo / brand assets at usable resolution (current `arka-forge-logo.png` is small).

---

## 12. Non-goals

- No ground-up framework rebuild; no CMS migration; no move off Next.js/Tailwind.
- No new top-level "Digital Twins" pillar; no enterprise-DT sales pages.
- No individual team bios / team grid (yet).
- No `/labs` content (yet).
- No US-entity / sales-hire work (milestone-gated, out of scope for the website project).
- No star-rating UI / wall-of-love (until 3–5 testimonials exist).
