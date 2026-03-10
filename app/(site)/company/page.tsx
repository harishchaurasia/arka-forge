import { Metadata } from "next";
import { Section } from "@/components/site/section";
import { Target, Layers, Zap, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Company",
  description: "Arka Forge — Game-tech studio building digital twins and gamified simulation for workforce training.",
};

const values = [
  {
    icon: Target,
    title: "Engineering-First",
    description: "We prioritize technical excellence. Every decision is made with performance, correctness, and maintainability in mind.",
  },
  {
    icon: Layers,
    title: "Simulation + Game Design",
    description: "Most training platforms lack both. We combine simulation engineering with narrative game design for engaging, measurable learning.",
  },
  {
    icon: Zap,
    title: "India-First Model",
    description: "World-class engineering at competitive global pricing. A win-win for enterprise clients and skilled talent.",
  },
];

export default function CompanyPage() {
  return (
    <Section>
      <div className="max-w-3xl mx-auto text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary/70 mb-3 block">
          About Us
        </span>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Company</h1>
        <p className="text-base text-muted-foreground leading-relaxed mb-12 mx-auto max-w-lg">
          Arka Forge is a game-tech studio creating infrastructure for digital twins,
          simulation, and workforce training. We help organizations train people faster,
          safer, and more effectively.
        </p>

        {/* Mission */}
        <div className="glass-card p-7 mb-8 text-left">
          <h2 className="text-lg font-semibold tracking-tight mb-3">Mission</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Build simulation-based training systems using game technology. We digitize
            complex workflows, create gamified training environments, and deliver
            performance analytics so organizations can measure readiness — not guess.
          </p>
        </div>

        {/* The Problem */}
        <div className="glass-card p-7 mb-8 text-left">
          <h2 className="text-lg font-semibold tracking-tight mb-3">The Problem</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Training complex systems is slow, expensive, and risky. Industries like
            manufacturing, robotics, and energy rely on real equipment, shadow learning,
            and manuals — which leads to high costs, operational errors, and safety risks.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Most organizations cannot build these simulations themselves. That&apos;s
            where we come in.
          </p>
        </div>

        {/* What We Do */}
        <div className="glass-card p-7 mb-8 text-left">
          <h2 className="text-lg font-semibold tracking-tight mb-3">What We Deliver</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2.5">
              <Shield className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              Digital twins of real-world workflows
            </li>
            <li className="flex items-start gap-2.5">
              <Shield className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              Gamified training environments with assessment controls
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
        <h2 className="text-xs font-semibold uppercase tracking-widest text-primary/70 mb-5">How We Work</h2>
        <div className="grid gap-5 sm:grid-cols-3 mb-10 text-left">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <div key={v.title} className="glass-card p-6">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg glass-icon mb-4">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-sm font-semibold mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
              </div>
            );
          })}
        </div>

        {/* Team */}
        <div className="glass-card p-7 text-left">
          <h2 className="text-lg font-semibold tracking-tight mb-4">Team</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Arka Forge is led by Harish Chaurasia, with experience in full-stack
            engineering, AI/ML, simulation systems (ASU × Los Alamos National Lab),
            and game design. We operate a service-based model today and work directly
            with organizations to digitize workflows and build training simulations.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Our long-term goal is the Arka Forge Simulation Engine — a platform that
            enables enterprises to create and manage digital twin training environments
            at scale, without rebuilding from scratch each time.
          </p>
        </div>
      </div>
    </Section>
  );
}
