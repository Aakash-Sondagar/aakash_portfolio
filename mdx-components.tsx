// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";

const calloutStyles = {
  note: "border-olive-300 bg-olive-100/80 dark:border-olive-600 dark:bg-olive-900/60",
  tip: "border-lime-600 bg-lime-400/10 dark:border-lime-400 dark:bg-lime-400/10",
  warning: "border-red-500 bg-red-400/10 dark:border-red-400 dark:bg-red-400/10",
};

export function Callout({ type = "note", title, children }) {
  return (
    <aside className={`rounded-lg border px-4 py-3 text-sm not-italic ${calloutStyles[type] || calloutStyles.note}`} data-type={type}>
      {title ? <p className="mb-2 font-semibold">{title}</p> : null}
      <div className="flex flex-col gap-2">{children}</div>
    </aside>
  );
}

export function Figure({ src, alt, caption }) {
  return (
    <figure className="my-2 overflow-hidden rounded-lg border border-olive-200 dark:border-olive-700">
      <img src={src} alt={alt} className="h-auto w-full" loading="lazy" />
      {caption ? (
        <figcaption className="px-3 py-2 text-xs text-olive-500 dark:text-olive-400">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

export function YouTube({ id, title = "YouTube video" }) {
  return (
    <figure className="my-2 overflow-hidden rounded-lg border border-olive-200 dark:border-olive-700">
      <div className="relative aspect-video w-full">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}`}
          title={title}
          className="absolute inset-0 size-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      {title ? (
        <figcaption className="px-3 py-2 text-xs text-olive-500 dark:text-olive-400">{title}</figcaption>
      ) : null}
    </figure>
  );
}

export const mdxComponents = {
  Callout,
  Figure,
  YouTube,
};
