import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { Toaster } from "@/components/ui/toaster";
import { SmoothScroll } from "@/components/site/smooth-scroll";
import { SkipToContent } from "@/components/site/skip-to-content";
import { SplashScreen } from "@/components/site/splash-screen";
import { HyperspeedBackground } from "@/components/site/hyperspeed-background";
import { GalaxyBackground } from "@/components/site/galaxy-background";

// Toggle for comparing backgrounds quickly.
// Change to "hyperspeed" if you want the hyperspeed backdrop back.
// Background components added from reactbits.dev via shadcn: @react-bits/Galaxy-JS-CSS and @react-bits/Hyperspeed-JS-CSS.
const BACKGROUND_MODE: "galaxy" | "hyperspeed" = "galaxy";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {BACKGROUND_MODE === "hyperspeed" ? <HyperspeedBackground /> : <GalaxyBackground />}
      <SplashScreen />
      <SmoothScroll>
        <SkipToContent />
        <Nav />
        <main id="main-content" className="min-h-screen">{children}</main>
        <Footer />
        <Toaster />
      </SmoothScroll>
    </>
  );
}
