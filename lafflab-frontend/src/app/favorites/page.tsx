"use client";

import JokeCard from "@/components/JokeCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { EmptyState } from "@/components/EmptyState";
import { useFavoritesStore } from "@/hooks/useFavoritesStore";

export default function FavoritesPage() {
  const { favorites, loading } = useFavoritesStore();

  if (loading) return <LoadingSpinner />;

  if (!favorites.length) {
    return <EmptyState message="No favorites yet." />;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Favorites</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {favorites.map((joke) => (
          <JokeCard key={joke.id} joke={joke} viewed />
        ))}
      </div>
    </div>
  );
}
