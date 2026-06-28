import { allPosts } from "content-collections";
import type { PostVisibility } from "@/lib/post-schema";
import { site } from "@/site.config";

const MONTHS: Record<string, number> = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};

type PostWithVisibility = {
  publishDate: string;
  slug?: string;
  visibility?: PostVisibility | string;
  draft?: boolean;
};

export function resolvePostVisibility(post: PostWithVisibility): PostVisibility {
  if (post.visibility === "public" || post.visibility === "unlisted") {
    return post.visibility;
  }

  return post.draft ? "unlisted" : "public";
}

export function isPublicPost(post: PostWithVisibility) {
  return resolvePostVisibility(post) === "public";
}

export function isAccessiblePost(post: PostWithVisibility) {
  const visibility = resolvePostVisibility(post);
  return visibility === "public" || visibility === "unlisted";
}

export function parsePublishDate(date: string): Date {
  const match = date.match(/^(\d{2})\.([A-Za-z]{3})\.(\d{4})$/);
  if (!match) return new Date(0);

  const [, day, monthLabel, year] = match;
  const month = MONTHS[monthLabel] ?? 0;
  return new Date(Number(year), month, Number(day));
}

function sortPostsByDate<T extends { publishDate: string }>(posts: T[]) {
  return [...posts].sort(
    (a, b) => parsePublishDate(b.publishDate).getTime() - parsePublishDate(a.publishDate).getTime()
  );
}

export function getAllPosts() {
  return sortPostsByDate(allPosts);
}

/** Listed on /writing, home, and further reading */
export function getPublicPosts() {
  return sortPostsByDate(allPosts.filter((post) => isPublicPost(post)));
}

/** Reachable at /writing/[slug] — public and unlisted */
export function getAccessiblePosts() {
  return sortPostsByDate(allPosts.filter((post) => isAccessiblePost(post)));
}

/** @deprecated Use getPublicPosts */
export function getPublishedPosts() {
  return getPublicPosts();
}

export function getPostBySlug(slug: string) {
  return allPosts.find((post) => post.slug === slug);
}

export function getFurtherReading(slug: string, limit = 5) {
  return getPublicPosts()
    .filter((post) => post.slug !== slug)
    .slice(0, limit);
}

export function getFeaturedPosts(limit = site.home.featuredPostsCount) {
  return getPublicPosts().slice(0, limit);
}
