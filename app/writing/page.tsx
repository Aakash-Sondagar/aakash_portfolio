import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getPublishedPosts } from "@/lib/posts";
import { site, writingIndexMetadata } from "@/site.config";

export const metadata = writingIndexMetadata();

export default function Writing() {
  const posts = getPublishedPosts();

  return (
    <div className="bg-olive-50 dark:bg-olive-950 relative size-full min-h-screen" data-name={`${site.url.replace("https://", "")}/writing`}>
      <div className="flex flex-col gap-6 items-center mx-auto px-4 py-10 w-full max-w-xl">
        <div className="animate-in w-full">
          <Navbar />
        </div>

        <p className="relative shrink-0 text-olive-800 dark:text-olive-100 text-sm/6 text-justify w-full animate-in animate-delay-1">
          {site.writing.intro}
        </p>

        <div className="animate-in animate-delay-3 w-full mt-4">
          <div className="flex flex-col gap-3 items-start relative shrink-0 w-full">
            {posts.length > 0 ? (
              posts.map((post) => (
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
              ))
            ) : (
              <p className="text-sm text-olive-500 dark:text-olive-400 italic">
                Nothing here yet. Working on some essays, check back soon!
              </p>
            )}
          </div>
        </div>

        <div className="animate-in animate-delay-4 w-full border-t border-olive-200 dark:border-olive-800 pt-6 mt-6">
          <Footer />
        </div>
      </div>
    </div>
  );
}
