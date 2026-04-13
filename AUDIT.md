# Arka Forge — Content & Structure Audit

Exhaustive raw dump of all page routes, components, copy, MDX, and design tokens. For rewriting copy.

---

## Root `app/layout.tsx` — Metadata

- **title.default**: `Arka Forge — Simulation-Based Training & Digital Twins`
- **title.template**: `%s | Arka Forge`
- **description**: `Arka Forge builds simulation-based training systems and digital twins using game technology — for organizations where the gap between training and reality carries real cost.`
- **keywords**: `simulation-based training`, `digital twins`, `game-based learning`, `workforce training`, `unreal engine`, `serious games`, `industrial simulation`, `XR training`
- **authors**: `Arka Forge`
- **creator**: `Arka Forge`
- **openGraph**:
  - type: `website`
  - locale: `en_US`
  - url: `https://arkaforge.com`
  - siteName: `Arka Forge`
  - title: `Arka Forge — Simulation-Based Training & Digital Twins`
  - description: `Simulation-based training and digital twins — built with game technology, for organizations where the gap between training and reality carries real cost.`
- **twitter**:
  - card: `summary_large_image`
  - title: `Arka Forge — Simulation-Based Training & Digital Twins`
  - description: `Simulation-based training and digital twins — built with game technology, for organizations where the gap between training and reality carries real cost.`
- **robots**: index: true, follow: true
- Font: `Inter` (via `next/font/google`), variable `--font-inter`
- Custom font face: `Corpa` (loaded via `/CorptademoRegular.otf`) used for display/headings

---

## Site Layout — `app/(site)/layout.tsx`

Renders (in order):
- `<GalaxyBackground />`
- `<SplashScreen />`
- `<SmoothScroll>` wrapper containing:
  - `<SkipToContent />`
  - `<Nav />`
  - `<main id="main-content">` children
  - `<Footer />`
  - `<Toaster />`

---

## Navigation (`components/site/nav.tsx`)

Logo: `/arka-forge-logo.png` — alt `Arka Forge logo`
Brand wordmark: `Arka Forge`
Aria label: `Arka Forge Home`

Nav items:
- `/technology` → `Capabilities`
- `/work` → `Work`
- `/company` → `Company`
- `/contact` → `Contact`

Hamburger SR text: `Toggle menu`

---

## Footer (`components/site/footer.tsx`)

Brand heading: `Arka Forge`

Tagline: `Simulation-based training and digital twins — built with game technology, for organizations where the gap between training and reality carries real cost.`

**Company** column:
- `/company` → `About`
- `/contact` → `Contact`

**Legal** column:
- `/legal/privacy` → `Privacy Policy`

Column headings: `Company`, `Legal`

Socials:
- LinkedIn — `https://www.linkedin.com/company/arkaforge`
- Instagram — `https://instagram.com/arka.forge`
- Email — `mailto:contact@arkaforge.com`

Copyright: `© {current year} Arka Forge. All rights reserved.`

---

## Skip-to-content link

Text: `Skip to main content` (anchor `#main-content`)

---

## Splash screen (`components/site/splash-screen.tsx`)

- Logo image: `/arka-forge-logo.png`
- Wordmark text: `Arka Forge`
- Spin duration: 2400ms; Collapse duration: 600ms

---

## Not-found page — `app/not-found.tsx`

- H1: `404`
- Paragraph: `Page not found. The page you're looking for doesn't exist.`
- Button: `Return Home` (links to `/`)

---

# PAGE ROUTES

## Route `/` — `app/(site)/page.tsx`

Imports/uses components:
- `Hero`
- `ProofStrip`
- `WhatWeBuild`
- `CoreBelief`
- `FeaturedCase`
- `CTABand`

### `<Hero />` copy (components/site/hero.tsx)
- Eyebrow pill: `Game Technology · Simulation · Training`
- H1:
  - `Forging`
  - `Intelligent Worlds` (gradient span)
- Paragraph: `We use game technology to build simulation-based training systems and digital twins — for industries where the cost of under-prepared people is measured in downtime, safety incidents, and wasted years.`
- Primary CTA: `See Our Work` → `/work`
- Secondary CTA: `Schedule a Discovery Call` → `https://calendar.app.google/9HXdsiKfCXCPeUya9`

### `<ProofStrip />` copy
- Eyebrow: `Built for`
- Items (pipe-separated):
  - `Los Alamos National Laboratory × ASU`
  - `Nuclear Workforce Simulation`
  - `UE5 + Custom Game Logic`

### `<WhatWeBuild />` copy
- Eyebrow: `Capabilities`
- H2: `What We Build`
- Subhead: `Three core capabilities. One methodology: replace passive instruction with systems where people learn by doing.`
- Cards (title / description / builtFor):
  1. `Simulation-Based Training` / `Workers practice real procedures inside interactive digital environments before touching real equipment. No downtime, no risk, no guessing whether they're ready.` / `manufacturing, energy, safety-critical operations, technical onboarding.`
  2. `Game-Based Learning` / `Corporate and professional training redesigned with game mechanics — not as a gimmick, but as a serious methodology for engagement, retention, and measurable skill progression.` / `workforce development, compliance training, corporate education programs.`
  3. `Digital Twin Systems` / `Interactive replicas of real systems, workflows, and environments. We build digital twins that let organizations train, test, and understand their operations before committing to the physical world.` / `infrastructure, energy, industrial operations.`
- Label prefix on each card: `Built for:`
- Footnote: `Delivered across desktop, VR/AR headsets, and web — depending on what the application requires.`

### `<CoreBelief />` copy
- Eyebrow: `The Core Belief`
- Main statement: `The future of training is not more content. It's better systems.`
- Continuation (muted): `Interactive, simulation-driven, performance-tracked — built with the same technology that makes games feel real, applied to problems that are.`

### `<FeaturedCase />` copy
- Eyebrow: `Work`
- H2: `What We've Built`
- Card H3: `Nuclear Glovebox Training Simulator`
- Paragraph: `A game-modified digital twin for workforce training at Los Alamos National Laboratory — built to replace passive instruction with interactive, performance-tracked simulation for precision nuclear operations.`
- Attribution line: `Los Alamos National Laboratory × ASU School of Manufacturing Systems and Networks`
- Tags: `simulation`, `digital twin`, `game development`, `unreal engine`, `workforce training`
- CTA link: `Read the full case study` → `/work/los-alamos-asu-simulation`

