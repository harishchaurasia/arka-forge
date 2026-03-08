import { Metadata } from "next";
import { Section } from "@/components/site/section";

export const metadata: Metadata = {
  title: "Simulation Systems",
  description: "Large-scale simulation infrastructure for training, research, and entertainment.",
};

export default function SimulationPage() {
  return (
    <Section>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Simulation Systems</h1>
        
        <div className="prose prose-invert max-w-none mb-8">
          <p className="text-xl text-muted-foreground mb-6">
            We build simulation systems that handle millions of entities in real-time, 
            enabling training platforms, research environments, and entertainment experiences.
          </p>

          <h2 className="text-3xl font-semibold mt-8 mb-4">Architecture</h2>
          <p>
            Our simulation framework uses an Entity Component System (ECS) architecture 
            that enables efficient data-oriented design. By separating data from behavior, 
            we achieve better cache locality and parallelization opportunities.
          </p>

          <h2 className="text-3xl font-semibold mt-8 mb-4">Performance</h2>
          <p>
            Our systems are optimized for real-time performance:
          </p>
          <ul>
            <li>10M+ entities simulated at 60 FPS</li>
            <li>Sub-millisecond update times for physics systems</li>
            <li>Linear scaling with entity count</li>
          </ul>

          <h2 className="text-3xl font-semibold mt-8 mb-4">Applications</h2>
          <p>
            Our simulation systems power:
          </p>
          <ul>
            <li>Military training platforms</li>
            <li>Research environments</li>
            <li>Large-scale game worlds</li>
            <li>Virtual testing environments</li>
          </ul>
        </div>
      </div>
    </Section>
  );
}
