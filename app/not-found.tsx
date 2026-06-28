import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function NotFound() {
  return (
    <div className="bg-olive-100 dark:bg-olive-900 min-h-screen w-full flex justify-center py-10">
      <div className="flex flex-col gap-6 items-center w-full max-w-xl px-4 m-0">
        <div className="animate-in w-full">
          <Navbar />
        </div>

        <div className="flex flex-col items-center justify-center gap-4 py-20 animate-in animate-delay-1">
          <p className="font-mono text-sm uppercase text-olive-400 dark:text-olive-600">
            404
          </p>
          <h1 className="font-serif text-4xl italic text-olive-800 dark:text-olive-100">
            Page not found
          </h1>
          <p className="text-sm text-olive-500 dark:text-olive-400 text-center max-w-sm">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
          <Link
            href="/"
            className="mt-4 text-sm font-medium text-olive-800 dark:text-olive-100 hover:underline underline-offset-4 transition-all"
          >
            &larr; Back to home
          </Link>
        </div>

        <div className="animate-in animate-delay-2 w-full border-t border-olive-200 dark:border-olive-800 pt-6 mt-6">
          <Footer />
        </div>
      </div>
    </div>
  );
}
