# Requirements Document

## Introduction

The Arka Forge homepage must be repositioned from a "Digital Twin Company" identity to a simulation-driven, game-based learning and training company. The restructure replaces the current 5-section layout with a focused 10-section homepage that leads with simulation-based training, establishes commercial credibility for U.S. clients, and demotes digital twins to a supporting capability rather than the primary identity. The footer tagline is also updated to reflect the new positioning.

## Glossary

- **Homepage**: The page served at `/` by `app/(site)/page.tsx`
- **Hero**: Section 1 — the top-of-page section containing the primary headline, body copy, and CTAs
- **WhatWeBuild**: Section 2 — four-item grid naming the product types Arka Forge delivers
- **WhyItMatters**: Section 3 — six-item grid making the case for simulation-based training
- **ServicesGrid**: Section 4 — three service cards describing how Arka Forge works with clients
- **UseCases**: Section 5 — six use-case cards showing the range of industries and training contexts served
- **HowWeWork**: Section 6 — four-step process section
- **SystemsMindset**: Section 7 — five-item differentiator section (file: `systems-mindset.tsx`)
- **CapabilitiesGrid**: Section 8 — four advanced capability cards (file: `capabilities-grid.tsx`)
- **VisionSection**: Section 9 — short forward-looking copy section
- **CTABand**: Section 10 — call-to-action section at the bottom of the page
- **Footer**: The site-wide footer component at `components/site/footer.tsx`
- **isDeep**: A boolean prop on a service card that marks it as an advanced/digital-twin-depth offering
- **Advanced Capability badge**: A visual badge rendered on a service card when `isDeep` is true

---

## Requirements

### Requirement 1: Hero Section Identity

**User Story:** As a visitor, I want the hero section to immediately communicate that Arka Forge builds simulation and game-based learning experiences, so that I understand the company's primary offering without ambiguity.

#### Acceptance Criteria

1. THE Hero SHALL display the eyebrow pill text `Simulation-Based Training · Game-Based Learning`
2. THE Hero SHALL display the H1 heading `Training Built for Real-World Readiness`
3. THE Hero SHALL display the body copy `Arka Forge builds simulation and game-based learning experiences that prepare people for high-stakes environments — before they ever face the real thing.`
4. THE Hero SHALL NOT display the text `Digital Twins · Simulation · Workforce Training`
5. THE Hero SHALL NOT display the text `Forging Intelligent Worlds`

---

### Requirement 2: Hero CTAs

**User Story:** As a visitor, I want clear calls to action in the hero section, so that I can immediately schedule a meeting, view work, or get in touch.

#### Acceptance Criteria

1. THE Hero SHALL render a primary CTA button labelled `Schedule a Meeting` that links to the Google Calendar booking URL with `target="_blank"` and `rel="noopener noreferrer"`
2. THE Hero SHALL render a secondary CTA button labelled `See Our Work` that links to `/work`
3. THE Hero SHALL render a tertiary CTA button labelled `Get in Touch` that links to `/contact`

---

### Requirement 3: What We Build Section

**User Story:** As a visitor, I want to see the four product types Arka Forge delivers, so that I can quickly understand the scope of their offering.

#### Acceptance Criteria

1. THE WhatWeBuild SHALL display the section heading `Interactive Experiences for Real-World Training`
2. THE WhatWeBuild SHALL render exactly four product items
3. WHEN the WhatWeBuild section is rendered, THE WhatWeBuild SHALL display each item with a non-empty title and a non-empty description
4. THE WhatWeBuild SHALL include an item titled `Interactive Training Experiences`
5. THE WhatWeBuild SHALL include an item titled `Simulation Environments`
6. THE WhatWeBuild SHALL include an item titled `Game-Based Learning Products`
7. THE WhatWeBuild SHALL include an item titled `Immersive Operational Learning Systems`

---

### Requirement 4: Why It Matters Section

**User Story:** As a visitor, I want to understand why simulation-based training is superior to passive instruction, so that I can appreciate the value of Arka Forge's approach.

#### Acceptance Criteria

1. THE WhyItMatters SHALL display the section heading `Practice Before the Stakes Are Real`
2. THE WhyItMatters SHALL render exactly six value-point items
3. WHEN the WhyItMatters section is rendered, THE WhyItMatters SHALL display each item with a non-empty title and a non-empty description
4. THE WhyItMatters SHALL include an item titled `Practice Before Real Stakes`
5. THE WhyItMatters SHALL include an item titled `Safer Mistakes`
6. THE WhyItMatters SHALL include an item titled `Measurable Learning`

---

### Requirement 5: Services Section

**User Story:** As a visitor, I want to see the three service lines Arka Forge offers, so that I can identify which service fits my organization's needs.

#### Acceptance Criteria

1. THE ServicesGrid SHALL display the section heading `Three Ways We Work With You`
2. THE ServicesGrid SHALL render exactly three service cards
3. THE ServicesGrid SHALL include a service card titled `Simulation-Based Training`
4. THE ServicesGrid SHALL include a service card titled `Game-Based Learning Experiences`
5. THE ServicesGrid SHALL include a service card titled `Immersive Training Environments`
6. WHEN a service card has `isDeep` set to true, THE ServicesGrid SHALL render an `Advanced Capability` badge on that card
7. WHEN a service card does not have `isDeep` set to true, THE ServicesGrid SHALL NOT render an `Advanced Capability` badge on that card
8. THE ServicesGrid SHALL mark the `Immersive Training Environments` card with `isDeep: true`

