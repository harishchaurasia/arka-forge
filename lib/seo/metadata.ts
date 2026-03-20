import { Metadata } from "next";
import { getLabs, getWork } from "@/lib/content/loader";

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
      siteName: "Arka Forge",
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
    name: "Arka Forge",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://arkaforge.com",
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://arkaforge.com"}/logo.png`,
    description: "Digital twin company building interactive replicas of real-world systems for workforce training and operations",
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
      name: "Arka Forge",
    },
    publisher: {
      "@type": "Organization",
      name: "Arka Forge",
      logo: {
        "@type": "ImageObject",
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://arkaforge.com"}/logo.png`,
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
