"use client";

export default function ErrorState({
  message,
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center text-red-400">
      <h2 className="text-xl font-semibold">Something went wrong</h2>

      {message && <p className="mt-2 text-sm">{message}</p>}

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
        >
          Retry
        </button>
      )}
    </div>
  );
}
