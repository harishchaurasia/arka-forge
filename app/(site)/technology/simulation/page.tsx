import { Metadata } from "next";
import { Section } from "@/components/site/section";

export const metadata: Metadata = {
  title: "Digital Twins",
  description: "Digital twin engineering for manufacturing, robotics, energy, and defense. Interactive replicas of real-world systems for training and optimization.",
};

export default function SimulationPage() {
  return (
    <Section>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Digital Twins</h1>
        
        <div className="prose prose-invert max-w-none mb-8">
          <p className="text-xl text-muted-foreground mb-6">
            We build digital twins — interactive replicas of real-world systems that
            behave exactly like the real thing. Organizations use them to train workers,
            test scenarios, and optimize operations before touching real equipment.
          </p>

          <h2 className="text-3xl font-semibold mt-8 mb-4">What Is a Digital Twin</h2>
          <p>
            A digital twin is a virtual replica of a physical system — a factory floor,
            a piece of equipment, an entire workflow. It mirrors real-world behavior in
            real time: physics, constraints, procedures, and failure modes. When the real
            system changes, the twin changes with it.
          </p>

          <h2 className="text-3xl font-semibold mt-8 mb-4">How We Build Them</h2>
          <p>
            Our process follows three stages:
          </p>
          <ul>
            <li><strong>Digitize</strong> — We capture real equipment behavior, procedures, and
            constraints and transform them into structured digital models</li>
            <li><strong>Simulate</strong> — We build interactive environments where users
            can operate the twin, trigger scenarios, and see real-time feedback</li>
            <li><strong>Train</strong> — We layer gamification, scoring, and analytics so
            organizations can measure workforce readiness — not guess</li>
          </ul>

          <h2 className="text-3xl font-semibold mt-8 mb-4">Use Cases</h2>
          <ul>
            <li><strong>Manufacturing</strong> — Assembly line twins for onboarding and safety training</li>
            <li><strong>Robotics</strong> — Simulate robotic cells and automation workflows</li>
            <li><strong>Energy</strong> — Twin critical infrastructure for operator training and incident response</li>
            <li><strong>Defense</strong> — Mission rehearsal and equipment familiarization in simulated environments</li>
          </ul>

          <h2 className="text-3xl font-semibold mt-8 mb-4">Gamification Layer</h2>
          <p>
            Every digital twin we build can include a gamification layer — scoring,
            leaderboards, branching scenarios, and performance analytics. This turns
            passive training into active, measurable engagement. Industry studies show
            up to 60% faster training cycles with gamified simulation.
          </p>

          <h2 className="text-3xl font-semibold mt-8 mb-4">Delivery</h2>
          <p>
            We deliver digital twins across AR/VR, desktop, web, and mobile. Each twin
            is built for the domain — no generic templates. Contact us to discuss your system.
          </p>
        </div>
      </div>
    </Section>
  );
}
