export default function Loading() {
  return (
    <div className="bg-olive-100 dark:bg-olive-900 min-h-screen w-full flex justify-center py-10">
      <div className="flex flex-col gap-6 items-center w-full max-w-xl px-4 m-0">
        {/* Profile skeleton */}
        <div className="w-full animate-in">
          <div className="size-10 rounded-full bg-olive-200 dark:bg-olive-800 animate-pulse" />
        </div>

        {/* Name skeleton */}
        <div className="w-full animate-in animate-delay-1">
          <div className="h-6 w-48 bg-olive-200 dark:bg-olive-800 rounded animate-pulse" />
        </div>

        {/* Nav skeleton */}
        <div className="flex gap-4 w-full animate-in animate-delay-2">
          <div className="h-4 w-12 bg-olive-200 dark:bg-olive-800 rounded animate-pulse" />
          <div className="h-4 w-16 bg-olive-200 dark:bg-olive-800 rounded animate-pulse" />
          <div className="h-4 w-20 bg-olive-200 dark:bg-olive-800 rounded animate-pulse" />
        </div>

        {/* Content skeleton */}
        <div className="flex flex-col gap-3 w-full mt-4 animate-in animate-delay-3">
          <div className="h-4 w-full bg-olive-200 dark:bg-olive-800 rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-olive-200 dark:bg-olive-800 rounded animate-pulse" />
          <div className="h-4 w-4/6 bg-olive-200 dark:bg-olive-800 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}
