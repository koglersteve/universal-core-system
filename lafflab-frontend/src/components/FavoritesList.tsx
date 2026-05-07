// FILE: src/components/FavoritesList.tsx

"use client";

export default function FavoritesList({ items = [] }: { items?: any[] }) {
  return (
    <div className="space-y-4">
      {items.length === 0 ? (
        <p className="text-white/60">You have no favorites yet.</p>
      ) : (
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
      )}
    </div>
  );
}
