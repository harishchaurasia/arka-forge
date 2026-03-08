import { Metadata } from "next";
import { Section } from "@/components/site/section";

export const metadata: Metadata = {
  title: "XR / Spatial",
  description: "Immersive experiences for AR, VR, and mixed reality platforms.",
};

export default function XRPage() {
  return (
    <Section>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">XR / Spatial</h1>
        
        <div className="prose prose-invert max-w-none mb-8">
          <p className="text-xl text-muted-foreground mb-6">
            We build immersive XR experiences that leverage spatial computing, 
            hand tracking, and advanced rendering techniques.
          </p>

          <h2 className="text-3xl font-semibold mt-8 mb-4">Spatial Tracking</h2>
          <p>
            Our XR systems use advanced tracking technologies:
          </p>
          <ul>
            <li>SLAM (Simultaneous Localization and Mapping)</li>
            <li>Hand tracking via computer vision</li>
            <li>Eye tracking for foveated rendering</li>
            <li>6DOF controller support</li>
          </ul>

          <h2 className="text-3xl font-semibold mt-8 mb-4">Interaction Patterns</h2>
          <p>
            We design intuitive interaction systems:
          </p>
          <ul>
            <li>Direct manipulation via hand tracking</li>
            <li>Gaze-based selection</li>
            <li>Spatial UI in 3D space</li>
            <li>Natural gesture recognition</li>
          </ul>

          <h2 className="text-3xl font-semibold mt-8 mb-4">Platform Support</h2>
          <p>
            Our XR framework supports:
          </p>
          <ul>
            <li>Meta Quest series</li>
            <li>Apple Vision Pro</li>
            <li>WebXR for browser-based experiences</li>
            <li>Custom hardware platforms</li>
          </ul>

          <h2 className="text-3xl font-semibold mt-8 mb-4">Performance</h2>
          <p>
            XR has strict performance requirements:
          </p>
          <ul>
            <li>90 FPS minimum for VR (120 FPS for some headsets)</li>
            <li>Low latency to prevent motion sickness</li>
            <li>Foveated rendering for efficiency</li>
            <li>Optimized rendering pipelines</li>
          </ul>
        </div>
      </div>
    </Section>
  );
}
