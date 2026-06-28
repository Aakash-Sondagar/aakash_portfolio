import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import remarkGfm from "remark-gfm";
import { registerMdxFiles } from "./lib/mdx-files";
import { postDocumentSchema } from "./lib/post-schema";

const posts = defineCollection({
  name: "posts",
  directory: "content",
  include: "**/*.{md,mdx}",
  schema: postDocumentSchema,
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document, {
      remarkPlugins: [remarkGfm],
      files: registerMdxFiles,
    });

    return {
      ...document,
      slug: document._meta.path,
      mdx,
    };
  },
});

export default defineConfig({
  content: [posts],
});
