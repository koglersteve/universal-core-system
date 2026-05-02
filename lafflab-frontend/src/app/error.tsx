"use client";

import { useEffect } from "react";
import { logger } from "@/lib/logger";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logger.error("Global error boundary:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center text-white space-y-3">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="text-sm text-white/70 max-w-md">
        An unexpected error occurred. You can try again or return to the home feed.
      </p>
      <div className="flex gap-3 mt-2">
        <button
          onClick={reset}
          className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm hover:bg-white/20 transition"
        >
          Try again
        </button>
        <a
          href="/"
          className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm hover:bg-white/20 transition"
        >
          Go home
        </a>
      </div>
    </div>
  );
}
