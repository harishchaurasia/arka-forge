import { Metadata } from "next";
import { Section } from "@/components/site/section";

export const metadata: Metadata = {
  title: "Simulation & Digital Twins",
  description: "Digital twin workflows and gamified simulation for manufacturing, robotics, energy, and defense.",
};

export default function SimulationPage() {
  return (
    <Section>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Simulation & Digital Twins</h1>
        
        <div className="prose prose-invert max-w-none mb-8">
          <p className="text-xl text-muted-foreground mb-6">
            We create digital twins of real-world workflows and convert them into
            interactive training environments. Workers practice inside simulated systems
            before touching real equipment — faster onboarding, better readiness.
          </p>

          <h2 className="text-3xl font-semibold mt-8 mb-4">Digitize</h2>
          <p>
            Complex processes and workflows transformed into structured digital models.
            We capture real equipment behavior, procedures, and constraints so simulations
            mirror operational reality.
          </p>

          <h2 className="text-3xl font-semibold mt-8 mb-4">Gamify</h2>
          <p>
            Game design principles make learning engaging and measurable:
          </p>
          <ul>
            <li>Scenario and training builders</li>
            <li>Performance analytics and evaluation</li>
            <li>Readiness scoring instead of guesswork</li>
            <li>Up to 60% faster training cycles (industry studies)</li>
          </ul>

          <h2 className="text-3xl font-semibold mt-8 mb-4">Sectors</h2>
          <p>
            We deliver across manufacturing, robotics, energy, defense, research,
            and education. Each simulation is built for the domain — no generic templates.
          </p>
        </div>
      </div>
    </Section>
  );
}
