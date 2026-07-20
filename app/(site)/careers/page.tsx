import { Metadata } from "next";
import { Sprout, HandCoins, Boxes } from "lucide-react";
import { Section } from "@/components/site/section";
import { BackLink } from "@/components/site/back-link";
import { Reveal } from "@/components/site/reveal";
import { CareersForm } from "@/components/site/careers-form";

export const metadata: Metadata = {
  title: "Careers - ArkaForge",
  description:
    "Grow with ArkaForge. We're not just hiring - it's a two-way exchange: you bring your craft and will to learn, we invest back with real work, mentorship, and fair pay. Experience with Digital Twins is a plus.",
};

const perks = [
  {
    title: "Room to grow",
    body: "Real ownership, mentorship, and new skills on real projects.",
    icon: Sprout,
  },
  {
    title: "Fair compensation",
    body: "Strong work earns strong pay. We don't hire cheap.",
    icon: HandCoins,
  },
  {
    title: "Work that matters",
    body: "Games, engines, digital twins, and simulations.",
    icon: Boxes,
  },
];

const brings = ["Your craft", "Fresh perspective", "A will to learn"];

export default function CareersPage() {
  return (
    <Section>
      <BackLink href="/" label="Back to Home" />
      <div className="mx-auto max-w-3xl space-y-16 md:space-y-24">
        {/* Hero */}
        <Reveal>
          <header className="text-center">
            <h1 className="mb-5 text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">
              Grow with us.
              <br />
              Build what&apos;s next.
            </h1>
            <p className="mx-auto max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              ArkaForge builds digital twins for high-stakes training and
              co-develops games with studios and publishers. Small team, high
              bar, real ownership of the work. If you build things that have to
              work under pressure, you will fit here.
            </p>
          </header>
        </Reveal>

        {/* What you bring */}
        <Reveal>
          <section className="text-center">
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
              Whether you&apos;re seasoned or just starting out, bring what you
              do best.
            </p>
            <ul className="flex flex-wrap justify-center gap-2">
              {brings.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        {/* What you get */}
        <section>
          <Reveal>
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                A team that invests back
              </h2>
            </div>
          </Reveal>

          <div className="grid items-stretch gap-4 sm:grid-cols-3 lg:gap-5">
            {perks.map((perk, index) => {
              const Icon = perk.icon;
              return (
                <Reveal
                  key={perk.title}
                  delay={index * 0.08}
                  className="glass-card p-6"
                >
                  <span className="glass-icon flex h-10 w-10 items-center justify-center rounded-lg">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold tracking-tight md:text-lg">
                    {perk.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {perk.body}
                  </p>
                </Reveal>
              );
            })}
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground/70">
            Experience with Digital Twins is a plus, not a requirement.
          </p>
        </section>

        {/* Apply */}
        <section>
          <Reveal>
            <div className="mb-8 text-center">
              <h2 className="mb-3 text-2xl font-bold tracking-tight md:text-3xl">
                Let&apos;s connect
              </h2>
              <p className="mx-auto max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                Tell us what you do and how you&apos;d like to contribute. We
                review every submission.
              </p>
            </div>
          </Reveal>

          <Reveal className="glass-card p-6 md:p-8">
            <CareersForm />
          </Reveal>

          <p className="mx-auto mt-8 max-w-md text-center text-sm text-muted-foreground/80">
            No formal opening for your role? Apply anyway - we grow the team as
            the right people show up.
          </p>
        </section>
      </div>
    </Section>
  );
}
