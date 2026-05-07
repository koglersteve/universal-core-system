"use client";

export default function Feed({ items = [] }: { items?: any[] }) {
  return (
    <div className="space-y-4 text-white">
      <h1 className="text-xl font-semibold">Feed</h1>

      {items.length === 0 ? (
        <p className="text-white/60">No posts yet.</p>
      ) : (
        <ul className="space-y-3">
          {items.map((item, i) => (
            <li
              key={i}
              className="p-4 bg-white/5 border border-white/10 rounded-lg"
            >
              {item.title || "Untitled"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
