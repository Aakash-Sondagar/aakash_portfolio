import { describe, it, expect } from "vitest";
import { postFrontmatterSchema } from "../../lib/post-schema";

describe("postFrontmatterSchema", () => {
  it("validates valid frontmatter and default fields", () => {
    const validData = {
      title: "My Blog Post",
      description: "A description of my blog post",
      publishDate: "01.Jun.2025",
    };

    const parsed = postFrontmatterSchema.safeParse(validData);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.title).toBe("My Blog Post");
      expect(parsed.data.description).toBe("A description of my blog post");
      expect(parsed.data.publishDate).toBe("01.Jun.2025");
      expect(parsed.data.visibility).toBe("public"); // Default is public
    }
  });

  it("fails validation if required fields are missing", () => {
    const invalidData = {
      title: "",
      publishDate: "01.Jun.2025",
    };

    const parsed = postFrontmatterSchema.safeParse(invalidData);
    expect(parsed.success).toBe(false);
  });

  it("handles draft flag correctly by converting to unlisted visibility", () => {
    const draftData = {
      title: "Draft Post",
      description: "My draft",
      publishDate: "01.Jun.2025",
      draft: true,
    };

    const parsed = postFrontmatterSchema.safeParse(draftData);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.visibility).toBe("unlisted");
    }
  });

  it("honors explicit visibility setting over draft flags", () => {
    const data = {
      title: "Explicit Unlisted",
      description: "Explicitly unlisted",
      publishDate: "01.Jun.2025",
      visibility: "unlisted",
    };

    const parsed = postFrontmatterSchema.safeParse(data);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.visibility).toBe("unlisted");
    }
  });
});
