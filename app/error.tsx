"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="bg-olive-100 dark:bg-olive-900 min-h-screen w-full flex justify-center py-10">
      <div className="flex flex-col gap-6 items-center w-full max-w-xl px-4 m-0">
        <div className="flex flex-col items-center justify-center gap-4 py-20 animate-in">
          <p className="font-mono text-sm uppercase text-red-500">Error</p>
          <h1 className="font-serif text-4xl italic text-olive-800 dark:text-olive-100">
            Something went wrong
          </h1>
          <p className="text-sm text-olive-500 dark:text-olive-400 text-center max-w-sm">
            An unexpected error occurred. Please try again.
          </p>
          <button
            onClick={reset}
            className="mt-4 px-4 py-2 text-sm font-medium font-mono uppercase bg-olive-300 dark:bg-olive-600 text-olive-800 dark:text-olive-100 rounded-lg hover:opacity-80 transition-opacity cursor-pointer border-none"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}
