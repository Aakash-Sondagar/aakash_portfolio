import { NextResponse } from "next/server";
import matter from "gray-matter";
import { z } from "zod";
import { compileMdxSource } from "@/lib/compile-mdx";
import { postFrontmatterSchema } from "@/lib/post-schema";

const requestSchema = z.object({
  source: z.string().min(1),
});

export async function POST(request: Request) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const body = requestSchema.parse(await request.json());
    const { data, content } = matter(body.source);
    const frontmatterResult = postFrontmatterSchema.safeParse(data);

    if (!frontmatterResult.success) {
      return NextResponse.json({
        ok: false,
        errors: frontmatterResult.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

    const frontmatter = frontmatterResult.data;
    const code = await compileMdxSource(content);
    const slugMatch = body.source.match(/slug:\s*(.+)$/m);
    const suggestedSlug = slugMatch?.[1]?.trim();

    return NextResponse.json({
      ok: true,
      code,
      frontmatter,
      publish: {
        slug: suggestedSlug,
        filename: suggestedSlug ? `${suggestedSlug}.mdx` : "your-slug.mdx",
        url: suggestedSlug ? `/writing/${suggestedSlug}` : "/writing/your-slug",
        visibility: frontmatter.visibility,
        listedOnIndex: frontmatter.visibility === "public",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to compile MDX";
    return NextResponse.json({ ok: false, errors: [{ path: "mdx", message }] }, { status: 400 });
  }
}
