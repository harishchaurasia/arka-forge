import { Metadata } from "next";
import { Section } from "@/components/site/section";
import { Target, Layers, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Company",
  description: "About Arka Forge — our mission, values, and engineering-first culture.",
};

const values = [
  {
    icon: Target,
    title: "Engineering-First",
    description: "We prioritize technical excellence. Every decision is made with performance, correctness, and maintainability in mind.",
  },
  {
    icon: Layers,
    title: "Systems Thinking",
    description: "Complex systems require careful architecture. We design for scalability and correctness from the ground up.",
  },
  {
    icon: BookOpen,
    title: "Continuous Learning",
    description: "Technology evolves rapidly. We invest in research, experimentation, and knowledge sharing.",
  },
];

export default function CompanyPage() {
  return (
    <Section>
      <div className="max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary/70 mb-3 block">
          About Us
        </span>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Company</h1>
        <p className="text-base text-muted-foreground leading-relaxed mb-12 max-w-lg">
          Arka Forge is a premium engineering-first game-tech &amp; simulation
          studio. We forge intelligent worlds through cutting-edge technology.
        </p>

        {/* Mission */}
        <div className="glass-card p-7 mb-8">
          <h2 className="text-lg font-semibold tracking-tight mb-3">Mission</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Build the most advanced simulation and game technology systems, enabling
            new possibilities in training, research, and entertainment.
          </p>
        </div>

        {/* Values */}
        <h2 className="text-xs font-semibold uppercase tracking-widest text-primary/70 mb-5">Values</h2>
        <div className="grid gap-5 sm:grid-cols-3 mb-10">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <div key={v.title} className="glass-card p-6">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg glass-icon mb-4">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-sm font-semibold mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
              </div>
            );
          })}
        </div>

        {/* Culture */}
        <div className="glass-card p-7">
          <h2 className="text-lg font-semibold tracking-tight mb-4">Culture</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              "Technical depth over marketing fluff",
              "Collaboration and knowledge sharing",
              "Autonomy and ownership",
              "Long-term thinking",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
