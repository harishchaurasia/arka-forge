import { Metadata } from "next";
import { Section } from "@/components/site/section";
import { Target, Layers, Zap, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Company",
  description:
    "Arka Forge — Digital twin company building interactive replicas of real-world systems for workforce training and operations.",
};

const values = [
  {
    icon: Target,
    title: "Engineering-First",
    description:
      "We prioritize technical excellence. Every decision is made with performance, correctness, and maintainability in mind.",
  },
  {
    icon: Layers,
    title: "Digital Twin Engineering",
    description:
      "We combine simulation engineering with game-tech to build digital twins that are interactive, measurable, and true to reality.",
  },
  {
    icon: Zap,
    title: "India-First Model",
    description:
      "World-class engineering at competitive global pricing. A win-win for enterprise clients and skilled talent.",
  },
];

export default function CompanyPage() {
  return (
    <Section>
      <div className="max-w-3xl mx-auto text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary/70 mb-3 block">
          About Us
        </span>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
          Company
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed mb-12 mx-auto max-w-lg">
          Arka Forge is a digital twin company. We build interactive replicas of
          real-world systems that let organizations train workers, test
          scenarios, and optimize operations — before touching real equipment.
        </p>

        {/* Mission */}
        <div className="glass-card p-7 mb-8 text-left">
          <h2 className="text-lg font-semibold tracking-tight mb-3">Mission</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Build digital twins that mirror real-world systems. We digitize
            complex workflows into interactive simulation environments — layered
            with gamification, analytics, and scoring — so organizations can
            measure workforce readiness, not guess.
          </p>
        </div>

        {/* The Problem */}
        <div className="glass-card p-7 mb-8 text-left">
          <h2 className="text-lg font-semibold tracking-tight mb-3">
            The Problem
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Training complex systems is slow, expensive, and risky. Industries
            like manufacturing, robotics, and energy rely on real equipment,
            shadow learning, and manuals — which leads to high costs,
            operational errors, and safety risks.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Most organizations cannot build these simulations themselves.
            That&apos;s where we come in.
          </p>
        </div>

        {/* What We Do */}
        <div className="glass-card p-7 mb-8 text-left">
          <h2 className="text-lg font-semibold tracking-tight mb-3">
            What We Deliver
          </h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2.5">
              <Shield className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              Digital twins of real-world systems — factories, equipment,
              workflows
            </li>
            <li className="flex items-start gap-2.5">
              <Shield className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              Simulation-based training environments for workforce readiness
            </li>
            <li className="flex items-start gap-2.5">
              <Shield className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              Gamification layer — scoring, leaderboards, branching scenarios
            </li>
            <li className="flex items-start gap-2.5">
              <Shield className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              Delivered across AR/VR, desktop, web, and mobile
            </li>
            <li className="flex items-start gap-2.5">
              <Shield className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              Performance analytics and readiness scoring
            </li>
          </ul>
        </div>

        {/* Values */}
        <h2 className="text-xs font-semibold uppercase tracking-widest text-primary/70 mb-5">
          How We Work
        </h2>
        <div className="grid gap-5 sm:grid-cols-3 mb-10 text-left">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <div key={v.title} className="glass-card p-6">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg glass-icon mb-4">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-sm font-semibold mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {v.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Team */}
        <div className="glass-card p-7 text-left">
          <h2 className="text-lg font-semibold tracking-tight mb-4">Team</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Arka Forge was founded by Harish Chaurasia in March 2024. We're a
            small, focused team building digital twins and simulation systems
            for real organizations.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We're actively hiring engineers, designers, and simulation
            specialists. If you're interested in building digital twins and
            training simulations,{" "}
            <a href="/careers" className="text-primary hover:underline">
              we're hiring
            </a>
            .
          </p>
        </div>
      </div>
    </Section>
  );
}
