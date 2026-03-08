import { Metadata } from "next";
import { Section } from "@/components/site/section";

export const metadata: Metadata = {
  title: "Engine & Tooling",
  description: "Custom game engines, optimization tools, and development pipelines.",
};

export default function EnginePage() {
  return (
    <Section>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Engine & Tooling</h1>
        
        <div className="prose prose-invert max-w-none mb-8">
          <p className="text-xl text-muted-foreground mb-6">
            We build custom game engines and development tools that enable rapid iteration 
            and high performance. Our tooling suite accelerates development and ensures quality.
          </p>

          <h2 className="text-3xl font-semibold mt-8 mb-4">Custom Engines</h2>
          <p>
            Our engines are built from the ground up for specific use cases:
          </p>
          <ul>
            <li>Real-time rendering pipelines</li>
            <li>Physics simulation systems</li>
            <li>Networking and multiplayer support</li>
            <li>Platform-specific optimizations</li>
          </ul>

          <h2 className="text-3xl font-semibold mt-8 mb-4">Development Tools</h2>
          <p>
            Our tooling suite includes:
          </p>
          <ul>
            <li>Visual level editors</li>
            <li>Asset pipeline automation</li>
            <li>Performance profiling tools</li>
            <li>Debugging and diagnostics</li>
          </ul>

          <h2 className="text-3xl font-semibold mt-8 mb-4">Optimization</h2>
          <p>
            We specialize in performance optimization:
          </p>
          <ul>
            <li>GPU-driven rendering</li>
            <li>Memory management</li>
            <li>Multi-threading</li>
            <li>Platform-specific tuning</li>
          </ul>
        </div>
      </div>
    </Section>
  );
}
