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
    default: "Arka Forge - Simulation-Based Training & Digital Twins",
    template: "%s | Arka Forge",
  },
  description: "Arka Forge builds simulation-based training systems and digital twins using game technology - for organizations where the gap between training and reality carries real cost.",
  keywords: ["simulation-based training", "digital twins", "game-based learning", "workforce training", "unreal engine", "serious games", "industrial simulation", "XR training"],
  authors: [{ name: "Arka Forge" }],
  creator: "Arka Forge",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://arkaforge.com",
    siteName: "Arka Forge",
    title: "Arka Forge - Simulation-Based Training & Digital Twins",
    description: "Simulation-based training and digital twins - built with game technology, for organizations where the gap between training and reality carries real cost.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arka Forge - Simulation-Based Training & Digital Twins",
    description: "Simulation-based training and digital twins - built with game technology, for organizations where the gap between training and reality carries real cost.",
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
