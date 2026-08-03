# Website change log

A running record of copy, design, and flow changes to the ArkaForge site.
Newest first. Keep entries short: what changed, and why.

## 2026-08-02

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

### Homepage — Hero (`components/site/hero.tsx`)
- H1 → **"Games & Digital Twins for high-stakes training."**
- Folded the separate co-dev supporting line into the primary subcopy.

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
