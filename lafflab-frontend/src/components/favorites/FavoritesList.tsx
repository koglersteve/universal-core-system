"use client";

interface FavoritesListProps {
  items: Array<{
    id: string;
    title?: string;
    content?: string;
    [key: string]: any;
  }>;
}

export default function FavoritesList({ items }: FavoritesListProps) {
  if (!items || items.length === 0) {
    return <p className="text-white/60">No favorites yet.</p>;
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="p-4 rounded-lg bg-white/10 border border-white/20 text-white"
        >
          <div className="font-semibold text-lg">
            {item.title || "Untitled"}
          </div>

          {item.content && (
            <p className="text-white/60 mt-1 text-sm line-clamp-3">
              {item.content}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
