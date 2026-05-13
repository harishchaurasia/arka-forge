import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { generateOrganizationSchema } from "@/lib/seo/metadata";
import { Analytics } from "@vercel/analytics/react";

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

export const metadata: Metadata = {
  title: {
    default: "ArkaForge — Game Engineering & Technology Studio",
    template: "%s | ArkaForge",
  },
  description:
    "ArkaForge is a game engineering & technology studio. We co-develop games with studios and publishers — UE5 and Unity, features, systems, AI, prototypes, vertical slices — and build interactive products for teams outside games. The same engine depth is behind a performance-tracked nuclear training simulator.",
  keywords: [
    "game co-development",
    "game development outsourcing",
    "Unreal Engine 5 development",
    "Unity development studio",
    "vertical slice development",
    "game prototype studio",
    "AI in games",
    "serious games",
    "interactive product development",
    "simulation-based training",
  ],
  authors: [{ name: "ArkaForge" }],
  creator: "ArkaForge",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://arkaforge.com",
    siteName: "ArkaForge",
    title: "ArkaForge — Game Engineering & Technology Studio",
    description:
      "Game co-development for studios and publishers — UE5/Unity, features, systems, AI, prototypes, vertical slices — plus interactive products for teams outside games.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ArkaForge — Game Engineering & Technology Studio",
    description:
      "Game co-development for studios and publishers — UE5/Unity, features, systems, AI, prototypes, vertical slices — plus interactive products for teams outside games.",
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
    <html lang="en" className={`${inter.variable} ${ibmPlexMono.variable}`} suppressHydrationWarning>
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