### `<CTABand />` copy
- Eyebrow: `Let's Talk`
- H2: `Build with Arka Forge` (gradient span on "Arka Forge")
- Paragraph: `Need simulation-based training, a digital twin of your systems, or an interactive learning environment for your workforce? We work with organizations in manufacturing, energy, defense, and research — where the gap between training and reality carries real cost.`
- CTA 1: `Get In Touch` → `/contact`
- CTA 2: `Schedule a Discovery Call` → `https://calendar.app.google/9HXdsiKfCXCPeUya9`

---

## Route `/company` — `app/(site)/company/page.tsx`

- **metadata.title**: `Company — Arka Forge`
- **metadata.description**: `Arka Forge is a game technology studio building simulation-based training systems and digital twins. Founded at the intersection of game development, applied simulation, and real-world systems.`

Components used: `Section`, `Button`, `Link`, `ArrowRight`

Copy:
- Eyebrow: `About Arka Forge`
- H1: `Built on a simple belief:` / `training should be interactive, not passive.` (gradient span)
- Intro paragraphs:
  - `Arka Forge is a game technology studio that uses the systems behind real-time 3D games to build training environments and digital twins for organizations that operate in the physical world.`
  - `We're not a generic software agency. We're not an XR production house. We build systems designed to close the gap between how people train and how they actually work.`

- Eyebrow: `Origin`
- `Arka Forge was founded by Harish, a computer science graduate researcher at Arizona State University with a background spanning game development, AR/VR systems, full-stack engineering, and applied simulation.`
- `The company's capabilities are grounded in direct experience: Harish led the design and development of a game-modified digital twin for nuclear glovebox workforce training at Los Alamos National Laboratory, in partnership with ASU's School of Manufacturing Systems and Networks.`
- `That project — interactive environment, custom game logic, task sequence tracking, real-time performance assessment — is the working proof of what Arka Forge builds and how it builds it.`
- `The company operates with a distributed model: client relationships and business development based in the United States, with production capabilities in India. This isn't an outsourcing play — it's a structural advantage that lets us maintain high quality and fast iteration without the overhead of a U.S.-only studio.`

- Eyebrow: `Direction`
- `We're building in phases, and we're transparent about where we are.`
- `Right now, we're focused on custom simulation-based training and game-based learning systems for enterprise and research clients. These are the projects where our capabilities are most directly applicable and where the value is clearest.`
- `As we grow — in team, in technical depth, and in client relationships — we're moving toward full-scale digital twin systems: real-time connected environments that mirror operational reality and enable ongoing scenario simulation, performance analytics, and predictive modeling.`
- `Longer term, the same technical pipelines that power our client work will feed into original interactive products. But that's later. Right now, we're here to build serious systems for serious problems.`

- Eyebrow: `How We Work`
- Values cards:
  1. `Problems Before Technology` — `We don't lead with a stack or a platform. We start with what's actually broken and work backward to the right system.`
  2. `Interactivity Is the Point` — `The difference between watching a simulation and being inside one is the same difference between reading about surgery and performing it. We build the second kind.`
  3. `Quality Is Non-Negotiable` — `We're building a premium studio, not a dev shop. Every system we ship has to work, look right, and perform — because our clients' credibility is tied to it, and so is ours.`

- Closing paragraph: `We're selective about the projects we take on. If you have a real training or simulation problem, we want to hear about it.`
- CTA 1: `Get In Touch` → `/contact`
- CTA 2: `Schedule a Discovery Call` → `https://calendar.app.google/9HXdsiKfCXCPeUya9`

---

## Route `/careers` — `app/(site)/careers/page.tsx`

- **metadata.title**: `Careers`
- **metadata.description**: `Join Arka Forge — build digital twins, simulation systems, and workforce training products.`

Components: `Section`, `Button`, `Briefcase`, `MapPin`

- Eyebrow: `Join Us`
- H1: `Careers`
- Intro: `We're a brand new studio (founded March 2024) building digital twins and simulation systems for manufacturing, robotics, energy, and defense. We're hiring engineers and designers to help us ship real products for real organizations.`

### Open roles

1. **Game Developer — Unreal Engine** — Engineering — `Remote / Hybrid · India`
   - `Own the development of simulation and training experiences in Unreal Engine. You'll build gameplay systems, integrate digital twin data, and ship polished interactive products for enterprise clients in manufacturing, energy, and defense.`
   - Requirements:
     - `2–3 years of professional experience with Unreal Engine 4 or 5`
     - `Strong C++ and Blueprints proficiency`
     - `Experience shipping at least one title or simulation project end-to-end`
     - `Familiarity with multiplayer networking, physics, or procedural systems is a plus`
     - `Comfort working in a small, fast-moving team with high ownership`

2. **Game Developer — Unity** — Engineering — `Remote / Hybrid · India`
   - `Design and build interactive training modules, gamified simulations, and AR/VR experiences in Unity. You'll collaborate closely with designers and clients to translate complex real-world workflows into engaging digital products.`
   - Requirements:
     - `2–3 years of professional Unity development (C#)`
     - `Solid understanding of Unity's rendering pipeline (URP or HDRP)`
     - `Experience with XR development (ARCore, ARKit, OpenXR) is a strong plus`
     - `Published or shipped at least one project (game, simulation, or enterprise app)`
     - `Strong debugging skills and a performance-first mindset`

3. **Software Engineer** — Engineering — `Remote / Hybrid · India`
   - `Build the backend services, data pipelines, and web platforms that power our simulation products. You'll work across the stack — from real-time APIs and cloud infrastructure to the React/Next.js frontends our clients interact with.`
   - Requirements:
     - `2–3 years of full-stack or backend software engineering experience`
     - `Proficiency in TypeScript/JavaScript and at least one backend language (Python, Go, or Rust)`
     - `Experience with REST/GraphQL APIs, databases (SQL and NoSQL), and cloud services (AWS or GCP)`
     - `Familiarity with CI/CD, containerization, and infrastructure-as-code`
     - `Bonus: experience integrating with game engines or real-time data systems`

