# ArkaForge — Content & Flow Audit

Goal: increase visitor retention, conversion, and search visibility, with **game co-dev, digital twins, and interactive products** front and center. Synthesized from a 10-part review (hero, offers, service pages, IA/nav, SEO, proof, company/careers, CTAs). Copy principle throughout: fewest words, best communication.

**Nothing here is applied yet — these are recommendations.**

---

## The one big thing: pick one lead offer, make everything agree

Right now the site sends three different priority signals:

- Hero **headline** → "Games & Digital Twins for high-stakes training" reads **twins-first** (and grammatically ties *games* to *training*, misframing co-dev).
- Hero **subcopy** → opens "We co-develop games…" reads **co-dev-first**.
- Offers **section** → renders **digital twins on the left** (first read).
- Services index + metadata → **digital twins first**.

Decide the lead offer and align headline + subcopy + offer order + services order + metadata. The proof (Los Alamos) argues twins-lead; the business goal names co-dev first. **Pick one** — the inconsistency is the single biggest clarity leak.

---

## Top 10 highest-leverage fixes (ranked)

1. **Resolve the lead-offer inconsistency** (hero headline vs subcopy vs offer order). — `hero.tsx`, `home-twin-codev-split.tsx`, `services/page.tsx`
2. **Put Los Alamos credibility in the hero.** No lab name/logo/metric appears until the 3rd scroll. Add a trust line under the CTAs or in the top meta strip. — `hero.tsx:26`, `:70`
3. **Fix "The same engine team…" — it's ambiguous cold** ("same as whom?"), worst on the standalone co-dev page. Make it self-contained. — `services/game-co-development/page.tsx:69`, `home-twin-codev-split.tsx:62`
4. **Add proof to the co-dev service page** — zero shipped work / metric for a "let us into your codebase" decision. — `services/game-co-development/page.tsx`
5. **Add outcome metrics to the case study** — it promises "measurable readiness" but shows no number. Add a 3-tile outcomes row. — `content/work/los-alamos-asu-simulation.mdx`, `work/[slug]/page.tsx`
6. **Standardize CTAs sitewide** to one pair: **"Book a scoping call"** (primary) + **"See our work"** (secondary). Five variants exist today. — all pages
7. **Add a CTA to pages that dead-end** (Work index, case study, Services index) — reuse `CTABand`. — those pages
8. **Shorten the 45-word hero subcopy**; make the three offers scannable. — `hero.tsx` `PRIMARY_SUB`
9. **Fix SEO gaps: canonical tags + OG/Twitter image are missing sitewide**; homepage has no metadata export. — `lib/seo/metadata.ts`, `app/layout.tsx`, `app/(site)/page.tsx`
10. **De-duplicate the offer list** on Company (stated 2–3×) and "we review every submission" on Careers (3×). — `company/page.tsx`, `careers/page.tsx`

---

## By area

### Hero — `components/site/hero.tsx`
- **H1 tail misattributes scope.** "…for high-stakes training." applies only to twins but reads as modifying both offers. Drop the tail or unify: `We build / Games & Digital Twins / on real-time engine tech.`
- **Subcopy is a 45-word run-on** — three offers buried in one sentence. Cut to one tight line naming the lead offer; let the offers section carry detail.
- **No "why ArkaForge."** Add a one-line closer: *"One real-time engineering team — games to safety-critical twins."*
- **Add credibility:** *"Proven on nuclear glovebox training at Los Alamos National Laboratory."* under the CTAs.
- Alt H1 options: *"We engineer games and digital twins." · "Games. Digital twins. Built by one engine team."*

### Offers section — `components/site/home-twin-codev-split.tsx`
- **Right headline isn't self-contained** on stacked/mobile: `The same engine team…` → `Our engine team, pointed at your game.`
- **Interactive products is missing here** though it's a real route — add a compact third card/strip, or deliberately frame it as tertiary.
- Tags aren't parallel: `Training simulation` (use case) vs `Game co-development` (service). Consider `Digital twins` / `Game co-dev`.
- CTAs aren't parallel: `See digital twins` vs `How co-dev works` — pick one form.

### Proof & credibility — `components/site/proof.tsx`, `content/work/*.mdx`
- Only **one** case study ships (the other is `published: false`) — the flagship must carry max weight and currently doesn't.
- **De-hedge the client label:** `Founder-led research - Los Alamos… x ASU…` → lead with the lab: `Los Alamos National Laboratory × ASU School of Manufacturing Systems and Networks`. Keep the honest "individual capacity" note in the footer.
- Section header `Selected work.` → `Proven at a national lab.`
- **No numbers anywhere.** Add outcome tiles: *Zero-risk practice · Per-step data · Objective readiness score.*
- Missing: logos (LANL/ASU), one testimonial/pull-quote. `/work` index is a bare one-card grid — add a credibility header or point "All work" at the case study.

