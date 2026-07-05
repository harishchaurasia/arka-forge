import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },
  async redirects() {
    return [
      { source: "/technology", destination: "/services", permanent: true },
      {
        source: "/technology/gamedev",
        destination: "/services/game-co-development",
        permanent: true,
      },
      {
        source: "/technology/digitaltwins",
        destination: "/work/los-alamos-asu-simulation",
        permanent: true,
      },
      {
        source: "/technology/simulation",
        destination: "/work/los-alamos-asu-simulation",
        permanent: true,
      },
      {
        source: "/technology/xr",
        destination: "/services/game-co-development",
        permanent: true,
      },
      {
        source: "/technology/learning",
        destination: "/services/interactive-products",
        permanent: true,
      },
      {
        source: "/technology/engine",
        destination: "/services/game-co-development",
        permanent: true,
      },
      { source: "/labs", destination: "/work", permanent: true },
      { source: "/labs/:slug", destination: "/work", permanent: true },
      // careers.arkaforge.com -> arkaforge.com/careers (add the subdomain in
      // Vercel Domains + a CNAME so requests reach the app; this rule then
      // redirects any path on the subdomain to the canonical careers page).
      {
        source: "/:path*",
        has: [{ type: "host", value: "careers.arkaforge.com" }],
        destination: "https://arkaforge.com/careers",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
