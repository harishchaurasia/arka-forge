import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
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
    ];
  },
};

export default nextConfig;