### Digital Twins page — `app/(site)/services/digital-twins/page.tsx`
- **Add a problem/stakes section** after the hero (on-equipment training is costly, risky, unmeasurable) — the buyer converts on pain first.
- Rename `Proof` header to name Los Alamos.
- Move `Who it's for` up (qualification, not a closer). Recommended order: Hero → Problem → Who it's for → What we build → Proof → Engagement → CTA.
- Thin the hero subhead and the dense 2-sentence cards.

### Game Co-Dev page — `app/(site)/services/game-co-development/page.tsx`
- **Headline ambiguous cold** → `Senior UE5 and Unity engineers, embedded in your pipeline.`
- **Add a proof strip** (shipped titles / platforms / years-in-engine / one result).
- **Reorder:** show the case before the price — What we build → Who it's for → How we work → Engagement/pricing → CTA.
- Subhead repeats the cards — cut the feature list from it.
- Replace the "before the category had a name" brag with a hard fact.

### Interactive Products + Services index — `app/(site)/services/page.tsx`, `.../interactive-products/page.tsx`
- **Interactive Products cannibalizes Digital Twins** — it repeats "training simulations / error detection / readiness reporting." Strip safety-critical/training language; cross-link to Digital Twins. Keep it to gamified products, configurators, 3D/data experiences.
- Make service-card order + intro + metadata consistent with the chosen lead offer.
- Tighten the two dense pillar cards; add a one-line eyebrow per card.

### IA & Nav — `app/(site)/page.tsx`, `components/site/nav.tsx`
- **Section order is already sound** (hook → offers → proof → how → trust → CTA) — keep it.
- Expose offers: a **Services dropdown** (Digital Twins / Game Co-Dev / Interactive Products) lets visitors self-route.
- Consider moving **Careers to the footer** to keep the top bar on the buying path; add a persistent **"Book a call"** pill in the nav.

### SEO & metadata — `lib/seo/metadata.ts`, `app/layout.tsx`, per-page `metadata`
- **P0:** No canonical tags on any page (the `generateSiteMetadata` helper that emits them is imported by zero pages). No OG/Twitter image sitewide (links render as bare text).
- **P1:** Homepage has no `metadata` export (inherits a 380-char root description). Titles are brand-led with an inconsistent separator — front-load keywords, use the `%s | ArkaForge` template.
- Suggested homepage title: `Game Co-Development & Digital Twins Studio | ArkaForge`.
- **P2:** Unused dead code — `generateSiteMetadata`, `generateArticleSchema`, `generateBreadcrumbSchema`. Wire up or add `Service`/`WebSite` schema.
- (Foundation is good: metadataBase, Organization JSON-LD, sitemap, robots all correct.)

### CTAs & conversion — `hero.tsx`, `cta-band.tsx`, contact
- **Three pages dead-end** with no next step (Work index, case study, Services index) — add `CTABand`.
- **CTA band's secondary duplicates the primary** (both → /contact) — make it "See our work" (/work).
- **Label/casing inconsistency:** "Schedule a call" / "Schedule a scoping call" / "Schedule a Call" / "Get in touch" / "Get In Touch." Standardize on **Book a scoping call** + **See our work**, sentence case.
- **Company CTA order is inverted** (secondary before primary).
- Contact: H1 is bare "Contact" → `Book a call, or send a note.`; the required "Subject" field duplicates Message (drop/optional); surface "We reply within 1–2 business days" next to Send.

### Company & Careers voice — `company/page.tsx`, `careers/page.tsx`
- Voice is on-brand (confident, senior). Main issues: **repetition** (offer list 2–3×, "we review every submission" 3×) and a few **laundry-lists/hedges**.
- Founder bio is a 7-item buzzword stack ("LLMs and agentic AI…") — trim to what's load-bearing.
- "Distance is a non-issue" title is defensive → `Run on your clock` / `Led from the US`.
- Fix inconsistent "digital twins" capitalization (lowercase in prose everywhere).
- Careers metadata leads with a hedge ("We're not just hiring…") — state the point.

---

## Suggested execution order
1. Positioning: lock the lead offer; align hero + offers + services + metadata. (#1, #2, #8)
2. Trust: Los Alamos in the hero, de-hedge the client label, add outcome tiles. (#2, #5)
3. Conversion: standardize CTAs, kill dead-ends, fix contact friction. (#6, #7)
4. Service pages: co-dev headline + proof, twins problem-section + reorder. (#3, #4)
5. SEO: canonical + OG image + homepage metadata. (#9)
6. Copy hygiene: de-dupe Company/Careers, tighten dense blocks. (#10)
