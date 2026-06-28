/* eslint-disable react-hooks/static-components */
"use client";

import React from "react";
import { useMDXComponent } from "@content-collections/mdx/react";
import { mdxComponents } from "@/mdx-components";
import { MermaidRenderer } from "./MermaidRenderer";

type ClientPostBodyProps = {
  code: string;
};

export function ClientPostBody({ code }: ClientPostBodyProps) {
  const Component = useMDXComponent(code);

  return (
    <div className="article-content mt-4 w-full text-left">
      <Component components={mdxComponents} />
      <MermaidRenderer />
    </div>
  );
}
