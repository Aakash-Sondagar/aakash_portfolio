import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/**",
        ".next/**",
        "__tests__/**",
        "next.config.ts",
        "vitest.config.ts",
        "postcss.config.mjs",
        "eslint.config.mjs",
        ".content-collections/**",
      ],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
      "content-collections": path.resolve(__dirname, "./.content-collections/generated/index.js"),
    },
  },
});
