import type { Metadata } from "next";
import { favoritesMetadata } from "@/site.config";

export const metadata: Metadata = favoritesMetadata();

export default function FavoritesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
