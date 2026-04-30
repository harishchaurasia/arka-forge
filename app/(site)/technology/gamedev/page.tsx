import { Metadata } from "next";
import { Section } from "@/components/site/section";

export const metadata: Metadata = {
  title: "Game Development",
  description:
    "Full-cycle game and interactive experience development for studios and publishers who need a high-quality execution partner.",
};

export default function GameDevPage() {
  return (
    <Section>
      <div className="max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary/70 mb-3 block">
          Capabilities
        </span>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Game Development
        </h1>
        <p className="text-base text-muted-foreground mb-12">
          Full-cycle game and interactive experience development for studios
          and publishers who need a high-quality execution partner. We
          co-develop - you own the IP.
        </p>
        <div className="space-y-10 text-sm text-muted-foreground leading-relaxed">
          <div>
            <h2 className="text-base font-semibold text-foreground mb-3">
              What We Do
            </h2>
            <p>
              We partner with game studios and publishers as a full-service
              co-development partner. You bring the vision. We bring the
              execution capability - from systems and gameplay to art, UI, and
              delivery.
            </p>
            <p className="mt-3">
              This is not outsourcing as a commodity. It is a high-quality
              execution partnership built on the same technical standards we
              apply to our simulation and digital twin work.
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-foreground mb-3">
              What We Build
            </h2>
            <ul className="space-y-2">
              <li>- Full game development - concept to ship</li>
              <li>- Feature and systems development for existing titles</li>
              <li>- Interactive experiences and serious games</li>
              <li>- Unreal Engine 5 and Unity development</li>
              <li>- Art, animation, UI, and technical direction</li>
            </ul>
          </div>

          <div>
            <h2 className="text-base font-semibold text-foreground mb-3">
              Who It&apos;s For
            </h2>
            <ul className="space-y-2">
              <li>- Studios that need additional development capacity</li>
              <li>- Publishers managing multiple titles simultaneously</li>
              <li>
                - Companies building interactive experiences outside traditional
                game genres
              </li>
              <li>
                - Teams that need UE5 or Unity expertise without growing
                headcount
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-base font-semibold text-foreground mb-3">
              How We Work
            </h2>
            <p>
              We embed into your pipeline. Your tools, your processes, your
              standards. We match your quality bar and your delivery cadence.
              No handoff friction.
            </p>
          </div>

          <p>
            Every engagement starts with a scoping call. We define the work,
            the timeline, and the delivery standard before anything begins.
          </p>
        </div>
      </div>
    </Section>
  );
}
