import { Metadata } from "next";
import { Section } from "@/components/site/section";
import { BackLink } from "@/components/site/back-link";

export const metadata: Metadata = {
  title: "Simulation & Training",
  description:
    "Workers practice real procedures inside digital environments before touching real equipment.",
};

export default function SimulationPage() {
  return (
    <Section>
      <div className="max-w-3xl">
        <BackLink href="/technology/digitaltwins" label="Back to Digital Twins" />
        <span className="text-xs font-semibold uppercase tracking-widest text-primary/70 mb-3 block">
          A Capability Under Digital Twins
        </span>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Simulation & Training
        </h1>
        <p className="text-base text-muted-foreground mb-12">
          Interactive environments where people practice real procedures before
          touching real equipment. The training surface that sits on top of a
          digital twin - faster onboarding, zero risk, measurable readiness.
        </p>
        <div
          className="space-y-10 text-sm 
        text-muted-foreground leading-relaxed"
        >
          <div>
            <h2
              className="text-base font-semibold 
            text-foreground mb-3"
            >
              How It Works
            </h2>
            <p>
              A training simulation mirrors a real system, workflow, or
              procedure. Users navigate, interact, and make decisions in real
              time - with physics, constraints, and consequences that reflect
              the real world.
            </p>
            <p className="mt-3">
              Unlike a video or a manual, a simulation responds. It tracks what
              users do, when they do it, and whether they do it correctly.
            </p>
          </div>

          <div>
            <h2
              className="text-base font-semibold 
            text-foreground mb-3"
            >
              What We Build
            </h2>
            <ul className="space-y-2">
              <li>
                - Interactive 3D environments modeled from real systems and
                workflows
              </li>
              <li>- Task sequence tracking and error detection</li>
              <li>- Scoring, performance analytics, and readiness reporting</li>
              <li>- Delivery across desktop, VR/AR, and web</li>
            </ul>
          </div>

          <div>
            <h2
              className="text-base font-semibold 
            text-foreground mb-3"
            >
              Built For
            </h2>
            <ul className="space-y-2">
              <li>
                - Manufacturing - assembly procedures, equipment operation,
                safety protocols
              </li>
              <li>
                - Energy - operator training for high-consequence infrastructure
              </li>
              <li>
                - Research and defense - procedure validation and
                familiarization
              </li>
              <li>
                - Corporate - technical onboarding and compliance training
              </li>
            </ul>
          </div>

          <p>
            Every simulation is scoped for production deployment, not a demo. If
            you have a real system to train on, we can build it.
          </p>
        </div>
      </div>
    </Section>
  );
}
