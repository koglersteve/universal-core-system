interface FavoritesListProps {
  items: any[];
}

export default function FavoritesList({ items }: FavoritesListProps) {
  return (
    <div className="space-y-4">
      {items.length === 0 && (
        <p className="text-white/60">No favorites yet.</p>
      )}

      {items.map((item, i) => (
        <div
          key={i}
          className="p-4 rounded bg-white/10 border border-white/20 text-white"
        >
          {JSON.stringify(item)}
        </div>
      ))}
    </div>
  );
}
