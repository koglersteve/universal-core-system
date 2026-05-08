"use client";

export function ErrorView({ error }: { error: string }) {
  return (
    <div className="p-3 rounded-lg mb-4 bg-red-900/40 border border-red-500/40 text-red-200 animate-fadeIn">
      Error: {error}
    </div>
  );
}

