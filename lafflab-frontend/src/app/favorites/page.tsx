"use client";

import { useFavoritesStore } from "@/store/useFavoritesStore";

export default function FavoritesPage() {
  const { favorites } = useFavoritesStore();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Favorites</h1>

      {favorites.length === 0 && <p>No favorites yet.</p>}

      <div className="space-y-4">
        {favorites.map((joke) => (
          <div
            key={joke.id}
            className="p-4 border rounded bg-white shadow-sm"
          >
            <p>{joke.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
