"use client";

interface HistoryItem {
  id: string;
  title?: string;
  [key: string]: any;
}

export default function HistoryList({ items = [] }: { items?: HistoryItem[] }) {
  if (!items.length) {
    return <p className="text-white/60">No history yet.</p>;
  }

  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li
          key={item.id}
          className="p-4 bg-white/5 rounded-lg border border-white/10 text-white"
        >
          {item.title || "Untitled"}
        </li>
      ))}
    </ul>
  );
}
