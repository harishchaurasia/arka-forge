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
    default: "Arka Forge | Forging Intelligent Worlds",
    template: "%s | Arka Forge",
  },
  description: "Arka Forge — Game-tech studio building games for learning, gamification systems, and simulation environments for workforce training. Manufacturing, robotics, energy, defense.",
  keywords: ["games for learning", "gamification", "serious games", "training games", "digital twins", "simulation", "workforce training", "game development", "XR", "training simulation"],
  authors: [{ name: "Arka Forge" }],
  creator: "Arka Forge",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://arkaforge.com",
    siteName: "Arka Forge",
    title: "Arka Forge | Forging Intelligent Worlds",
    description: "Game-tech studio for games for learning, gamification, and simulation-based workforce training.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arka Forge | Forging Intelligent Worlds",
    description: "Game-tech studio for games for learning, gamification, and simulation-based workforce training.",
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
