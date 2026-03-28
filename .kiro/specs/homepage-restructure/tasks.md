# Implementation Plan: Homepage Restructure

## Overview

Rewrite and create the 10 section components that replace the current homepage layout, then rewire `app/(site)/page.tsx` to compose them in order. All components are static/presentational — no new data fetching. Existing filenames are preserved where noted to avoid import churn.

## Tasks

- [x] 1. Rewrite `components/site/hero.tsx`
  - Replace eyebrow pill text with `Simulation-Based Training · Game-Based Learning`
  - Replace H1 with `Training Built for\nReal-World Readiness`
  - Replace body copy per design spec
  - Reorder CTAs: primary = `Schedule a Meeting` (glow, calendar link, `target="_blank" rel="noopener noreferrer"`), secondary = `See Our Work` → `/work`, tertiary = `Get in Touch` → `/contact`
  - Preserve WebGL scene, layout structure, and framer-motion animation pattern
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 2.1, 2.2, 2.3_

- [x] 2. Create `components/site/what-we-build.tsx`
  - Define `WhatWeBuildItem` interface with `title`, `description`, `icon`
  - Declare static array of exactly four items: Interactive Training Experiences, Simulation Environments, Game-Based Learning Products, Immersive Operational Learning Systems
  - Render eyebrow, H2 `Interactive Experiences for Real-World Training`, body copy, and 2×2 grid of glass-cards (icon top-left, title, description)
  - Follow `whileInView` framer-motion stagger pattern from existing components
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7_

  - [ ]\* 2.1 Write property test for WhatWeBuild items
    - **Property 1: All section items have non-empty required fields**
    - **Validates: Requirements 3.3**

- [x] 3. Create `components/site/why-it-matters.tsx`
  - Define `WhyItem` interface with `title`, `description`, `icon`
  - Declare static array of exactly six items per design copy (Practice Before Real Stakes, Safer Mistakes, Stronger Understanding, Measurable Learning, Higher Engagement, Better Decision Readiness)
  - Render eyebrow, H2 `Practice Before the Stakes Are Real`, body copy, and 3-col / 2-col / 1-col responsive grid of compact cards
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_

  - [ ]\* 3.1 Write property test for WhyItMatters items
    - **Property 1: All section items have non-empty required fields**
    - **Validates: Requirements 4.3**

- [x] 4. Create `components/site/services-grid.tsx`
  - Define `ServiceItem` interface with `title`, `description`, `detailTag`, `icon`, `isDeep?: boolean`
  - Declare static array of exactly three services; set `isDeep: true` on `Immersive Training Environments`
  - Render eyebrow, H2 `Three Ways We Work With You`, and 3-col (lg) / stacked responsive grid
  - When `isDeep` is true, render an `Advanced Capability` badge on that card; omit badge otherwise
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8_

  - [ ]\* 4.1 Write property test for isDeep badge exclusivity
    - **Property 2: isDeep badge exclusivity**
    - **Validates: Requirements 5.6, 5.7**

- [x] 5. Create `components/site/use-cases.tsx`
  - Define `UseCaseItem` interface with `label`, `description`, `icon`
  - Declare static array of exactly six items per design copy
  - Render eyebrow, H2 `Built for Organizations That Train for Real`, body copy, and 2×3 / 2-col / 1-col responsive grid
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6_

  - [ ]\* 5.1 Write property test for UseCases items
    - **Property 1: All section items have non-empty required fields**
    - **Validates: Requirements 6.3**

- [x] 6. Create `components/site/how-we-work.tsx`
  - Define `HowWeWorkStep` interface with `step: number`, `title`, `description`
  - Declare static array of exactly four steps (step numbers 1–4) per design copy
  - Render eyebrow, H2 `From System to Simulation`, and horizontal 4-col stepper on desktop / vertical stack on mobile
  - Render step number as large muted numeral; include a connecting line between steps on desktop
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7_

  - [ ]\* 6.1 Write property test for HowWeWork step sequencing
    - **Property 3: HowWeWork steps are sequential**
    - **Validates: Requirements 7.3**

