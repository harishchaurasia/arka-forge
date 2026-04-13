import { Metadata } from "next";
import { Section } from "@/components/site/section";
import { BackLink } from "@/components/site/back-link";

export const metadata: Metadata = {
  title: "Digital Twins",
  description:
    "Interactive replicas of real systems and workflows - for training, testing, and operational readiness.",
};

export default function DigitalTwinsPage() {
  return (
    <Section>
      <div className="max-w-3xl">
        <BackLink href="/technology" label="Back to Capabilities" />
        <span
          className="text-xs font-semibold uppercase
        tracking-widest text-primary/70 mb-3 block"
        >
          Capabilities
        </span>
        <h1
          className="text-3xl md:text-4xl font-bold 
        tracking-tight mb-4"
        >
          Digital Twins
        </h1>
        <p className="text-base text-muted-foreground mb-12">
          Interactive replicas of real systems and workflows that behave like
          the real thing. Train and test before the stakes are real.
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
              What It Is
            </h2>
            <p>
              A digital twin is a virtual replica of a physical system - a piece
              of equipment, a facility, a workflow. It mirrors real-world
              behavior: physics, constraints, procedures, and failure modes.
            </p>
            <p className="mt-3">
              Organizations use them to train workers, test scenarios, and
              validate procedures before committing to the physical world. No
              downtime, no risk, no guessing.
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
                - Interactive 3D replicas of real equipment, facilities, and
                workflows
              </li>
              <li>- Task sequence tracking and error detection</li>
              <li>- Scoring, analytics, and readiness reporting</li>
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
                - Energy - operator training for high-consequence infrastructure
              </li>
              <li>
                - Manufacturing - equipment operation and safety protocols
              </li>
              <li>
                - Research and defense - procedure validation and
                familiarization
              </li>
              <li>
                - Any organization where practicing on real equipment carries
                real risk
              </li>
            </ul>
          </div>

          <p className="text-sm text-muted-foreground">
            Every twin is scoped for production deployment, not a demo. If you
            have a real system, we can build it.
          </p>
        </div>
      </div>
    </Section>
  );
}
