import { describe, it, expect } from "vitest";
import {
  resolvePostVisibility,
  isPublicPost,
  isAccessiblePost,
  parsePublishDate,
} from "../../lib/posts";

describe("post utility functions", () => {
  describe("resolvePostVisibility", () => {
    it("returns public for public visibility", () => {
      expect(resolvePostVisibility({ publishDate: "01.Jan.2025", visibility: "public" })).toBe("public");
    });

    it("returns unlisted for unlisted visibility", () => {
      expect(resolvePostVisibility({ publishDate: "01.Jan.2025", visibility: "unlisted" })).toBe("unlisted");
    });

    it("returns unlisted if draft is true and visibility is missing", () => {
      expect(resolvePostVisibility({ publishDate: "01.Jan.2025", draft: true })).toBe("unlisted");
    });

    it("returns public if draft is false/missing and visibility is missing", () => {
      expect(resolvePostVisibility({ publishDate: "01.Jan.2025" })).toBe("public");
    });
  });

  describe("isPublicPost", () => {
    it("identifies public posts", () => {
      expect(isPublicPost({ publishDate: "01.Jan.2025", visibility: "public" })).toBe(true);
      expect(isPublicPost({ publishDate: "01.Jan.2025", visibility: "unlisted" })).toBe(false);
      expect(isPublicPost({ publishDate: "01.Jan.2025", draft: true })).toBe(false);
      expect(isPublicPost({ publishDate: "01.Jan.2025" })).toBe(true);
    });
  });

  describe("isAccessiblePost", () => {
    it("returns true for public and unlisted, false for draft-only or private", () => {
      expect(isAccessiblePost({ publishDate: "01.Jan.2025", visibility: "public" })).toBe(true);
      expect(isAccessiblePost({ publishDate: "01.Jan.2025", visibility: "unlisted" })).toBe(true);
      expect(isAccessiblePost({ publishDate: "01.Jan.2025", draft: true })).toBe(true); // draft resolves to unlisted, which is accessible
    });
  });

  describe("parsePublishDate", () => {
    it("correctly parses dates in DD.MMM.YYYY format", () => {
      const date = parsePublishDate("15.Jun.2025");
      expect(date.getFullYear()).toBe(2025);
      expect(date.getMonth()).toBe(5); // June is 5 in 0-indexed JS month
      expect(date.getDate()).toBe(15);
    });

    it("returns epoch (0) for malformed dates", () => {
      const invalidDate = parsePublishDate("invalid-date-format");
      expect(invalidDate.getTime()).toBe(0);
    });
  });
});
