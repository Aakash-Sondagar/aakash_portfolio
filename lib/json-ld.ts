import { site } from "@/site.config";

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    description: site.description,
    author: personJsonLd(),
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    jobTitle: "Software Engineer",
    sameAs: [
      site.social.twitter,
      "linkedin" in site.social ? site.social.linkedin : undefined,
      "github" in site.social ? site.social.github : undefined,
    ].filter(Boolean) as string[],
  };
}

export function articleJsonLd(post: {
  title: string;
  description: string;
  publishDate: string;
  slug: string;
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    url: `${site.url}/writing/${post.slug}`,
    author: personJsonLd(),
    publisher: personJsonLd(),
    datePublished: post.publishDate,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${site.url}/writing/${post.slug}`,
    },
  };
}
