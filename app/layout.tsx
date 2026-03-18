import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { generateOrganizationSchema } from "@/lib/seo/metadata";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Arka Forge | Forging Intelligent Worlds",
    template: "%s | Arka Forge",
  },
  description: "Arka Forge — Digital twin company building interactive replicas of real-world systems for workforce training and operations. Manufacturing, robotics, energy, defense.",
  keywords: ["digital twins", "digital twin platform", "digital twin simulation", "industrial digital twins", "simulation", "workforce training", "gamification", "training simulation", "XR", "game development"],
  authors: [{ name: "Arka Forge" }],
  creator: "Arka Forge",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://arkaforge.com",
    siteName: "Arka Forge",
    title: "Arka Forge | Forging Intelligent Worlds",
    description: "Digital twin company — interactive replicas of real-world systems for workforce training and operations.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arka Forge | Forging Intelligent Worlds",
    description: "Digital twin company — interactive replicas of real-world systems for workforce training and operations.",
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
        <SpeedInsights />
      </body>
    </html>
  );
}
