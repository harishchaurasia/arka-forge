import { Metadata } from "next";
import { Section } from "@/components/site/section";

export const metadata: Metadata = {
  title: "Game Development & Gamification Services",
  description: "Games for learning, gamification, and simulation development — Unreal, Unity, and custom engines for enterprise training.",
};

export default function EnginePage() {
  return (
    <Section>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Game Development & Gamification</h1>
        
        <div className="prose prose-invert max-w-none mb-8">
          <p className="text-xl text-muted-foreground mb-6">
            We build games for learning — interactive experiences designed to teach, train,
            and assess. From gamified onboarding flows to full simulation games, we combine
            game design with enterprise training requirements to ship products that actually work.
          </p>

          <h2 className="text-3xl font-semibold mt-8 mb-4">Games for Learning</h2>
          <p>
            Purpose-built games where players learn by doing. Complex procedures become
            interactive missions. Repetition is built into the loop. Scoring and analytics
            track progress automatically — no manual evaluation needed.
          </p>

          <h2 className="text-3xl font-semibold mt-8 mb-4">Gamification Systems</h2>
          <ul>
            <li>Points, scoring, and leaderboard systems</li>
            <li>Branching scenarios with consequence-based outcomes</li>
            <li>Achievement tracking and progression mechanics</li>
            <li>Performance analytics dashboards and readiness scoring</li>
          </ul>

          <h2 className="text-3xl font-semibold mt-8 mb-4">Development Capabilities</h2>
          <ul>
            <li>Unreal Engine 4/5 and Unity development</li>
            <li>Custom game engines and simulation frameworks</li>
            <li>Real-time rendering, physics, and procedural systems</li>
            <li>Multi-platform delivery — desktop, web, mobile, AR/VR</li>
          </ul>

          <h2 className="text-3xl font-semibold mt-8 mb-4">Enterprise-Ready</h2>
          <p>
            Every project is scoped for production deployment — not demos. We work directly
            with organizations across manufacturing, robotics, energy, and defense to ship
            training games that integrate into existing workflows.
          </p>
        </div>
      </div>
    </Section>
  );
}
