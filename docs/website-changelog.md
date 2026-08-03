# Website change log

A running record of copy, design, and flow changes to the ArkaForge site.
Newest first. Keep entries short: what changed, and why.

## 2026-08-02

### Full-site content pass (applied from a 5-agent review)
Honesty / guardrail (the Los Alamos work is founder-led INDIVIDUAL research, never
a company client win or the studio's identity):
- Digital Twins "Proof" reframed - "built as founder-led research with ASU, inside
  a national-lab program at Los Alamos ... not a client engagement."
- Company: "the foundation this company is built on" -> "That project set the bar
  he now runs the studio to."
- Case study: description no longer implies a system deployed "at Los Alamos";
  "Los Alamos ... needed a better answer" -> "This research ... set out to build a
  better answer."
- Services twins card: dropped the broken, nuclear-leaning standard line for
  "built to safety-critical standards."

Physical AI (was absent from the twins pages): added to the Services intro, the
twins pillar card, the Digital Twins subhead, and a new "Who it's for" bullet.

Interactive Products de-cannibalized: "Training simulations" -> "Product & process
training" (cross-links to digital twins); the industrial "Who it's for" line routed
to enablement instead of operator/safety training.

Consistency: US spelling (behaviours->behaviors, modelled->modeled); footer
"Video games engineering" -> "Game engineering"; Company CTAs sentence-cased with a
real secondary (See our work); cta-band secondary (dup /contact) -> "See our work";
case-study link verb unified to "Read the case study."

De-dup / tightening: Company origin no longer re-lists the offers; Careers process
step + apply subhead de-duped; HowWeWork intro no longer repeats a card; home split
co-dev softened ("own the technical execution") and twin body trimmed for parity.

Held for the client's call (not applied): hero H1 order, hero-sub lead offer,
service-page section reorders, adding interactive products to the homepage.

### Homepage — Proof section (`components/site/proof.tsx`, case-study frontmatter)
- Header: `Selected work.` → eyebrow **Proof** + **"What we're capable of."**
  Reframed as proof of skill/capability, not a portfolio.
- Guardrail: the Los Alamos project is one flagship *proof point*, **not** the
  studio's identity, and it was done in the founder's **individual research
  capacity** — so the case label leads with "Founder-led research ·" and we do
  not present it as a company↔lab client engagement. Do not oversell this.

### Homepage — Twins + Co-dev split (`components/site/home-twin-codev-split.tsx`, `twin-schematic.tsx`)
- Merged the two stacked sections into one side-by-side split (xl+), stacked on
  tablet/phone; no framed card — sits on the dark page.
- All-orange with a glowing blue→…→orange slit; then simplified to orange only.
- Headlines: **"We build digital twins for training & physical AI."** and
  **"We plug into your team and own the build."** (orange accents on key words).
- Broadened the training side to **physical AI** (tag + body) to also address
  robotics/embodied-AI simulation, alongside human high-stakes training.
- Co-dev body: "As your co-development partner, we own the entire technical
  execution stack…"
- Illustrations set to equal height, centered over their text; both CTAs pinned
  to a shared baseline so they align.

### Company page (`app/(site)/company/page.tsx`)
- Trimmed the founder bio from a 7-item buzzword list to the load-bearing skills.
- Value card `Distance is a non-issue` → **`Led from the US`** (+ tightened body).
- Dropped "several US-educated" (US signaling appeared 3×) and "technical" filler.
- Rewrote the origin's closing paragraph as a payoff instead of a third re-list
  of the offer ("Today the studio holds that same standard… senior execution
  without the headcount to carry").

### Careers page — full overhaul (`app/(site)/careers/page.tsx`, `careers-form.tsx`)
- Rebuilt as an editorial, culture-forward page: hero EVP → honest "we don't
  post job reqs" model → the bar (what we look for) → disciplines → what you
  get → how hiring works (3 steps) → apply.
- Owns the open-application reality honestly; nothing oversold; no fabricated
  process/timelines.
- Cut first-stage form friction: Phone and "How did you hear about us?" are now
  optional. Metadata de-hedged; "digital twins" lowercased throughout.
- Form: added optional Engagement (full-time / contract / project-based /
  either), optional Gender (defaults to "Prefer not to say"), and a
  "Who referred you?" field when Referral is chosen.

### Homepage — The Studio (`components/site/the-studio.tsx`)
- Trimmed the founder buzzword list (matches the Company page); dropped
  "several US-educated"; kept the honest founder-led Los Alamos research mention.
- Vague "More about ArkaForge" link → "About the studio".
- Heading "The people who pitch are the people who build." → "No account
  managers. No handoffs." - a negation "stop statement" (boutique-studio
  precedent: Applaud, Vynn), with a simple payoff line ("You brief the people
  who build it."). Cut the founder buzzword list and the redundant paragraph.

### Careers — "What you get" cards (`app/(site)/careers/page.tsx`)
- Leveled the four card bodies to a consistent length so they read as a set.

### Service page — Game co-dev (`app/(site)/services/game-co-development/page.tsx`)
- Headline "The same engine team, pointed at your game" → "We plug into your
  team and own the build" (self-contained, matches the home section).
- Tightened the subhead (dropped the feature list the cards already cover).
- Removed the unfalsifiable "before the category had a name" brag.

### Contact page (`app/(site)/contact/page.tsx`)
- H1 "Contact" → "Book a call, or send a note." (previews both paths).
- Added "We reply within 1-2 business days." next to Send (reassurance before
  the click, not only in the post-submit toast).
- Open: Subject is still required; making it optional needs a schema/API change.

### Homepage — Hero (`components/site/hero.tsx`)
- H1 → **"Games & Digital Twins for high-stakes training."** (kept games-first
  for typographic balance: one-word "Games &" over two-word "Digital Twins").
- Subcopy reordered to lead with digital twins - the canonical offer order is
  digital twins, then game co-dev - and now names physical AI.

### Tooling / docs
- Added `docs/content-audit.md` — 10-part audit with prioritized copy/flow fixes.
- Added local `concise-copy` skill (fewest words, best communication).

---

## Guardrails (read before editing copy)
- **Don't oversell the Los Alamos work.** Individual research capacity; keep
  "founder-led research" visible. It's proof of capability, not our identity.
- **Fewest words, best communication** — see the `concise-copy` skill.
- **Match the existing understated, senior voice.** Learn from current wordings
  before rewriting; no hype, no hedging.
- **No em dashes.** Use ` - ` (spaced hyphen) in copy, matching the site's
  convention.
