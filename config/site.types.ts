export type FavoriteCategory = "Product" | "People" | "Site" | "Font" | "Movie";

export type FavoriteItem = {
  id: string;
  name: string;
  description: string;
  url: string;
  category: FavoriteCategory;
};

export type WorkItem = {
  id: string;
  name: string;
  description: string;
  url: string;
  present?: boolean;
  duration?: string;
  logo?: string;
};

export type NavItem = {
  href: string;
  label: string;
  key: string;
};

export type BioPart =
  | { kind: "text"; value: string }
  | { kind: "external"; label: string; href: string }
  | { kind: "internal"; label: string; href: string };
