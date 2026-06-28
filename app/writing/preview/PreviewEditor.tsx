"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { ClientPostBody } from "../../components/writing/ClientPostBody";
import type { PostVisibility } from "@/lib/post-schema";

type PreviewFile = {
  slug: string;
  title: string;
  raw: string;
  visibility: PostVisibility;
  listedOnIndex: boolean;
  live: boolean;
};

type PreviewResult = {
  ok: boolean;
  code?: string;
  frontmatter?: {
    title: string;
    description: string;
    publishDate: string;
    visibility: PostVisibility;
  };
  publish?: {
    slug?: string;
    filename: string;
    url: string;
    visibility: PostVisibility;
    listedOnIndex: boolean;
  };
  errors?: Array<{ path: string; message: string }>;
};

function parseFrontmatter(raw: string) {
  if (!raw.startsWith("---")) {
    return { title: "Untitled", publishDate: "", visibility: "unlisted" as const };
  }

  const end = raw.indexOf("---", 3);
  if (end === -1) {
    return { title: "Untitled", publishDate: "", visibility: "unlisted" as const };
  }

  const block = raw.slice(3, end).trim();
  const title = block.match(/^title:\s*(.+)$/m)?.[1]?.trim() ?? "Untitled";
  const publishDate = block.match(/^publishDate:\s*(.+)$/m)?.[1]?.trim() ?? "";
  const visibilityMatch = block.match(/^visibility:\s*(public|unlisted)\s*$/m);
  const visibility: PostVisibility = visibilityMatch
    ? (visibilityMatch[1] as PostVisibility)
    : /^draft:\s*true\s*$/m.test(block)
      ? "unlisted"
      : "public";

  return { title, publishDate, visibility };
}

function setVisibilityInSource(raw: string, visibility: PostVisibility) {
  const withoutDraft = raw.replace(/^draft:\s*(true|false)\s*$/m, "");

  if (/^visibility:\s*(public|unlisted)\s*$/m.test(withoutDraft)) {
    return withoutDraft.replace(
      /^visibility:\s*(public|unlisted)\s*$/m,
      `visibility: ${visibility}`
    );
  }

  const end = withoutDraft.indexOf("---", 3);
  if (end === -1) return withoutDraft;

  const before = withoutDraft.slice(0, end);
  const after = withoutDraft.slice(end);
  return `${before}visibility: ${visibility}\n${after}`;
}

