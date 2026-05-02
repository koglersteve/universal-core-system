"use client";

import { useEffect } from "react";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import JokeCard from "@/components/JokeCard";

export default function FavoritesPage() {
  const favorites = useFavoritesStore((s) => s.favorites);
  const hydrate = useFavoritesStore((s) => s.hydrate);
  const loading = useFavoritesStore((s) => s.loading);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const favoriteIds = [...favorites];

  return (
    <div className="p-6 text-white space-y-6">
      <h1 className="text-2xl font-bold">Favorites</h1>

      {loading && (
        <p className="opacity-70 text-center">Loading favorites…</p>
      )}

      {!loading && favoriteIds.length === 0 && (
        <p className="opacity-60 text-center">No favorites yet.</p>
      )}

      {!loading && favoriteIds.length > 0 && (
        <div className="space-y-4">
          {favoriteIds.map((id) => (
            <JokeCard key={id} postId={id} />
          ))}
        </div>
      )}
    </div>
  );
}
