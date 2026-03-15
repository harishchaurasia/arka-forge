import { Metadata } from "next";
import { Section } from "@/components/site/section";

export const metadata: Metadata = {
  title: "Simulation Development",
  description: "Simulation engineering for digital twins — Unreal, Unity, custom engines, gamification, and multi-platform delivery.",
};

export default function EnginePage() {
  return (
    <Section>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Simulation Development</h1>
        
        <div className="prose prose-invert max-w-none mb-8">
          <p className="text-xl text-muted-foreground mb-6">
            The engineering capability that powers our digital twins. We build interactive
            simulation environments using game-tech — Unreal, Unity, and custom engines —
            with gamification, analytics, and multi-platform delivery.
          </p>

          <h2 className="text-3xl font-semibold mt-8 mb-4">Development Capabilities</h2>
          <ul>
            <li>Unreal Engine 4/5 and Unity development</li>
            <li>Custom simulation engines and frameworks</li>
            <li>Real-time rendering, physics, and procedural systems</li>
            <li>Multi-platform delivery — desktop, web, mobile, AR/VR</li>
          </ul>

          <h2 className="text-3xl font-semibold mt-8 mb-4">Gamification Layer</h2>
          <p>
            Every digital twin can include gamification mechanics that drive engagement
            and make training measurable:
          </p>
          <ul>
            <li>Points, scoring, and leaderboard systems</li>
            <li>Branching scenarios with consequence-based outcomes</li>
            <li>Achievement tracking and progression mechanics</li>
            <li>Performance analytics dashboards and readiness scoring</li>
          </ul>

          <h2 className="text-3xl font-semibold mt-8 mb-4">Enterprise-Ready</h2>
          <p>
            Every project is scoped for production deployment — not demos. We work directly
            with organizations across manufacturing, robotics, energy, and defense to ship
            digital twin systems that integrate into existing workflows.
          </p>
        </div>
      </div>
    </Section>
  );
}
