import type { FavoriteCategory, FavoriteItem } from "./site.types";

export const favorites = {
  intro: `A curated list of things, apps, sites, resources and people I admire or use daily. 
  Hover over any link to get a quick preview.`,
  description: "A curated collection of apps, sites, tools, and people that Aakash Sondagar admires and uses daily.",
  searchPlaceholder: "Search links",
  categoryFilters: ["All", "Products", "People", "Sites", "Movies", "Resources"] as const,
  categoryMap: {
    Products: "Product",
    People: "People",
    Sites: "Site",
    Movies: "Movie",
    Resources: "Resource",
  } as Record<string, FavoriteCategory>,
  items: [
    {
      id: "chess.com",
      name: "Chess.com",
      description: "I live here. This is my second address.",
      url: "https://chess.com",
      category: "Site",
    },
    {
      id: "AI Learning Resources",
      name: "AI Learning Resources",
      description: "A collection of resources for learning about AI",
      url: "https://docs.google.com/document/d/1MGlfp9jyQsr5tOQpod-IbPA4kucY3YQfev7-6NGNoio/edit?tab=t.0",
      category: "Resource",
      logo: "https://ssl.gstatic.com/docs/documents/images/kix-favicon-2023q4.ico",
    }
  ] satisfies FavoriteItem[],
};
