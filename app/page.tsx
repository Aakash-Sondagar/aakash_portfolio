import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { HomeBio } from "./components/HomeBio";
import { getFeaturedPosts } from "@/lib/posts";
import { getFaviconUrl } from "@/lib/utils";
import { site } from "@/site.config";

export default function Home() {
  const writingItems = getFeaturedPosts();

  return (
    <div id="main-content" className="bg-olive-100 dark:bg-olive-900 min-h-screen w-full flex justify-center py-10">
      <div className="flex flex-col gap-6 items-center w-full max-w-xl px-4 m-0">
        <div className="animate-in w-full">
          <Navbar />
        </div>

        <HomeBio />

        <div className="flex flex-col gap-3 items-start relative shrink-0 w-full animate-in animate-delay-5 mt-4">
          <p className="text-olive-400 dark:text-olive-600 text-sm mb-3 uppercase font-mono">Work</p>
          <div className="flex flex-col gap-3 items-start relative shrink-0 w-full">
            {site.home.work.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 relative shrink-0 w-full group py-1.5"
              >
                <div className="relative shrink-0 size-5 mt-0.5 flex items-center justify-center">
                  <img
                    alt={`${item.name} favicon`}
                    className="object-contain size-full filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-200"
                    src={item.logo || getFaviconUrl(item.url)}
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-olive-800 dark:text-olive-100 text-sm group-hover:underline underline-offset-4">
                        {item.name}
                      </p>
                      {item.present && (
                        <span className="flex size-1.5 relative shrink-0">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-lime-500"></span>
                        </span>
                      )}
                    </div>
                    {item.duration && (
                      <p className="text-[11px] text-olive-400 dark:text-olive-500 font-mono uppercase shrink-0">
                        {item.duration}
                      </p>
                    )}
                  </div>
                  {item.description && (
                    <p className="text-xs text-olive-500 dark:text-olive-400 text-left line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 items-start relative shrink-0 w-full animate-in animate-delay-6 mt-4">
          <p className="text-olive-400 dark:text-olive-600 text-sm mb-3 uppercase font-mono">Writing</p>
          <div className="flex flex-col gap-3 items-start relative shrink-0 w-full">
            {writingItems.length > 0 ? (
              writingItems.map((post) => (
                <Link
                  key={post.slug}
                  href={`/writing/${post.slug}`}
                  className="flex items-center justify-between relative shrink-0 w-full group"
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
          {writingItems.length > 0 && (
            <Link
              href="/writing"
              className="font-normal relative shrink-0 text-olive-500 hover:text-olive-800 dark:text-olive-500 hover:dark:text-olive-100 text-sm text-justify text-nowrap whitespace-pre hover:underline underline-offset-4 transition-all mt-2"
            >
              View all &rarr;
            </Link>
          )}
        </div>

        <div className="animate-in animate-delay-7 w-full border-t border-olive-200 dark:border-olive-800 pt-6 mt-6">
          <Footer />
        </div>
      </div>
    </div>
  );
}
