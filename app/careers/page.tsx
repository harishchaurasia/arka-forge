import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/site/section";
import { Briefcase, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join Arka Forge — build cutting-edge game-tech and simulation systems.",
};

const openRoles = [
  {
    title: "Systems Engineer",
    department: "Engineering",
    location: "Remote / Hybrid",
    description: "Design and implement large-scale simulation systems with deep expertise in systems programming and performance optimization.",
    requirements: [
      "5+ years of systems programming experience",
      "Expertise in C++ and systems architecture",
      "Experience with simulation or game engine development",
      "Strong performance optimization skills",
    ],
  },
  {
    title: "Real-time Rendering Engineer",
    department: "Engineering",
    location: "Remote / Hybrid",
    description: "Build high-performance rendering pipelines with expertise in graphics programming, GPU optimization, and modern rendering techniques.",
    requirements: [
      "3+ years of graphics programming experience",
      "Expertise in Vulkan, DirectX 12, or Metal",
      "Strong understanding of GPU architecture",
      "Experience with shader optimization",
    ],
  },
];

const perks = [
  "Work on cutting-edge technology",
  "Collaborate with world-class engineers",
  "Autonomy and ownership over your work",
  "Competitive compensation and benefits",
  "Remote-friendly culture",
];

const process = [
  "Initial screening call",
  "Technical interview (systems design or coding)",
  "On-site or virtual interview with the team",
  "Offer and negotiation",
];

export default function CareersPage() {
  return (
    <Section>
      <div className="max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary/70 mb-3 block">
          Join Us
        </span>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Careers</h1>
        <p className="text-base text-muted-foreground mb-12 max-w-lg leading-relaxed">
          We&apos;re looking for exceptional engineers who share our passion
          for technical excellence.
        </p>

        {/* Open roles */}
        <div className="space-y-5 mb-14">
          {openRoles.map((role) => (
            <div key={role.title} className="glass-card p-6 md:p-7">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-lg font-semibold mb-1">{role.title}</h2>
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" />{role.department}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{role.location}</span>
                  </div>
                </div>
                <Button asChild size="sm">
                  <a href={`mailto:careers@arkaforge.com?subject=Application: ${role.title}`}>Apply</a>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{role.description}</p>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Requirements</h4>
                <ul className="space-y-1.5">
                  {role.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Why join + Process */}
        <div className="grid gap-5 sm:grid-cols-2 mb-10">
          <div className="glass-card p-6">
            <h2 className="text-base font-semibold mb-4">Why Join?</h2>
            <ul className="space-y-2">
              {perks.map((perk) => (
                <li key={perk} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                  {perk}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-card p-6">
            <h2 className="text-base font-semibold mb-4">Process</h2>
            <ol className="space-y-2">
              {process.map((step, i) => (
                <li key={step} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full glass-pill text-[11px] font-semibold text-primary flex items-center justify-center">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          Don&apos;t see a role that fits? Reach out to{" "}
          <a href="mailto:careers@arkaforge.com" className="text-primary hover:underline">
            careers@arkaforge.com
          </a>
          .
        </p>
      </div>
    </Section>
  );
}
