import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/site/section";
import { BackLink } from "@/components/site/back-link";
import { Briefcase, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join ArkaForge - build digital twins, simulation systems, and workforce training products.",
};

const openRoles = [
  {
    title: "Game Developer - Unreal Engine",
    department: "Engineering",
    location: "Remote / Hybrid · India",
    description:
      "Own the development of simulation and training experiences in Unreal Engine. You'll build gameplay systems, integrate digital twin data, and ship polished interactive products for enterprise clients in manufacturing, energy, and defense.",
    requirements: [
      "2–3 years of professional experience with Unreal Engine 4 or 5",
      "Strong C++ and Blueprints proficiency",
      "Experience shipping at least one title or simulation project end-to-end",
      "Familiarity with multiplayer networking, physics, or procedural systems is a plus",
      "Comfort working in a small, fast-moving team with high ownership",
    ],
  },
  {
    title: "Game Developer - Unity",
    department: "Engineering",
    location: "Remote / Hybrid · India",
    description:
      "Design and build interactive training modules, gamified simulations, and AR/VR experiences in Unity. You'll collaborate closely with designers and clients to translate complex real-world workflows into engaging digital products.",
    requirements: [
      "2–3 years of professional Unity development (C#)",
      "Solid understanding of Unity's rendering pipeline (URP or HDRP)",
      "Experience with XR development (ARCore, ARKit, OpenXR) is a strong plus",
      "Published or shipped at least one project (game, simulation, or enterprise app)",
      "Strong debugging skills and a performance-first mindset",
    ],
  },
  {
    title: "Software Engineer",
    department: "Engineering",
    location: "Remote / Hybrid · India",
    description:
      "Build the backend services, data pipelines, and web platforms that power our simulation products. You'll work across the stack - from real-time APIs and cloud infrastructure to the React/Next.js frontends our clients interact with.",
    requirements: [
      "2–3 years of full-stack or backend software engineering experience",
      "Proficiency in TypeScript/JavaScript and at least one backend language (Python, Go, or Rust)",
      "Experience with REST/GraphQL APIs, databases (SQL and NoSQL), and cloud services (AWS or GCP)",
      "Familiarity with CI/CD, containerization, and infrastructure-as-code",
      "Bonus: experience integrating with game engines or real-time data systems",
    ],
  },
  {
    title: "Narrative Designer",
    department: "Design",
    location: "Remote · India",
    description:
      "Craft the stories, scenarios, and instructional narratives that make our training simulations immersive and effective. You'll work with game developers and subject-matter experts to design branching storylines, in-sim dialogue, and contextual tutorials that keep learners engaged.",
    requirements: [
      "2–3 years of experience in narrative design, instructional design, or game writing",
      "Proven ability to write branching dialogue and scenario scripts for interactive media",
      "Strong understanding of player motivation, learning theory, or gamification principles",
      "Experience with tools like Twine, Ink, Articy:Draft, or similar narrative middleware",
      "Excellent written communication and a portfolio of shipped narrative work",
    ],
  },
  {
    title: "Graphic Designer",
    department: "Design",
    location: "Remote · India",
    description:
      "Define the visual identity of our products and brand. You'll create UI/UX designs for simulation interfaces, marketing collateral, pitch decks, and web assets - ensuring everything we ship looks polished, modern, and unmistakably ArkaForge.",
    requirements: [
      "2–3 years of professional graphic design experience",
      "Expert-level proficiency in Figma and Adobe Creative Suite (Photoshop, Illustrator)",
      "Strong portfolio demonstrating UI design, branding, and visual communication",
      "Understanding of design systems, typography, color theory, and responsive layout",
      "Bonus: motion graphics or light video editing skills (After Effects, Premiere)",
    ],
  },
  {
    title: "3D Animator",
    department: "Art & Animation",
    location: "Remote · India",
    description:
      "Bring our simulations to life with high-quality character and mechanical animation. You'll rig and animate assets for real-time environments in Unreal and Unity - from human characters performing industrial tasks to machinery and equipment in digital twin scenarios.",
    requirements: [
      "2–3 years of professional 3D animation experience (Maya, Blender, or 3ds Max)",
      "Strong understanding of rigging, skinning, and skeletal animation pipelines",
      "Experience exporting and optimizing animations for real-time engines (Unreal or Unity)",
      "Ability to animate both organic (characters) and mechanical (machinery, robotics) subjects",
      "Bonus: experience with motion capture cleanup or procedural animation",
    ],
  },
];

const perks = [
  "Build digital twins used by real organizations in real industries",
  "Ship products for manufacturing, energy, robotics, and defense",
  "Autonomy and ownership - small team, big impact",
  "Competitive compensation",
  "Remote-friendly, India-first culture",
  "Learn and grow across simulation, game-tech, XR, and enterprise software",
];

const process = [
  "Apply via email with your resume and portfolio",
  "Introductory call with the founder",
  "Role-specific task or interview",
  "Offer and onboarding",
];

export default function CareersPage() {
  return (
    <Section>
      <BackLink href="/" label="Back to Home" />
      <div className="max-w-3xl mx-auto text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary/70 mb-3 block">
          Join Us
        </span>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
          Careers
        </h1>
        <p className="text-base text-muted-foreground mb-12 mx-auto max-w-lg leading-relaxed">
          We&apos;re an early-stage game technology studio building
          simulation-based training systems and digital twins. Remote-first,
          India-based team. We&apos;re hiring people who want real ownership on
          real projects.
        </p>

        {/* Open roles */}
        <div className="space-y-5 mb-14 text-left">
          {openRoles.map((role) => (
            <div key={role.title} className="glass-card p-6 md:p-7">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-lg font-semibold mb-1">{role.title}</h2>
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Briefcase className="h-3.5 w-3.5" />
                      {role.department}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {role.location}
                    </span>
                  </div>
                </div>
                <Button asChild size="sm">
                  <a
                    href={`mailto:careers@arkaforge.com?subject=Application - ${role.title} - ArkaForge`}
                  >
                    Apply
                  </a>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {role.description}
              </p>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Requirements
                </h4>
                <ul className="space-y-1.5">
                  {role.requirements.map((req, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Why join + Process */}
        <div className="grid gap-5 sm:grid-cols-2 mb-10 text-left">
          <div className="glass-card p-6">
            <h2 className="text-base font-semibold mb-4">Why Join?</h2>
            <ul className="space-y-2">
              {perks.map((perk) => (
                <li
                  key={perk}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                  {perk}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-card p-6">
            <h2 className="text-base font-semibold mb-4">Process</h2>
            <ol className="space-y-2">
              {process.map((step, i) => (
                <li
                  key={step}
                  className="flex items-start gap-2.5 text-sm text-muted-foreground"
                >
                  <span className="flex-shrink-0 w-5 h-5 rounded-full glass-pill text-[11px] font-semibold text-primary flex items-center justify-center">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          Don&apos;t see a role that fits? If you&apos;re strong in game tech,
          simulation, or real-time systems, reach out anyway.
        </p>
      </div>
    </Section>
  );
}