4. **Narrative Designer** — Design — `Remote · India`
   - `Craft the stories, scenarios, and instructional narratives that make our training simulations immersive and effective. You'll work with game developers and subject-matter experts to design branching storylines, in-sim dialogue, and contextual tutorials that keep learners engaged.`
   - Requirements:
     - `2–3 years of experience in narrative design, instructional design, or game writing`
     - `Proven ability to write branching dialogue and scenario scripts for interactive media`
     - `Strong understanding of player motivation, learning theory, or gamification principles`
     - `Experience with tools like Twine, Ink, Articy:Draft, or similar narrative middleware`
     - `Excellent written communication and a portfolio of shipped narrative work`

5. **Graphic Designer** — Design — `Remote · India`
   - `Define the visual identity of our products and brand. You'll create UI/UX designs for simulation interfaces, marketing collateral, pitch decks, and web assets — ensuring everything we ship looks polished, modern, and unmistakably Arka Forge.`
   - Requirements:
     - `2–3 years of professional graphic design experience`
     - `Expert-level proficiency in Figma and Adobe Creative Suite (Photoshop, Illustrator)`
     - `Strong portfolio demonstrating UI design, branding, and visual communication`
     - `Understanding of design systems, typography, color theory, and responsive layout`
     - `Bonus: motion graphics or light video editing skills (After Effects, Premiere)`

6. **3D Animator** — Art & Animation — `Remote · India`
   - `Bring our simulations to life with high-quality character and mechanical animation. You'll rig and animate assets for real-time environments in Unreal and Unity — from human characters performing industrial tasks to machinery and equipment in digital twin scenarios.`
   - Requirements:
     - `2–3 years of professional 3D animation experience (Maya, Blender, or 3ds Max)`
     - `Strong understanding of rigging, skinning, and skeletal animation pipelines`
     - `Experience exporting and optimizing animations for real-time engines (Unreal or Unity)`
     - `Ability to animate both organic (characters) and mechanical (machinery, robotics) subjects`
     - `Bonus: experience with motion capture cleanup or procedural animation`

Apply button text: `Apply` (mailto `careers@arkaforge.com?subject=Application: {role}`)
Section label on each role: `Requirements`

### Why Join?
- `Build digital twins used by real organizations in real industries`
- `Ship products for manufacturing, energy, robotics, and defense`
- `Autonomy and ownership — small team, big impact`
- `Competitive compensation`
- `Remote-friendly, India-first culture`
- `Learn and grow across simulation, game-tech, XR, and enterprise software`

### Process
1. `Apply via email with your resume and portfolio`
2. `Introductory call with the founder`
3. `Role-specific task or interview`
4. `Offer and onboarding`

Closing: `Don't see a role that fits? Reach out to careers@arkaforge.com.`

Note: Careers is NOT in the site nav — only reachable by direct URL.

---

## Route `/contact` — `app/(site)/contact/page.tsx`

(No exported metadata — uses default root title/description.)

Components: `Button`, `Input`, `Textarea`, `Label`, `useToast`, icons `Mail, Clock, Linkedin, Instagram`

Copy:
- Eyebrow: `Get in Touch`
- H1: `Contact`
- Intro: `Have a project in mind? Let's discuss how we can help.`

Info cards (icon / heading / value):
1. Mail — `Email` — `contact@arkaforge.com`
2. Clock — `Response Time` — `Typically within 1-2 business days`
3. Linkedin — `LinkedIn` — `Arka Forge on LinkedIn` (`https://www.linkedin.com/company/arkaforge`)
4. Instagram — `Instagram` — `@arka.forge` (`https://instagram.com/arka.forge`)

Form labels/placeholders:
- `Name *` — placeholder `Your name`
- `Email *` — placeholder `you@company.com`
- `Company` — placeholder `Company name`
- `Subject *` — placeholder `Project inquiry`
- `Message *` — placeholder `Tell us about your project...`
- Submit button: `Send Message` / `Sending...` (loading state)

Toasts:
- Success title: `Message sent!` / description `We'll get back to you soon.`
- Error title: `Error` / description `Failed to send message.` (or error message)

---

## Route `/labs` — `app/(site)/labs/page.tsx`

- **metadata.title**: `Labs`
- **metadata.description**: `Research, experiments, and technical deep-dives from Arka Forge.`

Components: `Section`, `Card`, `CardContent`, `CardDescription`, `CardHeader`, `CardTitle`, `Link`

Copy:
- H1: `Labs`
- Subhead: `Technical research and deep-dives on digital twins, simulation, and game-tech. Coming soon.`
- Empty-state message: `No labs posts yet. Check back soon!`

Cards render each lab's `frontmatter.title`, `description`, `tags`, formatted `date`.

Not in main nav.

---

## Route `/labs/[slug]` — `app/(site)/labs/[slug]/page.tsx`

Dynamic metadata pulled from lab frontmatter. Renders MDX body via `MDXRemote` + `mdxComponents`.

Renders H1 (frontmatter.title), description, tags, date, MDX content.

Only lab file currently: `simulation-systems.mdx` (published: false).

---

## Route `/legal/privacy` — `app/(site)/legal/privacy/page.tsx`

- **metadata.title**: `Privacy Policy`
- **metadata.description**: `Privacy policy for Arka Forge website.`

Copy (verbatim):
- H1: `Privacy Policy`
- `Last updated: March 7, 2026`
- H2 `Information We Collect`
  - `We collect information that you provide directly to us, such as when you:`
  - `Fill out our contact form`
  - `Subscribe to our newsletter`
  - `Interact with our website`
- H2 `How We Use Your Information`
  - `We use the information we collect to:`
  - `Respond to your inquiries`
  - `Send you updates about our services`
  - `Improve our website and services`
- H2 `Data Protection`
  - `We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.`
- H2 `Your Rights`
  - `You have the right to access, update, or delete your personal information. To exercise these rights, please contact us at contact@arkaforge.com.`
- H2 `Cookies`
  - `We use cookies to improve your experience on our website. You can control cookies through your browser settings.`
- H2 `Changes to This Policy`
  - `We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.`
- H2 `Contact Us`
  - `If you have questions about this privacy policy, please contact us at contact@arkaforge.com.`

---

## Route `/technology` — `app/(site)/technology/page.tsx`

- **metadata.title**: `Technology`
- **metadata.description**: `Digital twins, simulation, and workforce training technology at Arka Forge.`

