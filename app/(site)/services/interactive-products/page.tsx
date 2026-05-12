import { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/site/section";
import { BackLink } from "@/components/site/back-link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Interactive Products - ArkaForge",
  description:
    "Game-engine craft outside games — gamified products, training simulations, configurators, and interactive 3D/data experiences.",
};

const shapes = [
  {
    title: "Gamified products & onboarding",
    description:
      "Progression, scoring, branching, feedback loops built into the product itself — designed as methodology, not decoration.",
  },
  {
    title: "Training simulations",
    description:
      "Interactive 3D environments modelled from real systems and workflows — task tracking, error detection, readiness reporting. Desktop, web, and VR.",
  },
  {
    title: "Configurators & interactive 3D",
    description:
      "Real-time product configurators, interactive scenes, spatial walkthroughs that respond to what the user does.",
  },
  {
    title: "Interactive data experiences",
    description:
      "Datasets and dashboards turned into things people explore, not just read.",
  },
];

export default function InteractiveProductsPage() {
  return (
    <Section>
      <div className="max-w-3xl">
        <BackLink href="/services" label="Back to Services" />
        <span className="text-xs font-semibold uppercase tracking-widest text-primary/70 mb-3 block">
          Interactive products
        </span>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Game-engine craft, outside games
        </h1>
        <p className="text-base text-muted-foreground mb-12 leading-relaxed">
          The same engineering that ships a game feature, pointed at a product.
          Things people operate — not pages they skim.
        </p>

        <div className="space-y-10 text-sm text-muted-foreground leading-relaxed">
          <div>
            <h2 className="text-base font-semibold text-foreground mb-4">
              What we build
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {shapes.map((s) => (
                <div key={s.title} className="glass-card p-5">
                  <h3 className="text-sm font-semibold text-foreground mb-2">
                    {s.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {s.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-base font-semibold text-foreground mb-3">
              Proof
            </h2>
            <p>
              We&apos;ve built and shipped gamified product work for real
              clients.{" "}
              <Link href="/work" className="text-primary hover:underline">
                See our work
              </Link>
              .
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-foreground mb-3">
              Who it&apos;s for
            </h2>
            <ul className="space-y-2">
              <li>- Companies whose product would land harder as an experience</li>
              <li>- Manufacturers, energy, and industrial operators who need operator training, safety simulations, or operational visualization</li>
              <li>- Teams replacing passive e-learning with something interactive</li>
              <li>- Technical onboarding for complex systems and procedures</li>
              <li>- Anyone who needs users to do, not just read</li>
            </ul>
          </div>

          <div>
            <h2 className="text-base font-semibold text-foreground mb-3">
              How we engage
            </h2>
            <p>
              Fixed-scope builds on shorter cycles than co-dev — typically a
              defined deliverable in weeks, not quarters. Indicative range:
              $5k–$50k depending on scope. Every engagement starts with a scoping
              call.
            </p>
          </div>

          <Link
            href="https://calendar.app.google/9HXdsiKfCXCPeUya9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
          >
            Schedule a scoping call <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </Section>
  );
}
