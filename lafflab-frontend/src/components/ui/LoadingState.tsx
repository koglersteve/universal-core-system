"use client";

export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-white/70">
      <div className="h-8 w-8 border-2 border-white/40 border-t-transparent rounded-full animate-spin" />
      <p className="mt-4 text-sm animate-pulse">Loading…</p>
    </div>
  );
}