Nav label for this route is `Capabilities`.

Copy:
- Eyebrow: `Capabilities`
- H1: `Technology`
- Intro: `Digital twin engineering, simulation development, and XR delivery for manufacturing, robotics, energy, and defense.`

Cards:
1. Icon: Cpu — `Digital Twins` → `/technology/simulation` — `Interactive replicas of real-world systems — factories, equipment, workflows — that mirror operational reality in real time.`
2. Icon: Code — `Simulation Development` → `/technology/engine` — `End-to-end simulation engineering — Unreal, Unity, custom engines — with gamification, analytics, and multi-platform delivery.`
3. Icon: Boxes — `XR & Spatial` → `/technology/xr` — `Digital twins delivered in AR, VR, and mixed reality — across headsets, web, desktop, and mobile.`

---

## Route `/technology/engine` — `app/(site)/technology/engine/page.tsx`

- **metadata.title**: `Simulation Development`
- **metadata.description**: `Simulation engineering for digital twins — Unreal, Unity, custom engines, gamification, and multi-platform delivery.`

Copy:
- H1: `Simulation Development`
- Intro: `The engineering capability that powers our digital twins. We build interactive simulation environments using game-tech — Unreal, Unity, and custom engines — with gamification, analytics, and multi-platform delivery.`
- H2 `Development Capabilities`
  - `Unreal Engine 4/5 and Unity development`
  - `Custom simulation engines and frameworks`
  - `Real-time rendering, physics, and procedural systems`
  - `Multi-platform delivery — desktop, web, mobile, AR/VR`
- H2 `Gamification Layer`
  - `Every digital twin can include gamification mechanics that drive engagement and make training measurable:`
  - `Points, scoring, and leaderboard systems`
  - `Branching scenarios with consequence-based outcomes`
  - `Achievement tracking and progression mechanics`
  - `Performance analytics dashboards and readiness scoring`
- H2 `Enterprise-Ready`
  - `Every project is scoped for production deployment — not demos. We work directly with organizations across manufacturing, robotics, energy, and defense to ship digital twin systems that integrate into existing workflows.`

---

## Route `/technology/simulation` — `app/(site)/technology/simulation/page.tsx`

- **metadata.title**: `Digital Twins`
- **metadata.description**: `Digital twin engineering for manufacturing, robotics, energy, and defense. Interactive replicas of real-world systems for training and optimization.`

Copy:
- H1: `Digital Twins`
- Intro: `We build digital twins — interactive replicas of real-world systems that behave exactly like the real thing. Organizations use them to train workers, test scenarios, and optimize operations before touching real equipment.`
- H2 `What Is a Digital Twin`
  - `A digital twin is a virtual replica of a physical system — a factory floor, a piece of equipment, an entire workflow. It mirrors real-world behavior in real time: physics, constraints, procedures, and failure modes. When the real system changes, the twin changes with it.`
- H2 `How We Build Them`
  - `Our process follows three stages:`
  - **Digitize** — `We capture real equipment behavior, procedures, and constraints and transform them into structured digital models`
  - **Simulate** — `We build interactive environments where users can operate the twin, trigger scenarios, and see real-time feedback`
  - **Train** — `We layer gamification, scoring, and analytics so organizations can measure workforce readiness — not guess`
- H2 `Use Cases`
  - **Manufacturing** — `Assembly line twins for onboarding and safety training`
  - **Robotics** — `Simulate robotic cells and automation workflows`
  - **Energy** — `Twin critical infrastructure for operator training and incident response`
  - **Defense** — `Mission rehearsal and equipment familiarization in simulated environments`
- H2 `Gamification Layer`
  - `Every digital twin we build can include a gamification layer — scoring, leaderboards, branching scenarios, and performance analytics. This turns passive training into active, measurable engagement. Industry studies show up to 60% faster training cycles with gamified simulation.`
- H2 `Delivery`
  - `We deliver digital twins across AR/VR, desktop, web, and mobile. Each twin is built for the domain — no generic templates. Contact us to discuss your system.`

---

## Route `/technology/xr` — `app/(site)/technology/xr/page.tsx`

- **metadata.title**: `XR & Spatial`
- **metadata.description**: `AR, VR, and mixed reality training — web, desktop, and mobile delivery.`

Copy:
- H1: `XR & Spatial`
- Intro: `Training simulations delivered across AR, VR, web, desktop, and mobile. We build for Meta Quest, Apple Vision Pro, WebXR, and custom platforms.`
- H2 `Spatial Tracking`
  - `Our XR systems use advanced tracking technologies:`
  - `SLAM (Simultaneous Localization and Mapping)`
  - `Hand tracking via computer vision`
  - `Eye tracking for foveated rendering`
  - `6DOF controller support`
- H2 `Interaction Patterns`
  - `We design intuitive interaction systems:`
  - `Direct manipulation via hand tracking`
  - `Gaze-based selection`
  - `Spatial UI in 3D space`
  - `Natural gesture recognition`
- H2 `Platform Support`
  - `Our XR framework supports:`
  - `Meta Quest series`
  - `Apple Vision Pro`
  - `WebXR for browser-based experiences`
  - `Custom hardware platforms`
- H2 `Performance`
  - `XR has strict performance requirements:`
  - `90 FPS minimum for VR (120 FPS for some headsets)`
  - `Low latency to prevent motion sickness`
  - `Foveated rendering for efficiency`
  - `Optimized rendering pipelines`

---

## Route `/work` — `app/(site)/work/page.tsx`

- **metadata.title**: `Work`
- **metadata.description**: `Case studies and simulation projects from Arka Forge — digital twins, gamified training, and game-tech.`

Copy:
- H1: `Work`
- Subhead: `We're actively building digital twins for real organizations. Case studies coming as projects ship.`
- Empty state: `No work items yet. Check back soon!`
- Per-card: renders frontmatter.title, description, `Client: {client}`, tags, date.

---

## Route `/work/[slug]` — `app/(site)/work/[slug]/page.tsx`

Dynamic metadata from frontmatter. Renders:
- H1 (title)
- description paragraph
- `Client: {client}`
- `Key Metrics` block (heading `Key Metrics`, lists `{key}: {value}` for each entry in frontmatter.metrics)
- tags
- formatted date
- MDX body

