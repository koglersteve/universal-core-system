"use client";

type HistoryItem = {
  id: string;
  title: string;
  timestamp: string;
};

export default function HistoryList({ items }: { items: HistoryItem[] }) {
  if (!items || items.length === 0) {
    return (
      <div className="text-white/60 text-sm">
        No history yet. Your recent sessions will appear here.
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li
          key={item.id}
          className="flex justify-between items-center p-3 rounded bg-white/5 border border-white/10"
        >
          <div>
            <p className="text-white text-sm font-medium">{item.title}</p>
            <p className="text-white/50 text-xs">{item.timestamp}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

