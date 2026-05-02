import { Metadata } from "next";
import { Section } from "@/components/site/section";
import { BackLink } from "@/components/site/back-link";

export const metadata: Metadata = {
  title: "XR & Spatial",
  description:
    "Training simulations delivered in VR, AR, and mixed reality - across headsets, desktop, and web.",
};

export default function XRPage() {
  return (
    <Section>
      <div className="max-w-3xl">
        <BackLink href="/technology/digitaltwins" label="Back to Digital Twins" />
        <span className="text-xs font-semibold uppercase tracking-widest text-primary/70 mb-3 block">
          A Delivery Surface for Digital Twins &amp; Games
        </span>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          XR & Spatial
        </h1>
        <p className="text-base text-muted-foreground mb-12">
          The same simulation, delivered where it needs to be. VR for full
          immersion. AR for in-context guidance. Desktop and web for
          accessibility. XR is how we ship - not a separate offering.
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
              Platform Support
            </h2>
            <ul className="space-y-2">
              <li>- Meta Quest 2, 3, and Pro</li>
              <li>- WebXR - browser-based, no headset required</li>
              <li>- Desktop - Windows and macOS</li>
              <li>- Mobile - iOS and Android</li>
            </ul>
          </div>

          <div>
            <h2
              className="text-base font-semibold 
            text-foreground mb-3"
            >
              Interaction Design
            </h2>
            <p>
              Every XR system requires a different interaction model. We design
              for the task, not the hardware:
            </p>
            <ul className="space-y-2 mt-3">
              <li>- Hand tracking and direct manipulation</li>
              <li>- Controller-based interaction</li>
              <li>- Gaze-based selection</li>
              <li>- Spatial UI anchored to real-world surfaces</li>
            </ul>
          </div>

          <div>
            <h2
              className="text-base font-semibold 
            text-foreground mb-3"
            >
              Performance
            </h2>
            <p>
              VR requires 90 FPS minimum. We build for it from the start -
              optimized rendering, LOD systems, and real-time profiling
              throughout production. Not bolted on at the end.
            </p>
          </div>

          <p>
            Platform recommendation is part of our scoping process. If you're
            not sure which delivery format fits your use case, that's what
            discovery calls are for.
          </p>
        </div>
      </div>
    </Section>
  );
}