- [x] 7. Checkpoint — ensure all new components compile and render without errors
  - Ensure all tests pass, ask the user if questions arise.

- [x] 8. Rewrite `components/site/systems-mindset.tsx`
  - Replace `principles` array with five `WhyItem` entries per design copy (Game-Tech Mindset, Stronger Than Passive E-Learning, Premium Execution Efficient Delivery, Global Client Readiness, Digital Twin Depth When You Need It)
  - Update eyebrow to `Why Arka Forge`, H2 to `A Different Kind of Training Partner`, body copy per design
  - Remove old "Why Digital Twins" heading and "Philosophy" eyebrow
  - Keep exported name `SystemsMindset` and filename unchanged
  - Layout: 3-col first row, 2-col second row (or uniform 3-col with last two centered); mobile single column
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6_

- [x] 9. Rewrite `components/site/capabilities-grid.tsx`
  - Replace `capabilities` array with four `AdvancedCapabilityItem` entries: Digital Twins, Intelligent Environments, Performance Analytics, Adaptive Systems
  - Remove all `href` fields and `Link` wrappers from cards — cards are non-interactive `div`s
  - Remove `ArrowUpRight` icon and any `/technology/` links
  - Update eyebrow to `Advanced Capabilities`, H2 to `When You Need More Fidelity`, body copy per design
  - Keep exported name `CapabilitiesGrid` and filename unchanged
  - Layout: 2×2 grid desktop, single column mobile
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7_

  - [ ]\* 9.1 Write property test for CapabilitiesGrid no /technology/ links
    - **Property 4: CapabilitiesGrid contains no /technology/ links**
    - **Validates: Requirements 9.7**

- [x] 10. Create `components/site/vision-section.tsx`
  - No props — self-contained static component
  - Render eyebrow `Vision`, H2 `Building Toward Intelligent Simulation`, and two-sentence body copy per design
  - Layout: centered single-column, `max-w-2xl`, subtle ambient glow background, not full-height
  - _Requirements: 10.1, 10.2_

- [x] 11. Rewrite `components/site/cta-band.tsx`
  - Update eyebrow to `Let's Talk`, H2 to `Ready to Build Something Real?`, body copy per design
  - Primary CTA: `Start a Conversation` → `/contact` (glow button)
  - Secondary CTA: `Schedule a Meeting` → calendar link (`target="_blank" rel="noopener noreferrer"`) (outline button)
  - _Requirements: 11.1, 11.2, 11.3_

- [x] 12. Replace `app/(site)/page.tsx` with 10-section composition
  - Import all ten section components
  - Remove imports for `FeaturedWork` and `FeaturedLabs`
  - Render sections in order: Hero → WhatWeBuild → WhyItMatters → ServicesGrid → UseCases → HowWeWork → SystemsMindset → CapabilitiesGrid → VisionSection → CTABand
  - _Requirements: 12.1, 12.2, 12.3, 12.4_

  - [ ]\* 12.1 Write property test for homepage section order
    - **Property 5: Homepage section order is preserved**
    - **Validates: Requirements 12.1, 12.2**

- [x] 13. Update footer tagline in `components/site/footer.tsx`
  - Replace `Digital twin company — interactive replicas of real-world systems for workforce training and operations.` with `Simulation-based training and game-based learning experiences for real-world readiness.`
  - _Requirements: 13.1, 13.2_

- [x] 14. Final checkpoint — ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Filenames `systems-mindset.tsx` and `capabilities-grid.tsx` are intentionally kept to avoid import churn across the codebase
- All new components follow the existing `whileInView` framer-motion pattern and `glass-card` / `glass-pill` / `gradient-text` utility classes
- No new dependencies — framer-motion, lucide-react, and Tailwind are already installed
- Property tests validate universal correctness properties; unit tests validate specific examples and edge cases
