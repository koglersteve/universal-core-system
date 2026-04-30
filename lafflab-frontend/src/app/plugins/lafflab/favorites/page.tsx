"use client";

import { useFavoritesStore } from "@/src/hooks/useFavoritesStore";
import JokeCard from "@/src/components/JokeCard";

export default function FavoritesPage() {
  const { favorites } = useFavoritesStore();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Favorites</h1>

      {favorites.length === 0 && (
        <p className="text-gray-500">No favorites yet.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {favorites.map((joke) => (
          <JokeCard key={joke.id} joke={joke} />
        ))}
      </div>
    </div>
  );
}