---

### Requirement 6: Use Cases Section

**User Story:** As a visitor, I want to see the range of industries and training contexts Arka Forge serves, so that I can determine whether my organization is a fit.

#### Acceptance Criteria

1. THE UseCases SHALL display the section heading `Built for Organizations That Train for Real`
2. THE UseCases SHALL render exactly six use-case items
3. WHEN the UseCases section is rendered, THE UseCases SHALL display each item with a non-empty label and a non-empty description
4. THE UseCases SHALL include an item labelled `Workforce Training`
5. THE UseCases SHALL include an item labelled `Safety & Compliance`
6. THE UseCases SHALL include an item labelled `Equipment & Systems Familiarization`

---

### Requirement 7: How We Work Section

**User Story:** As a visitor, I want to understand Arka Forge's delivery process, so that I can feel confident in their ability to execute.

#### Acceptance Criteria

1. THE HowWeWork SHALL display the section heading `From System to Simulation`
2. THE HowWeWork SHALL render exactly four process steps
3. WHEN the HowWeWork section is rendered, THE HowWeWork SHALL display step numbers sequentially starting at 1
4. THE HowWeWork SHALL include a step titled `Understand the System`
5. THE HowWeWork SHALL include a step titled `Design the Training Experience`
6. THE HowWeWork SHALL include a step titled `Build the Simulation`
7. THE HowWeWork SHALL include a step titled `Deploy and Refine`

---

### Requirement 8: Why Arka Forge Section

**User Story:** As a visitor, I want to understand what differentiates Arka Forge from other training vendors, so that I can evaluate them as a partner.

#### Acceptance Criteria

1. THE SystemsMindset SHALL display the section heading `A Different Kind of Training Partner`
2. THE SystemsMindset SHALL NOT display the heading `Why Digital Twins`
3. THE SystemsMindset SHALL render exactly five differentiator items
4. THE SystemsMindset SHALL include an item titled `Game-Tech Mindset`
5. THE SystemsMindset SHALL include an item titled `Premium Execution, Efficient Delivery`
6. THE SystemsMindset SHALL include an item titled `Digital Twin Depth When You Need It`

---

### Requirement 9: Advanced Capabilities Section

**User Story:** As a visitor with high-fidelity requirements, I want to see Arka Forge's advanced capabilities, so that I understand they can deliver beyond standard e-learning.

#### Acceptance Criteria

1. THE CapabilitiesGrid SHALL display the section heading `When You Need More Fidelity`
2. THE CapabilitiesGrid SHALL render exactly four capability items
3. THE CapabilitiesGrid SHALL include an item titled `Digital Twins`
4. THE CapabilitiesGrid SHALL include an item titled `Intelligent Environments`
5. THE CapabilitiesGrid SHALL include an item titled `Performance Analytics`
6. THE CapabilitiesGrid SHALL include an item titled `Adaptive Systems`
7. WHEN the CapabilitiesGrid section is rendered, THE CapabilitiesGrid SHALL NOT render any anchor elements linking to `/technology/` paths

---

### Requirement 10: Vision Section

**User Story:** As a visitor, I want to understand Arka Forge's long-term direction, so that I can assess their ambition and trajectory.

#### Acceptance Criteria

1. THE VisionSection SHALL display the section heading `Building Toward Intelligent Simulation`
2. THE VisionSection SHALL display body copy that references near-term simulation and learning work and longer-term digital twin and intelligent environment goals

---

### Requirement 11: CTA Band Section

**User Story:** As a visitor ready to engage, I want a clear call to action at the bottom of the page, so that I can start a conversation with Arka Forge.

#### Acceptance Criteria

1. THE CTABand SHALL display the section heading `Ready to Build Something Real?`
2. THE CTABand SHALL render a primary CTA button labelled `Start a Conversation` that links to `/contact`
3. THE CTABand SHALL render a secondary CTA button labelled `Schedule a Meeting` that links to the Google Calendar booking URL

---

### Requirement 12: Page Composition

**User Story:** As a developer, I want the homepage to compose all 10 sections in the correct order, so that the page structure matches the approved design.

#### Acceptance Criteria

1. THE Homepage SHALL render all ten sections: Hero, WhatWeBuild, WhyItMatters, ServicesGrid, UseCases, HowWeWork, SystemsMindset, CapabilitiesGrid, VisionSection, and CTABand
2. WHEN the Homepage is rendered, THE Homepage SHALL render the sections in the order: Hero → WhatWeBuild → WhyItMatters → ServicesGrid → UseCases → HowWeWork → SystemsMindset → CapabilitiesGrid → VisionSection → CTABand
3. THE Homepage SHALL NOT render the FeaturedWork component
4. THE Homepage SHALL NOT render the FeaturedLabs component

---

### Requirement 13: Footer Update

**User Story:** As a visitor, I want the footer to reflect Arka Forge's new positioning, so that the brand identity is consistent across the page.

#### Acceptance Criteria

1. THE Footer SHALL display the tagline `Simulation-based training and game-based learning experiences for real-world readiness.`
2. THE Footer SHALL NOT display the text `Digital twin company — interactive replicas of real-world systems for workforce training and operations.`
