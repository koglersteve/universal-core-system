"use client";

export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-gray-300">
      <div className="animate-spin h-8 w-8 border-2 border-gray-500 border-t-transparent rounded-full" />
      <p className="mt-4 text-sm animate-pulse">Loading…</p>
    </div>
  );
}
