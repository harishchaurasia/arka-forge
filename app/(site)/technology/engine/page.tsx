import { Metadata } from "next";
import { Section } from "@/components/site/section";

export const metadata: Metadata = {
  title: "Game Development Services",
  description: "Game-tech and simulation engineering for enterprise. Custom engines, tooling, and development pipelines.",
};

export default function EnginePage() {
  return (
    <Section>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Game Development Services</h1>
        
        <div className="prose prose-invert max-w-none mb-8">
          <p className="text-xl text-muted-foreground mb-6">
            We operate a service-based model, working directly with organizations to
            digitize complex workflows and turn them into training simulations. We deliver
            gamification, game design, and simulation development — with measurable outcomes.
          </p>

          <h2 className="text-3xl font-semibold mt-8 mb-4">What We Build</h2>
          <p>
            Simulation environments that allow teams to practice tasks repeatedly while
            tracking performance and errors. No more guesswork — real readiness data.
          </p>

          <h2 className="text-3xl font-semibold mt-8 mb-4">Capabilities</h2>
          <ul>
            <li>Custom game engines and simulation frameworks</li>
            <li>Real-time rendering and physics systems</li>
            <li>Development pipelines and tooling</li>
            <li>Optimization for desktop, web, and mobile</li>
          </ul>

          <h2 className="text-3xl font-semibold mt-8 mb-4">Enterprise-Ready</h2>
          <p>
            We work with paying clients across sectors. Each project is scoped for
            production deployment — not demos. Contact us to discuss your requirements.
          </p>
        </div>
      </div>
    </Section>
  );
}
