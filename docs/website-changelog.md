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
