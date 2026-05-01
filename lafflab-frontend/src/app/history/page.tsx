"use client";

import { useHistory } from "@/hooks/useHistory";
import { HistoryList } from "@/components/history/HistoryList";

export default function HistoryPage() {
  const { history, loading, clear } = useHistory();

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">History</h1>

      <button
        onClick={clear}
        className="mb-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Clear History
      </button>

      <HistoryList items={history} />
    </div>
  );
}