export default function PreviewEditor({ files }: { files: PreviewFile[] }) {
  const [selectedSlug, setSelectedSlug] = useState(files[0]?.slug ?? "");
  const [source, setSource] = useState(files[0]?.raw ?? "");
  const [preview, setPreview] = useState<PreviewResult | null>(null);
  const [isCompiling, setIsCompiling] = useState(false);

  const selectedFile = files.find((file) => file.slug === selectedSlug);
  const parsed = useMemo(() => parseFrontmatter(source), [source]);

  function handleSelect(slug: string) {
    const file = files.find((item) => item.slug === slug);
    if (!file) return;
    setSelectedSlug(slug);
    setSource(file.raw);
  }

  function resetSource() {
    if (selectedFile) setSource(selectedFile.raw);
  }

  function setVisibility(visibility: PostVisibility) {
    setSource((current) => setVisibilityInSource(current, visibility));
  }

  useEffect(() => {
    const timeout = setTimeout(async () => {
      setIsCompiling(true);
      try {
        const response = await fetch("/api/writing/preview", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ source }),
        });
        const result = (await response.json()) as PreviewResult;
        setPreview(result);
      } catch {
        setPreview({
          ok: false,
          errors: [{ path: "network", message: "Could not compile preview" }],
        });
      } finally {
        setIsCompiling(false);
      }
    }, 350);

    return () => clearTimeout(timeout);
  }, [source]);

  if (files.length === 0) {
    return (
      <div className="bg-olive-50 dark:bg-olive-950 min-h-screen flex items-center justify-center px-4">
        <p className="text-olive-800 dark:text-olive-100 text-sm">No content files found in content/</p>
      </div>
    );
  }

  const publishUrl = selectedFile?.live ? `/writing/${selectedSlug}` : preview?.publish?.url;
  const statusLabel =
    parsed.visibility === "public"
      ? "Public (listed on /writing)"
      : "Unlisted (link-only, hidden from /writing)";

  return (
    <div className="bg-olive-50 dark:bg-olive-950 relative min-h-screen">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10">
        <div className="w-full">
          <Navbar />
        </div>

        <div className="flex flex-col gap-4 border-b border-olive-200 pb-6 dark:border-olive-800">
          <p className="font-mono text-xs uppercase text-olive-500 dark:text-olive-400">Writing studio</p>
          <h1 className="font-serif text-3xl italic text-olive-800 dark:text-olive-100">Preview & publish</h1>
          <p className="text-sm text-olive-600 dark:text-olive-400">
            Edit MDX in content/, validate frontmatter, preview with custom blocks, then publish.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <select
              value={selectedSlug}
              onChange={(event) => handleSelect(event.target.value)}
              className="rounded-lg border border-olive-200 bg-white px-3 py-2 text-sm text-olive-800 outline-none dark:border-olive-700 dark:bg-olive-900 dark:text-olive-100"
            >
              {files.map((file) => (
                <option key={file.slug} value={file.slug}>
                  {file.slug} {file.visibility === "unlisted" ? "(unlisted)" : ""}
                </option>
              ))}
            </select>
            <select
              value={parsed.visibility}
              onChange={(event) => setVisibility(event.target.value as PostVisibility)}
              className="rounded-lg border border-olive-200 bg-white px-3 py-2 text-sm text-olive-800 outline-none dark:border-olive-700 dark:bg-olive-900 dark:text-olive-100"
            >
              <option value="public">Public</option>
              <option value="unlisted">Unlisted</option>
            </select>
            <button
              type="button"
              onClick={resetSource}
              className="rounded-lg border border-olive-200 px-3 py-2 text-sm text-olive-700 transition-colors hover:bg-olive-100 dark:border-olive-700 dark:text-olive-300 dark:hover:bg-olive-900"
            >
              Reset file
            </button>
            {selectedFile?.live ? (
              <Link href={`/writing/${selectedSlug}`} className="text-sm link">
                View live
              </Link>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <section className="rounded-xl border border-olive-200 bg-white p-4 dark:border-olive-800 dark:bg-olive-900/50">
            <p className="mb-4 font-mono text-xs uppercase text-olive-500 dark:text-olive-400">Publish checklist</p>

            <div className="flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:items-start lg:justify-between">
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-olive-700 dark:text-olive-300">
                <p>
                  <span className="font-medium">File:</span> content/{selectedSlug}.mdx
                </p>
                <p>
                  <span className="font-medium">URL:</span> {publishUrl}
                </p>
                <p>
                  <span className="font-medium">Status:</span> {statusLabel}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                {preview?.errors?.length ? (
                  <div className="rounded-lg border border-red-400/40 bg-red-400/10 px-3 py-2 text-sm text-red-700 dark:text-red-300">
                    <p className="font-medium">Validation errors</p>
                    <ul className="mt-1 list-disc space-y-1 pl-4">
                      {preview.errors.map((error) => (
                        <li key={`${error.path}-${error.message}`}>
                          {error.path}: {error.message}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="text-sm text-lime-600 dark:text-lime-400">Frontmatter valid</p>
                )}

                <ol className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-olive-600 dark:text-olive-400 lg:max-w-xl">
                  <li className="list-decimal list-inside">Save to content/{selectedSlug}.mdx</li>
                  <li className="list-decimal list-inside">Set visibility</li>
                  <li className="list-decimal list-inside">Fill title, description, publishDate</li>
                  <li className="list-decimal list-inside">Restart dev if new file</li>
                  <li className="list-decimal list-inside">Open {publishUrl}</li>
                </ol>
              </div>
            </div>
          </section>

          <div className="grid gap-6 lg:grid-cols-2">
            <section className="flex min-h-[32rem] flex-col gap-3">
              <p className="font-mono text-xs uppercase text-olive-500 dark:text-olive-400">Source</p>
              <textarea
                value={source}
                onChange={(event) => setSource(event.target.value)}
                spellCheck={false}
                className="min-h-[32rem] flex-1 resize-y rounded-xl border border-olive-200 bg-white p-4 font-mono text-sm leading-6 text-olive-800 outline-none focus:border-olive-400 dark:border-olive-700 dark:bg-olive-900 dark:text-olive-100 dark:focus:border-olive-500"
              />
            </section>

            <section className="flex min-h-[32rem] flex-col gap-3 rounded-xl border border-olive-200 bg-olive-100/70 p-6 dark:border-olive-800 dark:bg-olive-900/40">
              <div className="flex items-center justify-between gap-3">
                <p className="font-mono text-xs uppercase text-olive-500 dark:text-olive-400">Preview</p>
                {isCompiling ? <p className="text-xs text-olive-500">Compiling…</p> : null}
              </div>

              <div className="mx-auto flex w-full max-w-xl flex-col gap-6">
                {parsed.publishDate ? (
                  <p className="text-sm font-mono uppercase text-olive-500 dark:text-olive-400">{parsed.publishDate}</p>
                ) : null}
                <h2 className="font-serif text-4xl italic text-olive-800 dark:text-olive-100">{parsed.title}</h2>

                {preview?.ok && preview.code ? (
                  <ClientPostBody code={preview.code} />
                ) : (
                  <p className="text-sm text-olive-500 dark:text-olive-400">Fix frontmatter or MDX errors to preview.</p>
                )}
              </div>
            </section>
          </div>
        </div>

        <div className="border-t border-olive-200 pt-6 dark:border-olive-800">
          <Footer />
        </div>
      </div>
    </div>
  );
}
