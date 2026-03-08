import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { generateOrganizationSchema } from "@/lib/seo/metadata";

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
  description: "Premium engineering-first game-tech & simulation studio. Forging intelligent worlds through cutting-edge technology.",
  keywords: ["game engine", "simulation", "XR", "spatial computing", "game technology", "simulation systems"],
  authors: [{ name: "Arka Forge" }],
  creator: "Arka Forge",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://arkaforge.com",
    siteName: "Arka Forge",
    title: "Arka Forge | Forging Intelligent Worlds",
    description: "Premium engineering-first game-tech & simulation studio.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arka Forge | Forging Intelligent Worlds",
    description: "Premium engineering-first game-tech & simulation studio.",
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
      </body>
    </html>
  );
}
