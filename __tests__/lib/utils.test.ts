import { describe, it, expect } from "vitest";
import { getFaviconUrl } from "../../lib/utils";

describe("getFaviconUrl", () => {
  it("generates correct favicon URL for valid domains", () => {
    expect(getFaviconUrl("https://chess.com")).toBe(
      "https://www.google.com/s2/favicons?domain=chess.com&sz=32"
    );
    expect(getFaviconUrl("http://example.com/some/page")).toBe(
      "https://www.google.com/s2/favicons?domain=example.com&sz=32"
    );
  });

  it("returns empty string for invalid URLs", () => {
    expect(getFaviconUrl("not-a-url")).toBe("");
    expect(getFaviconUrl("")).toBe("");
  });
});
