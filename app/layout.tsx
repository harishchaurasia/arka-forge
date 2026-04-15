import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { generateOrganizationSchema } from "@/lib/seo/metadata";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ArkaForge - Game Technology Studio",
    template: "%s | ArkaForge",
  },
  description:
    "ArkaForge builds game based learning,simulation-based training systems and digital twins using game technology - for organizations where the gap between training and reality carries real cost.",
  keywords: [
    "simulation-based training",
    "game based learning",
    "digital twins",
    "digital twin simulation",
    "digital twin training",
    "digital twin development",
    "digital twin engineering",
    "digital twin architecture",
    "digital twin systems",
    "digital twin architecture",
    "game-based learning",
    "workforce training",
    "unreal engine",
    "unity",
    "unreal",
    "unity3d",
    "unreal engine 5",
    "unity 5",
    "unreal engine 4",
    "unity 4",
    "serious games",
    "industrial simulation",
    "XR training",
    "game technology",
    "game development",
    "game design",
    "game programming",
    "game engineering",
    "game architecture",
    "game systems",
    "game architecture",
    "game development studio",
    "game development company",
    "game development agency",
    "game development studio",
    "game development company",
    "game development agency",
    "game development studio",
    "game development company",
    "game development agency",
    "building information modeling",
    "BIM",
    "BIM modeling",
    "BIM design",
    "BIM programming",
    "BIM engineering",
    "BIM architecture",
    "BIM systems",
    "BIM architecture",
    "BIM development",
    "BIM company",
    "BIM agency",
    "BIM studio",
    "BIM development studio",
    "BIM development company",
    "BIM development agency",
    "Indian Game Studio",
    "Indian Game Development Studio",
    "Indian Game Development Company",
    "Indian Game Development Agency",
    "Indian Game Development Studio",
    "Indian Game Development Company",
    "Indian Game Development Agency",
    "Indian Game Development Studio",
    "Indian Game Development Company",
    "Indian Deep tech Studio",
    "Indian Deep tech Development Studio",
    "Indian Deep tech Development Company",
    "Indian Deep tech Development Agency",
    "Indian Deep tech Studio",
    "Indian Deep tech Development Studio",
    "Indian Deep tech Development Company",
    "Indian Deep tech Development Agency",
    "Indian Deep tech Studio",
  ],
  authors: [{ name: "ArkaForge" }],
  creator: "ArkaForge",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://arkaforge.com",
    siteName: "ArkaForge",
    title: "ArkaForge - Simulation-Based Training & Digital Twins",
    description:
      "Game based Learning, Simulation-based training and digital twins - built with game technology, for organizations where the gap between training and reality carries real cost.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ArkaForge - Simulation-Based Training & Digital Twins",
    description:
      "Simulation-based training and digital twins - built with game technology, for organizations where the gap between training and reality carries real cost.",
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
    <html lang="en" className={inter.variable} suppressHydrationWarning>
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
      </body>
    </html>
  );
}
