"use client";

import type { HistoryItem } from "@/types/history";

export function HistoryList({ items }: { items: HistoryItem[] }) {
  if (items.length === 0) {
    return (
      <p className="opacity-70 text-center py-6">
        No history yet. Go explore some posts.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((entry) => (
        <div
          key={entry.id}
          className="p-4 rounded-xl bg-white/10 border border-white/20 backdrop-blur"
        >
          <p className="text-sm opacity-80">History Entry ID:</p>

          <p className="text-lg font-semibold">{entry.id}</p>
        </div>
      ))}
    </div>
  );
}
