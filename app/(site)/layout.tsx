import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { Toaster } from "@/components/ui/toaster";
import { SmoothScroll } from "@/components/site/smooth-scroll";
import { SkipToContent } from "@/components/site/skip-to-content";
import { SplashScreen } from "@/components/site/splash-screen";
import { GalaxyBackground } from "@/components/site/galaxy-background";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GalaxyBackground />
      <SplashScreen />
      <SmoothScroll>
        <SkipToContent />
        <Nav />
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
        <Footer />
        <Toaster />
      </SmoothScroll>
    </>
  );
}