Current items: `los-alamos-asu-simulation` (published: true), `gamification-platform` (published: false).

---

# UNUSED / ORPHAN COMPONENTS (not rendered by any current route)

These have hardcoded copy worth knowing for rewrite reuse:

## `components/site/capabilities-grid.tsx` — `<CapabilitiesGrid />`
- Eyebrow: `Advanced Capabilities`
- H2: `When You Need More Fidelity`
- Subhead: `For organizations where simulation accuracy, operational realism, and intelligent environments matter — we go deeper.`
- Cards:
  1. `Digital Twins` — `Accurate, interactive replicas of real systems — factories, equipment, workflows — that behave like the real thing.` (GitMerge)
  2. `Intelligent Environments` — `Simulation environments that respond dynamically to learner behavior, operational inputs, and real-world data.` (Cpu)
  3. `Performance Analytics` — `Built-in scoring, tracking, and analytics that measure readiness and surface training gaps.` (BarChart2)
  4. `Adaptive Systems` — `Training that adjusts difficulty, scenarios, and feedback based on individual learner performance.` (Sliders)

## `components/site/how-we-work.tsx` — `<HowWeWork />`
- Eyebrow: `How We Work`
- H2: `From System to Simulation`
- Steps:
  1. `Understand the System` — `We start by mapping the real workflow, environment, or system your training needs to reflect.`
  2. `Design the Training Experience` — `We define learning objectives, scenarios, and interaction models before a line of code is written.`
  3. `Build the Simulation` — `We develop the interactive experience using game technology, simulation design, and immersive delivery.`
  4. `Deploy and Refine` — `We ship, measure, and iterate — using performance data to improve training outcomes over time.`

## `components/site/services-grid.tsx` — `<ServicesGrid />`
- Eyebrow: `Services`
- H2: `Three Ways We Work With You`
- Cards:
  1. `Simulation-Based Training` — `We model your real systems, workflows, and environments — then build training simulations that let people practice inside them. Faster onboarding, fewer errors, measurable readiness.` — tag `Systems · Workflows · Equipment` (Cpu)
  2. `Game-Based Learning Experiences` — `We apply game design — branching scenarios, scoring, feedback loops, and progression — to serious learning objectives. More engaging than e-learning. More effective than passive instruction.` — tag `Scenarios · Mechanics · Analytics` (Gamepad2)
  3. `Immersive Training Environments` — `For organizations that need the highest fidelity — we build immersive environments that mirror operational reality. This includes digital twin-level simulation where system accuracy, performance analytics, and intelligent environments matter.` — tag `Digital Twins · Operational Fidelity · Intelligent Environments` (Globe) — badge `Advanced Capability`

## `components/site/systems-mindset.tsx` — `<SystemsMindset />`
- Eyebrow: `Why Arka Forge`
- H2: `A Different Kind of Training Partner`
- Subhead: `We bring game-tech thinking to real-world training problems — with the execution quality and delivery efficiency to back it up.`
- Cards:
  1. `Game-Tech Mindset` — `We apply the design principles that make games engaging to the training problems that matter most.` (Gamepad2)
  2. `Stronger Than Passive E-Learning` — `Our simulations produce measurably better engagement, retention, and readiness than slide-based instruction.` (TrendingUp)
  3. `Premium Execution, Efficient Delivery` — `High-quality output with India-based production efficiency — without compromising on craft.` (BadgeDollarSign)
  4. `Global Client Readiness` — `U.S.-accessible, globally capable. We work with organizations across markets and time zones.` (Globe2)
  5. `Digital Twin Depth When You Need It` — `For high-fidelity requirements, we go deeper — intelligent environments, operational analytics, and system-accurate simulation.` (Layers3)

## `components/site/use-cases.tsx` — `<UseCases />`
- Eyebrow: `Who It's For`
- H2 (gradient): `Built for Organizations That Train for Real`
- Subhead: `From workforce onboarding to high-stakes operational readiness — if your training needs to reflect reality, we can build it.`
- Items:
  1. `Workforce Training` — `Onboarding, upskilling, and continuous training for frontline and technical teams.` (Users)
  2. `Onboarding & Process Learning` — `Get new hires productive faster with simulation-based process walkthroughs.` (UserPlus)
  3. `Safety & Compliance` — `Train for hazardous scenarios, emergency procedures, and compliance requirements — without real-world risk.` (ShieldAlert)
  4. `Technical Education & Skilling` — `Build deep technical competency through hands-on simulation of complex systems.` (GraduationCap)
  5. `Operational Simulations` — `Rehearse critical operations, decision trees, and workflows before execution.` (GitBranch)
  6. `Equipment & Systems Familiarization` — `Let teams interact with equipment and systems digitally before physical access.` (Cpu)

## `components/site/vision-section.tsx` — `<VisionSection />`
- Eyebrow: `Vision`
- H2 (gradient): `Building Toward Intelligent Simulation`
- Body: `Today, Arka Forge is focused on winning and delivering high-value simulation and learning work. Over time, we're building toward deeper digital twin systems, intelligent environments, and broader interactive products that close the gap between training and operational reality.`

## `components/site/why-it-matters.tsx` — `<WhyItMatters />`
- Eyebrow: `Why This Matters`
- H2 (gradient): `Practice Before the Stakes Are Real`
- Subhead: `Passive training doesn't build readiness. Simulation does.`
- Cards:
  1. `Practice Before Real Stakes` — `Learners engage with real scenarios before they face them in the field.` (FlaskConical)
  2. `Safer Mistakes` — `Errors happen in the simulation, not on the job. No downtime, no risk.` (ShieldCheck)
  3. `Stronger Understanding` — `Active engagement builds deeper comprehension than passive instruction.` (Brain)
  4. `Measurable Learning` — `Performance data, scoring, and analytics show exactly what was learned.` (BarChart2)
  5. `Higher Engagement` — `Game mechanics and interactivity keep learners focused and motivated.` (Zap)
  6. `Better Decision Readiness` — `Repeated practice under simulated pressure builds confident, faster decision-making.` (Target)

