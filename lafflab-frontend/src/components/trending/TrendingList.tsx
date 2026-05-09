"use client";

type TrendingListProps = {
  items: any[];
};

export default function TrendingList({ items }: TrendingListProps) {
  if (!items.length) {
    return <p className="text-white/60">No trending posts right now.</p>;
  }

  return (
    <ul className="space-y-3 text-white">
      {items.map((item, i) => (
        <li
          key={i}
          className="p-4 rounded-lg bg-white/5 border border-white/10"
        >
          {typeof item === "string" ? item : item.title || "Untitled"}
        </li>
      ))}
    </ul>
  );
}
