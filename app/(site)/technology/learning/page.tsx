import { Metadata } from "next";
import { Section } from "@/components/site/section";
import { BackLink } from "@/components/site/back-link";

export const metadata: Metadata = {
  title: "Game-Based Learning",
  description:
    "Game design applied to serious training objectives - branching scenarios, scoring, feedback loops, and measurable skill progression.",
};

export default function LearningPage() {
  return (
    <Section>
      <div className="max-w-3xl">
        <BackLink href="/technology/gamedev" label="Back to Game Co-Development" />
        <span className="text-xs font-semibold uppercase tracking-widest text-primary/70 mb-3 block">
          A Capability Under Game Co-Development
        </span>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Game-Based Learning
        </h1>
        <p className="text-base text-muted-foreground mb-12">
          Game design applied to serious learning objectives. Not gamification
          as decoration - as methodology. One of the four shapes of game
          co-development we ship.
        </p>

        <div className="space-y-10 text-sm text-muted-foreground leading-relaxed">
          <div>
            <h2 className="text-base font-semibold text-foreground mb-3">
              What It Is
            </h2>
            <p>
              Game-based learning is not adding a leaderboard to a slide deck.
              It is designing the learning experience itself around game
              principles - scenarios with real consequences, decisions that
              matter, feedback that responds to what you do.
            </p>
            <p className="mt-3">
              Passive training asks people to absorb and remember. Game-based
              learning asks people to decide, act, and face consequences. The
              second approach builds retention, surfaces skill gaps, and
              generates performance data. The first generates completion
              certificates.
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-foreground mb-3">
              What We Build
            </h2>
            <ul className="space-y-2">
              <li>
                - Branching scenario simulations with real decision
                consequences
              </li>
              <li>
                - Scoring and progression mechanics tied to actual learning
                objectives
              </li>
              <li>
                - Performance analytics that surface where people struggle
              </li>
              <li>- Multi-platform delivery - desktop, web, and VR</li>
            </ul>
          </div>

          <div>
            <h2 className="text-base font-semibold text-foreground mb-3">
              Built For
            </h2>
            <ul className="space-y-2">
              <li>- Corporate training replacing passive e-learning</li>
              <li>
                - Compliance training that needs to prove comprehension, not
                just completion
              </li>
              <li>- Technical onboarding for complex systems and procedures</li>
              <li>
                - Professional education requiring measurable skill progression
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
