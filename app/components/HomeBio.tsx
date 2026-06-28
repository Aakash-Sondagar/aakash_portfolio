import Link from "next/link";
import { site, type BioPart } from "@/site.config";

const bioDelayClasses = ["animate-delay-1", "animate-delay-2", "animate-delay-3", "animate-delay-4"] as const;

function renderPart(part: BioPart, index: number) {
  if (part.kind === "text") {
    return <span key={index}>{part.value}</span>;
  }

  if (part.kind === "internal") {
    return (
      <Link key={index} href={part.href} className="link font-normal">
        {part.label}
      </Link>
    );
  }

  return (
    <a key={index} href={part.href} target="_blank" rel="noopener noreferrer" className="link">
      {part.label}
    </a>
  );
}

export function HomeBio() {
  return (
    <div className="font-normal min-w-full relative shrink-0 text-olive-800 dark:text-olive-100 text-sm/6 text-justify flex flex-col gap-4">
      {site.home.bio.map((paragraph, index) => (
        <p key={index} className={`relative animate-in ${bioDelayClasses[index] ?? ""}`}>
          {paragraph.map((part, partIndex) => renderPart(part, partIndex))}
        </p>
      ))}
    </div>
  );
}