## `components/site/featured-labs.tsx` / `featured-labs-client.tsx`
Eyebrow `Research`, H2 `Labs`, subhead `Technical deep-dives, research findings, and engineering insights.`
Placeholder cards (if no content):
- `Research Post Coming Soon` / `Deep-dives into simulation architecture, rendering pipelines, and systems design.`
- `Technical Breakdown Coming Soon` / `Exploring performance optimization techniques for real-time applications.`
- `Case Study Coming Soon` / `Detailed analysis of production systems and lessons learned at scale.`
CTAs: `View All` / `View All Labs`

## `components/site/featured-work.tsx` / `featured-work-client.tsx`
Eyebrow `Portfolio`, H2 `Work`, subhead `We're actively building digital twins for real organizations. Case studies coming as projects ship.`
Placeholder: `Building Digital Twins for Manufacturing` — `We're actively scoping and building digital twin systems for real manufacturing workflows. Case studies coming as projects ship.` (tags: manufacturing, in progress)
CTAs: `View All` / `View All Work`

---

# COMPONENTS — flat list with one-line descriptions

### components/site/
- `capabilities-grid.tsx` — "Advanced Capabilities" 4-card grid (Digital Twins, Intelligent Environments, Performance Analytics, Adaptive Systems). Orphan.
- `core-belief.tsx` — Centered statement section used on homepage with gradient glow ("The future of training is not more content.").
- `cta-band.tsx` — Large glass CTA band at bottom of homepage ("Build with Arka Forge").
- `featured-case.tsx` — Homepage featured case study card for Nuclear Glovebox Training Simulator.
- `featured-labs-client.tsx` — Client-side grid of featured lab posts with placeholders. Orphan on current homepage.
- `featured-labs.tsx` — Server wrapper that loads labs and renders `FeaturedLabsClient`. Orphan.
- `featured-work-client.tsx` — Client-side grid of featured work posts with placeholders. Orphan.
- `featured-work.tsx` — Server wrapper that loads work and renders `FeaturedWorkClient`. Orphan.
- `footer.tsx` — Site footer with tagline, 2 link columns, socials, copyright.
- `galaxy-background.tsx` — Fixed full-screen animated galaxy WebGL background.
- `hero.tsx` — Homepage hero section with WebGL scene, headline, CTAs.
- `how-we-work.tsx` — 4-step horizontal/vertical stepper ("From System to Simulation"). Orphan.
- `nav.tsx` — Fixed top navigation bar with logo, animated drawer, mobile sheet.
- `proof-strip.tsx` — Thin horizontal band listing credentials (Los Alamos × ASU).
- `section.tsx` — Generic padded `<section>` container wrapper with variants.
- `services-grid.tsx` — "Three Ways We Work With You" services grid. Orphan.
- `skip-to-content.tsx` — SR-only accessible skip link.
- `smooth-scroll.tsx` — Lenis smooth-scroll provider wrapper (desktop only).
- `splash-screen.tsx` — Intro splash overlay with spinning logo and "Arka Forge" wordmark.
- `structured-data.tsx` — JSON-LD Organization schema injector (duplicates root layout).
- `systems-mindset.tsx` — "Why Arka Forge" 5-card grid. Orphan.
- `use-cases.tsx` — "Built for Organizations That Train for Real" 6-card grid. Orphan.
- `vision-section.tsx` — Centered "Building Toward Intelligent Simulation" vision block. Orphan.
- `what-we-build.tsx` — Homepage 3-card capabilities grid (Simulation-Based Training, Game-Based Learning, Digital Twin Systems).
- `why-it-matters.tsx` — "Practice Before the Stakes Are Real" 6-card value grid. Orphan.

### components/ui/
- `button.tsx` — CVA-based button with variants default/destructive/outline/secondary/ghost/link and sizes.
- `card.tsx` — Glass-card composable primitives (Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter).
- `input.tsx` — Styled text input.
- `label.tsx` — Radix label wrapper.
- `sheet.tsx` — Radix dialog-based side sheet (used for mobile nav). SR text `Close`.
- `textarea.tsx` — Styled textarea.
- `toast.tsx` — Radix toast primitives (SR `Close`).
- `toaster.tsx` — Toast viewport renderer.
- `use-toast.ts` — Toast state hook.

### components/mdx/
- `mdx-components.tsx` — MDX element overrides (h2–h4, p, a, ul/ol/li, blockquote, code, pre, hr, img, custom `Callout` with variants info/warning/tip).

### components/webgl/
- `hero-scene.tsx` — Three.js/React Three Fiber hero WebGL scene (no visible copy).

### components/ (root)
- `Galaxy.jsx` — OGL shader-based galaxy background (no copy).
- `Galaxy.css` — Galaxy container styles.
- `Hyperspeed.jsx` — Hyperspeed WebGL effect (no copy; unused).
- `Hyperspeed.css` — Hyperspeed canvas styles.
- `HyperSpeedPresets.js` — Hyperspeed configuration presets (unused).

---

# DESIGN TOKENS / CSS

## `tailwind.config.ts`

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Corpa", "system-ui", "sans-serif"],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.75rem" }],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
```

## `app/globals.css`

```css
@font-face {
  font-family: "Corpa";
  src: url("/CorptademoRegular.otf") format("opentype");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 228 14% 5%;
    --foreground: 210 20% 95%;

    --card: 228 14% 7%;
    --card-foreground: 210 20% 95%;

    --popover: 228 14% 7%;
    --popover-foreground: 210 20% 95%;

    --primary: 14 100% 50%;
    --primary-foreground: 210 20% 95%;

    --secondary: 16 36% 13%;
    --secondary-foreground: 210 20% 95%;

    --muted: 16 24% 11%;
    --muted-foreground: 20 16% 64%;

    --accent: 18 100% 56%;
    --accent-foreground: 210 20% 95%;

    --destructive: 0 72% 51%;
    --destructive-foreground: 210 20% 95%;

    --border: 18 22% 18%;
    --input: 18 22% 18%;
    --ring: 14 100% 50%;

    --radius: 0.875rem;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  html,
  body {
    overflow-x: hidden;
  }
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
    position: relative;
    isolation: isolate;
  }
  h1, h2, h3, h4, h5, h6 {
    @apply font-display;
  }
}

/* ═══════════════════════════════════════════════
   GLASSMORPHISM SYSTEM
   Real frosted-glass: visible blur, luminous
   borders, inner light, depth.
   ═══════════════════════════════════════════════ */

