import { Nav } from "@/components/site/nav";
import { ThemeProvider } from "@/components/site/theme-provider";
import { Footer } from "@/components/site/footer";
import { Toaster } from "@/components/ui/toaster";
import { SmoothScroll } from "@/components/site/smooth-scroll";
import { SkipToContent } from "@/components/site/skip-to-content";
import { GalaxyBackground } from "@/components/site/galaxy-background";
import { SplashScreen } from "@/components/site/splash-screen";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
}
