import { bundleMDX } from "mdx-bundler";
import remarkGfm from "remark-gfm";
import { createMdxFiles } from "./mdx-files-runtime";

export async function compileMdxSource(source: string) {
  const files = await createMdxFiles();
  const { code } = await bundleMDX({
    source,
    files,
    mdxOptions(options) {
      options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkGfm];
      return options;
    },
  });

  return code;
}
