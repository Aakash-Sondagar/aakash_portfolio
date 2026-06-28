import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { PostBody } from "../../components/writing/PostBody";
import { FurtherReading, TrafficLightSeparator } from "../../components/writing/ArticleChrome";
import { getAccessiblePosts, getFurtherReading, getPostBySlug, isAccessiblePost, resolvePostVisibility } from "@/lib/posts";
import { pageTitle, site, sitePath } from "@/site.config";

export async function generateStaticParams() {
  return getAccessiblePosts().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);

  if (!post || !isAccessiblePost(post)) {
    return { title: pageTitle("Article") };
  }

  const visibility = resolvePostVisibility(post);

  return {
    title: pageTitle(post.title),
    description: post.description,
    ...(visibility === "unlisted"
      ? { robots: { index: false, follow: false } }
      : {}),
    alternates: {
      canonical: sitePath(`/writing/${slug}`),
    },
    openGraph: {
      type: "article",
      title: pageTitle(post.title),
      description: post.description,
      url: sitePath(`/writing/${slug}`),
      siteName: site.name,
      images: [
        {
          url: post.ogImage || site.og.default,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle(post.title),
      description: post.description,
      images: [post.ogImage || site.og.default],
    },
  };
}

export default async function ArticlePage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);

  if (!post || !isAccessiblePost(post)) {
    notFound();
  }

  return (
    <div className="bg-olive-50 dark:bg-olive-950 relative size-full min-h-screen">
      <div className="flex flex-col gap-6 items-center mx-auto px-4 py-10 w-full max-w-xl">
        <div className="animate-in w-full">
          <Navbar />
        </div>

        <div className="animate-in animate-delay-1 w-full text-left">
          <p className="relative shrink-0 text-sm text-olive-500 dark:text-olive-400 font-mono uppercase">
            {post.publishDate}
          </p>
        </div>

        <div className="animate-in animate-delay-1 w-full text-left">
          <h1 className="font-serif italic relative shrink-0 text-olive-800 dark:text-olive-100 text-4xl w-full">
            {post.title}
          </h1>
        </div>

        <div className="animate-in animate-delay-2 w-full">
          <PostBody code={post.mdx} />
        </div>

        <div className="animate-in animate-delay-3 w-full">
          <TrafficLightSeparator />
        </div>

        <div className="animate-in animate-delay-4 w-full">
          <FurtherReading posts={getFurtherReading(slug)} />
        </div>

        <div className="animate-in animate-delay-5 w-full">
          <TrafficLightSeparator />
        </div>

        <div className="animate-in animate-delay-6 w-full">
          <Footer />
        </div>
      </div>
    </div>
  );
}
