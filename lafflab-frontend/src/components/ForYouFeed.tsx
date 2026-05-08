"use client";

export default function ForYouFeed({ items = [] }: { items?: any[] }) {
  if (!items.length) {
    return <p className="text-white/60">No personalized recommendations yet.</p>;
  }

  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li
          key={i}
          className="p-4 bg-white/5 rounded-lg border border-white/10 text-white"
        >
          {item.title || "Untitled"}
        </li>
      ))}
    </ul>
  );
}
