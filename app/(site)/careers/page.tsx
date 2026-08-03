import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/site/section";
import { BackLink } from "@/components/site/back-link";
import { Reveal } from "@/components/site/reveal";
import { CareersForm } from "@/components/site/careers-form";

export const metadata: Metadata = {
  title: "Careers - ArkaForge",
  description:
    "A small, senior studio building games, digital twins, and physical-AI simulation. We hire for craft and ownership, not headcount. No open reqs - send your work, and if there's a fit we'll reach out.",
};

const BAR = [
  {
    title: "Craft",
    body: "You do the work well - whether you've shipped for years or you're just starting.",
  },
  {
    title: "Ownership",
    body: "You start from what's broken and work back to the right system.",
  },
  {
    title: "Grace under pressure",
    body: "Our work fails loudly if it's wrong. You build like it matters.",
  },
  {
    title: "A will to learn",
    body: "The tools change fast. You stay ahead of them.",
  },
];

const DISCIPLINES = [
  "Game development",
  "Software engineering",
  "Digital twins & simulation",
  "AI / machine learning",
  "Narrative & world-building",
  "3D art & animation",
  "UI/UX & graphic design",
  "Interactive experiences",
];

const OFFER = [
  { title: "Real ownership", body: "Own the work end to end, mentorship along the way." },
  { title: "Fair pay", body: "Strong work earns strong pay. We don't hire cheap." },
  { title: "Work that matters", body: "Across games, engines, digital twins, and physical AI." },
  { title: "Work from anywhere", body: "A distributed studio, led from the US, on your clock." },
];

const PROCESS = [
  { step: "01", title: "Send your work", body: "Use the form. A portfolio or code beats a résumé." },
  { step: "02", title: "We review", body: "We read every application. If there's a fit, we reach out." },
  { step: "03", title: "We talk", body: "A conversation about your work and how you'd contribute." },
];

// Shared section heading — eyebrow + title, centered — so every block reads
// as part of the same page.
function Heading({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="text-center">
      <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">
        {eyebrow}
      </span>
      <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">
        {title}
      </h2>
      {sub && (
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
          {sub}
        </p>
      )}
    </div>
  );
}

export default function CareersPage() {
  return (
    <Section>
      <BackLink href="/" label="Back to Home" />
      <div className="mx-auto max-w-3xl space-y-16 md:space-y-24">
        {/* ── Hero ── */}
        <Reveal>
          <header className="text-center">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">
              Careers
            </span>
            <h1 className="mx-auto mt-4 max-w-2xl text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">
              Build things that have to{" "}
              <span className="text-primary">work.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              ArkaForge is a small, senior studio building games, digital twins,
              and physical-AI simulation. We hire for craft and ownership - not
              headcount. Seasoned or just starting, bring what you do best.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
              <Link
                href="#apply"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                Apply now <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/work"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-foreground"
              >
                See the work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </header>
        </Reveal>

        {/* ── No open reqs ── */}
        <Reveal>
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              We don&apos;t post job reqs.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              We stay small and curated, and grow the team as the right people
              show up. There&apos;s no opening to wait for - send your work, and
              if there&apos;s a fit, we&apos;ll reach out. We read every
              application.
            </p>
          </div>
        </Reveal>

        {/* ── The bar ── */}
        <section>
          <Reveal>
            <Heading eyebrow="The bar" title="What we look for." />
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {BAR.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.06} className="glass-card p-6">
                <h3 className="text-base font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Disciplines ── */}
        <section>
          <Reveal>
            <Heading
              eyebrow="Disciplines"
              title="Where you'd fit."
              sub="UE5 and Unity, real-time engine work across all of it."
            />
          </Reveal>
          <Reveal>
            <ul className="mt-8 flex flex-wrap justify-center gap-2">
              {DISCIPLINES.map((d) => (
                <li
                  key={d}
                  className="rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-foreground"
                >
                  {d}
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* ── What you get ── */}
        <section>
          <Reveal>
            <Heading eyebrow="What you get" title="A team that invests back." />
          </Reveal>
          <div className="mt-8 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {OFFER.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.06} className="glass-card p-6">
                <h3 className="text-base font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-muted-foreground/70">
            Experience with digital twins is a plus, not a requirement.
          </p>
        </section>

        {/* ── How hiring works ── */}
        <section>
          <Reveal>
            <Heading eyebrow="How hiring works" title="Three steps, no runaround." />
          </Reveal>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            {PROCESS.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.08} className="text-center">
                <span className="font-mono text-sm font-semibold text-primary">
                  {p.step}
                </span>
                <h3 className="mt-2 text-base font-semibold tracking-tight">
                  {p.title}
                </h3>
                <p className="mx-auto mt-2 max-w-[15rem] text-sm leading-relaxed text-muted-foreground">
                  {p.body}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Apply ── */}
        <section id="apply" className="scroll-mt-24">
          <Reveal>
            <Heading
              eyebrow="Apply"
              title="Show us your work."
              sub="No formal opening for your role? Apply anyway - we grow the team as the right people show up."
            />
          </Reveal>
          <Reveal className="glass-card mt-8 p-6 md:p-8">
            <CareersForm />
          </Reveal>
        </section>
      </div>
    </Section>
  );
}
