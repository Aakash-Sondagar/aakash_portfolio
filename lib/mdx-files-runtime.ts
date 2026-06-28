import fs from "fs/promises";
import path from "path";

export async function createMdxFiles() {
  const filePath = path.join(process.cwd(), "mdx-components.tsx");
  const content = await fs.readFile(filePath, "utf8");

  return {
    "@/mdx-components": content,
  };
}
