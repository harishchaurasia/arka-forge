import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { generateOrganizationSchema } from "@/lib/seo/metadata";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://arkaforge.com"),
  title: {
    default: "ArkaForge - Video Games Engineering & Technology Studio",
    template: "%s | ArkaForge",
  },
  description:
    "ArkaForge is a video games engineering & technology studio. We build digital twins for high-stakes training - real-time, game-engine, performance-tracked, the depth behind a nuclear glovebox simulator - and co-develop games with studios and publishers in UE5 and Unity: features, systems, AI, prototypes, vertical slices. Interactive products for teams outside games, too.",
  keywords: [
    "game co-development",
    "game development outsourcing",
    "Unreal Engine 5 development",
    "Unity development studio",
    "vertical slice development",
    "AI in games",
    "digital twins",
    "game-engine training simulation",
    "simulation-based training",
    "interactive product development",
  ],
  authors: [{ name: "ArkaForge" }],
  creator: "ArkaForge",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://arkaforge.com",
    siteName: "ArkaForge",
    title: "ArkaForge - Video Games Engineering & Technology Studio",
    description:
      "Digital twins for high-stakes training, and game co-development for studios and publishers - plus interactive products for teams outside games.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ArkaForge - Video Games Engineering & Technology Studio",
    description:
      "Digital twins for high-stakes training, and game co-development for studios and publishers - plus interactive products for teams outside games.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = generateOrganizationSchema();

  return (
    <html
      lang="en"
      className={`${inter.variable} ${ibmPlexMono.variable} ${bricolage.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className="antialiased scrollbar-thin">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
