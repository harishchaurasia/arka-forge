import { Metadata } from "next";

export function generateSiteMetadata(
  title: string,
  description: string,
  path: string = ""
): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://arkaforge.com";
  const url = `${baseUrl}${path}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "ArkaForge",
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ArkaForge",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://arkaforge.com",
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://arkaforge.com"}/arka-forge-logo.png`,
    description:
      "ArkaForge is a video games engineering & technology studio - game co-development for studios and publishers (UE5/Unity, features, systems, AI, prototypes, vertical slices) and digital twins for high-stakes training, plus interactive products for teams outside games.",
    knowsAbout: [
      "Game co-development",
      "Unreal Engine 5",
      "Unity",
      "Digital twins",
      "Simulation-based training",
      "AI in games",
      "Interactive products",
    ],
    sameAs: [
      "https://www.linkedin.com/company/arkaforge",
      "https://instagram.com/arka.forge",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "contact@arkaforge.com",
      contactType: "Customer Service",
    },
  };
}

export async function generateArticleSchema(
  title: string,
  description: string,
  date: string,
  url: string,
  image?: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: date,
    author: {
      "@type": "Organization",
      name: "ArkaForge",
    },
    publisher: {
      "@type": "Organization",
      name: "ArkaForge",
      logo: {
        "@type": "ImageObject",
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://arkaforge.com"}/arka-forge-logo.png`,
      },
    },
    image: image
      ? {
          "@type": "ImageObject",
          url: image,
        }
      : undefined,
    url,
  };
}

export async function generateBreadcrumbSchema(paths: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: paths.map((path, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: path.name,
      item: path.url,
    })),
  };
}