@layer utilities {

  /* ── Nav / Footer glass ───────────────────── */
  .glass-surface {
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.08) 0%,
      rgba(255, 255, 255, 0.03) 100%
    );
    backdrop-filter: blur(24px) saturate(180%);
    -webkit-backdrop-filter: blur(24px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow:
      inset 0 1px 0 0 rgba(255, 255, 255, 0.08),
      0 4px 24px -1px rgba(0, 0, 0, 0.3);
  }

  /* ── Cards — the main glass panel ─────────── */
  .glass-card {
    position: relative;
    background: linear-gradient(
      160deg,
      rgba(255, 255, 255, 0.07) 0%,
      rgba(255, 255, 255, 0.02) 100%
    );
    backdrop-filter: blur(28px) saturate(180%);
    -webkit-backdrop-filter: blur(28px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: var(--radius);
    box-shadow:
      inset 0 1px 0 0 rgba(255, 255, 255, 0.01),
      inset 0 0 20px 0 rgba(255, 255, 255, 0.015),
      0 8px 32px -4px rgba(0, 0, 0, 0.35),
      0 2px 8px -2px rgba(0, 0, 0, 0.2);
  }

  /* Top-light highlight (the "glass edge") */
  .glass-card::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.15) 0%,
      rgba(255, 255, 255, 0.0) 40%,
      rgba(255, 255, 255, 0.0) 100%
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  .glass-card:hover {
    border-color: rgba(255, 255, 255, 0.16);
    box-shadow:
      inset 0 1px 0 0 rgba(255, 255, 255, 0.12),
      inset 0 0 20px 0 rgba(255, 255, 255, 0.02),
      0 12px 40px -4px rgba(0, 0, 0, 0.4),
      0 4px 12px -2px rgba(0, 0, 0, 0.25);
  }

  /* ── Pills / tags / badges ────────────────── */
  .glass-pill {
    background: rgba(255, 255, 255, 0.06);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: inset 0 0.5px 0 0 rgba(255, 255, 255, 0.1);
  }

  /* ── Icon containers ──────────────────────── */
  .glass-icon {
    background: linear-gradient(
      135deg,
      rgba(255, 61, 0, 0.16) 0%,
      rgba(255, 61, 0, 0.06) 100%
    );
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 61, 0, 0.3);
    box-shadow:
      inset 0 1px 0 0 rgba(255, 255, 255, 0.08),
      0 0 16px -4px rgba(255, 61, 0, 0.3);
  }

  /* ── Glow on primary actions ──────────────── */
  .glow {
    box-shadow: 0 0 20px -4px hsl(var(--primary) / 0.35),
                0 0 6px -1px hsl(var(--primary) / 0.2);
  }

  .glow-lg {
    box-shadow: 0 0 40px -4px hsl(var(--primary) / 0.4),
                0 0 12px -2px hsl(var(--primary) / 0.25);
  }

  /* ── Gradient text ────────────────────────── */
  .gradient-text {
    background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* ── Custom scrollbar ─────────────────────── */
  .scrollbar-thin {
    scrollbar-width: thin;
    scrollbar-color: hsl(var(--muted)) transparent;
  }
  .scrollbar-thin::-webkit-scrollbar { width: 6px; }
  .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
  .scrollbar-thin::-webkit-scrollbar-thumb {
    background-color: hsl(var(--border));
    border-radius: 3px;
  }
}

/* ═══════════════════════════════════════════════
   SPLASH / INTRO SCREEN
   ═══════════════════════════════════════════════ */

.splash-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: hsl(228 14% 5%);
}

.splash-overlay.splash-collapse {
  animation: splash-fade-out 600ms ease-in forwards;
}

.splash-logo-img {
  animation: splash-spin 2.4s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
}

.splash-logo-img.splash-logo-collapse {
  animation: splash-shrink 600ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.splash-container-collapse {
  animation: splash-container-out 600ms ease-in forwards;
}

@keyframes splash-spin {
  0% {
    opacity: 0;
    transform: scale(0.6) rotate(0deg);
  }
  12% {
    opacity: 1;
    transform: scale(1) rotate(45deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(360deg);
  }
}

@keyframes splash-shrink {
  0% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
    filter: blur(0px);
  }
  100% {
    opacity: 0;
    transform: scale(0.3) rotate(90deg);
    filter: blur(8px);
  }
}

@keyframes splash-container-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.splash-text {
  opacity: 0;
  animation: splash-text-in 0.6s ease-out 0.4s forwards;
}

.splash-text.splash-text-collapse {
  animation: splash-text-out 400ms ease-in forwards;
}

@keyframes splash-text-in {
  0% {
    opacity: 0;
    transform: translateY(8px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes splash-text-out {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-8px);
  }
}

@keyframes splash-fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    visibility: hidden;
  }
}

/* ═══════════════════════════════════════════════
   NAV LOGO — slow continuous rotation
   ═══════════════════════════════════════════════ */

@keyframes nav-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.nav-logo-rotate {
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: center center;
  will-change: transform;
  animation: nav-logo-spin 22s linear infinite;
  /* GPU acceleration for Windows compatibility */
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}

