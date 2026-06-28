import React from "react";
import Link from "next/link";
import Navbar from "../Navbar";
import Footer from "../Footer";

export function TrafficLightSeparator() {
  return (
    <div className="flex gap-2 items-center justify-center px-0 py-2 relative shrink-0 w-full" aria-hidden="true">
      <div className="size-2">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
          <circle cx="4" cy="4" fill="#E9573F" r="4" />
        </svg>
      </div>
      <div className="size-2">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
          <circle cx="4" cy="4" fill="#F0BF2E" r="4" />
        </svg>
      </div>
      <div className="size-2">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
          <circle cx="4" cy="4" fill="#4E964E" r="4" />
        </svg>
      </div>
    </div>
  );
}

type FurtherReadingProps = {
  posts: Array<{ slug: string; title: string; publishDate: string }>;
};

export function FurtherReading({ posts }: FurtherReadingProps) {
  if (posts.length === 0) return null;

  return (
    <div className="flex flex-col gap-4 items-end relative shrink-0 w-full">
      <div className="flex gap-1 items-center relative shrink-0 w-full">
        <p className="font-medium relative shrink-0 text-olive-500 text-sm text-justify text-nowrap whitespace-pre">
          Further reading
        </p>
      </div>
      <div className="flex flex-col gap-3 items-start relative shrink-0 w-full">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/writing/${post.slug}`}
            className="flex items-center justify-between relative shrink-0 w-full group hover:opacity-70 transition-opacity"
          >
            <p className="font-semibold text-olive-800 dark:text-olive-100 text-sm group-hover:underline underline-offset-4">
              {post.title}
            </p>
            <p className="text-sm text-olive-500 dark:text-olive-400 font-mono uppercase">
              {post.publishDate}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
