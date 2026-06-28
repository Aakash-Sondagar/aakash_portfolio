import React from "react";
import { MDXContent } from "@content-collections/mdx/react";
import { mdxComponents } from "@/mdx-components";
import { MermaidRenderer } from "./MermaidRenderer";

type PostBodyProps = {
  code: string;
};

export function PostBody({ code }: PostBodyProps) {
  return (
    <div className="article-content mt-4 w-full text-left">
      <MDXContent code={code} components={mdxComponents} />
      <MermaidRenderer />
    </div>
  );
}
