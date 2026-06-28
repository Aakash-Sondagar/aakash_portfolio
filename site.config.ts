import type { Metadata } from "next";
import { favorites } from "./config/favorites";
import { siteContent } from "./config/site.content";

export type {
  BioPart,
  FavoriteCategory,
  FavoriteItem,
  NavItem,
  WorkItem,
} from "./config/site.types";

export const site = {
  ...siteContent,
  favorites,
} as const;

export function sitePath(path = "") {
  return `${site.url}${path}`;
}

export function pageTitle(title?: string) {
  const suffix = "Aakash Sondagar - Software Engineer";
  return title ? `${title} | ${suffix}` : suffix;
}

export function rootMetadata(): Metadata {
  return {
    title: {
      default: "Aakash Sondagar - Software Engineer",
      template: "%s | Aakash Sondagar - Software Engineer",
    },
    description: site.description,
    alternates: { canonical: site.url },
    authors: [{ name: site.name }],
    keywords: [
      "Aakash Sondagar",
      "Software Engineer",
      "Full Stack Developer",
      "Solution Architect",
      "Cloud Architect",
      "Web Development",
      "System Design",
      "Cloud Solutions",
      "Microservices",
      "Software Architecture",
      "Tech Lead",
      "Mumbai",
      "Engineering Leadership",
      "Cloud Migration",
      "Scalable Systems",
      "Backend Development",
      "Frontend Development",
      "AWS",
      "GCP",
      "React",
      "Next.js",
      "Node.js",
      "JavaScript",
      "TypeScript",
    ],
    icons: {
      icon: site.assets.favicon,
      apple: site.assets.favicon,
    },
    openGraph: {
      type: "website",
      title: "Aakash Sondagar - Software Engineer",
      description: site.description,
      url: site.url,
      images: [{ url: site.og.home, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      site: `@${site.handle}`,
      creator: `@${site.handle}`,
      title: "Aakash Sondagar - Software Engineer",
      description: site.description,
      images: [site.og.home],
    },
  };
}

export function writingIndexMetadata(): Metadata {
  return {
    title: "Writing",
    description: site.writing.description,
    alternates: { canonical: sitePath("/writing") },
    openGraph: {
      type: "website",
      title: pageTitle("Writing"),
      description: site.writing.description,
      url: sitePath("/writing"),
      images: [{ url: site.og.writing, width: 1200, height: 630 }],
    },
    twitter: {
      title: pageTitle("Writing"),
      description: site.writing.description,
      images: [site.og.writing],
    },
  };
}

export function favoritesMetadata(): Metadata {
  return {
    title: "Favorites",
    description: site.favorites.description,
    alternates: { canonical: sitePath("/favorites") },
    openGraph: {
      type: "website",
      title: pageTitle("Favorites"),
      description: site.favorites.description,
      url: sitePath("/favorites"),
      images: [{ url: site.og.home, width: 1200, height: 630 }],
    },
    twitter: {
      title: pageTitle("Favorites"),
      description: site.favorites.description,
      images: [site.og.home],
    },
  };
}
