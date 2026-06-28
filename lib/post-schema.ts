import { z } from "zod";
import { site } from "@/site.config";

export const postVisibilitySchema = z.enum(["public", "unlisted"]);

export type PostVisibility = z.infer<typeof postVisibilitySchema>;

const postFrontmatterBaseSchema = z.object({
  title: z.string().min(1, "title is required"),
  description: z.string().min(1, "description is required"),
  publishDate: z.string().min(1, "publishDate is required"),
  modifiedDate: z.string().optional(),
  author: z.string().default(site.name),
  ogImage: z.string().url().optional(),
  keywords: z.string().optional(),
  visibility: postVisibilitySchema.optional(),
  /** @deprecated Use visibility: unlisted instead */
  draft: z.boolean().optional(),
});

export const postFrontmatterSchema = postFrontmatterBaseSchema.transform((data) => {
  const visibility =
    data.visibility ?? (data.draft ? "unlisted" : "public");

  const { draft: _draft, ...rest } = data;
  return { ...rest, visibility };
});

export const postDocumentSchema = postFrontmatterBaseSchema
  .extend({
    content: z.string(),
  })
  .transform((data) => {
    const visibility =
      data.visibility ?? (data.draft ? "unlisted" : "public");

    const { draft: _draft, ...rest } = data;
    return { ...rest, visibility };
  });

export type PostFrontmatter = z.infer<typeof postFrontmatterSchema>;
