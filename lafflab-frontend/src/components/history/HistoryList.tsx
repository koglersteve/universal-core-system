import type { Joke } from "@/types/jokes";

export function HistoryList({ items }: { items: Joke[] }) {
  if (items.length === 0) {
    return <p className="text-gray-500">No history yet.</p>;
  }

  return (
    <div className="space-y-3">
      {items.map((j) => (
        <div key={j.id} className="p-3 border rounded-lg">
          {j.text}
        </div>
      ))}
    </div>
  );
}
