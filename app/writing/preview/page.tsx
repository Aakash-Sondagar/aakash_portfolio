import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import PreviewEditor from "./PreviewEditor";
import { getPostBySlug, isAccessiblePost, isPublicPost, resolvePostVisibility } from "@/lib/posts";

export const metadata = {
  title: "Preview",
  description: "Preview and publish writing.",
  robots: {
    index: false,
    follow: false,
  },
};

function getContentFiles() {
  const contentDir = path.join(process.cwd(), "content");
  if (!fs.existsSync(contentDir)) return [];

  return fs
    .readdirSync(contentDir)
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
    .sort()
    .map((file) => {
      const slug = file.replace(/\.(md|mdx)$/, "");
      const raw = fs.readFileSync(path.join(contentDir, file), "utf8");
      const post = getPostBySlug(slug);

      return {
        slug,
        raw,
        title: post?.title ?? slug,
        visibility: post ? resolvePostVisibility(post) : "unlisted",
        listedOnIndex: post ? isPublicPost(post) : false,
        live: post ? isAccessiblePost(post) : false,
      };
    });
}

export default function WritingPreviewPage() {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  const files = getContentFiles();

  return <PreviewEditor files={files} />;
}