/* ── Reduced motion ───────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  .nav-logo-rotate {
    animation: none !important;
  }
}
```

## `components/Galaxy.css`

```css
.galaxy-container {
  width: 100%;
  height: 100%;
  position: relative;
}
```

## `components/Hyperspeed.css`

```css
#lights {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
}

canvas {
  width: 100%;
  height: 100%;
}
```

---

# CONTENT / MDX — raw verbatim

## `content/labs/simulation-systems.mdx`

```mdx
---
title: "[Sample] Building Large-Scale Simulation Systems"
description: "This is a sample post. Replace with your own content about simulation architecture and performance."
date: "2024-01-15"
tags: ["sample", "simulation", "architecture"]
published: false
---

# Sample Lab Post

This is a **sample post** to demonstrate the MDX content system. Replace this file with your own research articles and technical deep-dives.

## What goes here

- Technical research findings
- Architecture deep-dives
- Performance benchmarks and analysis
- Engineering insights and lessons learned

## How to create new posts

Create a new `.mdx` file in the `content/labs/` directory with frontmatter like above. The slug is derived from the filename.
```

## `content/work/gamification-platform.mdx`

```mdx
---
title: "Digital Twin Training Platform"
description: "Building a digital twin platform with gamification, analytics, and workforce readiness scoring."
date: "2024-03-01"
tags: ["digital twins", "simulation", "gamification", "in progress"]
published: false
client: "Confidential"
---

# Digital Twin Training Platform

We're actively building digital twin systems for real organizations. More details coming as projects ship.
```

## `content/work/los-alamos-asu-simulation.mdx`

```mdx
---
title: "Nuclear Glovebox Training Simulator"
description: "A game-modified digital twin for workforce training at Los Alamos National Laboratory — replacing passive instruction with interactive, performance-tracked simulation for high-consequence nuclear operations."
date: "2024-01-15"
tags: ["simulation", "digital-twin", "game-development", "workforce-training", "unreal-engine"]
published: true
client: "Los Alamos National Laboratory × ASU School of Manufacturing Systems and Networks"
hero: "/images/work/los-alamos-hero.jpg"
metrics:
  domain: "Nuclear Safety & Workforce Training"
  technology: "Unreal Engine 5, Custom Game Logic, Real-time Analytics"
  scope: "Environment Design, Systems Programming, UI/UX, Performance Tracking"
  type: "Simulation-Based Training / Digital Twin"
---

## The Problem

Nuclear glovebox operations are among the most precision-critical procedures in any workforce. Operators must execute specific task sequences in exact order, under physical constraints, with zero tolerance for error. The cost of mistakes — in rework, contamination risk, and safety exposure — is severe.

Traditional training for these environments relied on written procedures, walkthroughs, and supervised practice on actual equipment. This approach has three fundamental failures: it doesn't scale, it creates risk during the learning phase itself, and it provides no measurable signal on where trainees are actually struggling.

Los Alamos National Laboratory, in partnership with the ASU School of Manufacturing Systems and Networks, needed a better answer.

## What We Built

A game-modified digital twin of the nuclear glovebox environment — a fully interactive, first-person simulation where trainees practice real operational sequences inside a faithful virtual replica of the physical workspace.

This was not a video or a clickthrough tutorial. It was a real-time interactive system with physics, spatial fidelity, and built-in assessment logic.

### Environment

The virtual environment was modeled to accurately reflect the real glovebox workspace — spatial layout, equipment positioning, and operational constraints all faithfully represented. Trainees navigate and interact in first person, experiencing the same physical logic they would encounter in the real environment.

### Task Sequence Logic

The simulation tracks not just *what* a trainee does, but *when* and *in what order*. Each step in the glovebox procedure is encoded as a game event. The system detects:

- Correct task completion
- Incorrect or skipped steps
- Sequence violations
- Hesitation patterns and time-on-task metrics

This turns every training session into a structured data event — not a subjective supervisor impression.

### Performance Assessment Layer

The UI was built to surface performance data in real time and post-session. Trainers can see exactly which steps trainees are missing, which sequences they're reversing, and where they're spending disproportionate time. This moves training assessment from "supervisor felt they were ready" to "here is the objective performance record."

### Scoring and Readiness Tracking

A scoring system with weighted task completion, sequence accuracy, and time efficiency gives trainees a clear signal of readiness and gives program managers a measurable onboarding benchmark.

## Technical Scope

Everything in this simulation was built from the ground up:

- **3D environment construction** — modeled, lit, and optimized for real-time rendering
- **Custom game logic** — task sequence systems, interaction mechanics, event detection
- **UI design and implementation** — assessment overlays, scoring displays, session reports
- **Performance tracking architecture** — event logging, sequence validation, metric aggregation
- **Full systems programming** — end-to-end, from environment to data output

## Why This Matters

This project is a direct proof of the Arka Forge thesis: game technology is the most underutilized tool in high-stakes workforce training. The same systems that power real-time 3D games — physics, interaction, event logic, rendering, UI — are exactly the systems needed to build training environments that actually work.

A passive video cannot tell you that a trainee is consistently skipping step 7. A manual cannot tell you that someone takes three times longer on task 4 than their peers. A simulator built with game technology can do both — and do it at scale, without supervision, without using real equipment, and without risk.

---

*This project was developed by Arka Forge founder Harish in his individual capacity as a researcher and developer, in collaboration with the ASU School of Manufacturing Systems and Networks. It represents the direct technical foundation for Arka Forge's simulation and digital twin capabilities.*
```

---

# MDX COMPONENT OVERRIDES (`components/mdx/mdx-components.tsx`)

Custom MDX elements mapped: `h2`, `h3`, `h4`, `p`, `a` (auto external arrow `↗`), `ul`, `ol`, `li`, `blockquote`, `code`, `pre`, `hr`, `img` (via next/image, 1200×630), and custom `Callout` component with variants:
- `info` — blue theme
- `warning` — yellow theme
- `tip` — green theme

---

# ORGANIZATION SEO SCHEMA

Root layout injects JSON-LD via `generateOrganizationSchema()` from `@/lib/seo/metadata`.

---

# GLOBAL CONTACT / URL FACTS

- Primary email: `contact@arkaforge.com`
- Careers email: `careers@arkaforge.com`
- LinkedIn: `https://www.linkedin.com/company/arkaforge`
- Instagram: `https://instagram.com/arka.forge`
- Discovery call: `https://calendar.app.google/9HXdsiKfCXCPeUya9`
- Canonical URL: `https://arkaforge.com`
- Logo asset: `/arka-forge-logo.png`
- Hero work image placeholder: `/images/work/los-alamos-hero.jpg`
- Custom font asset: `/CorptademoRegular.otf` (family `Corpa`)

---

# NOTES FOR REWRITE

- Homepage is currently composed of: Hero → ProofStrip → WhatWeBuild → CoreBelief → FeaturedCase → CTABand.
- Many marketing components exist but are not mounted on any route: `CapabilitiesGrid`, `HowWeWork`, `ServicesGrid`, `SystemsMindset`, `UseCases`, `VisionSection`, `WhyItMatters`, `FeaturedLabs`, `FeaturedWork`.
- Technology index (`/technology`) is labeled `Capabilities` in the main nav.
- `/careers` and `/labs` (and the legal page) are not in primary nav.
- Privacy page "Last updated" still reads `March 7, 2026`.
- Careers page intro says founded `March 2024`.
