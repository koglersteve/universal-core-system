"use client";

import { EmptyState, EmptyHistoryIcon } from "@/components/ui/EmptyState";

export default function HistoryPage() {
  const hasHistory = false;

  return (
    <div className="p-6 text-white space-y-6 page-shell">
      <h1 className="text-2xl font-bold">History</h1>

      {!hasHistory && (
        <EmptyState
          title="No history yet"
          subtitle="Watch some jokes and your viewing history will appear here."
          icon={EmptyHistoryIcon}
        />
      )}
    </div>
  );
}
