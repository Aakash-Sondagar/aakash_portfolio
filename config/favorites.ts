import type { FavoriteCategory, FavoriteItem } from "./site.types";

export const favorites = {
  intro: "A curated list of things, apps, sites, and people I admire or use daily. Hover over any link to get a quick preview.",
  description: "A curated collection of apps, sites, tools, and people that Aakash Sondagar admires and uses daily.",
  searchPlaceholder: "Search links",
  categoryFilters: ["All", "Products", "People", "Sites", "Movies"] as const,
  categoryMap: {
    Products: "Product",
    People: "People",
    Sites: "Site",
    Movies: "Movie",
  } as Record<string, FavoriteCategory>,
  items: [
    {
      id: "chess.com",
      name: "Chess.com",
      description: "I live here. This is my second address.",
      url: "https://chess.com",
      category: "Site",
    },
  ] satisfies FavoriteItem[],
};
