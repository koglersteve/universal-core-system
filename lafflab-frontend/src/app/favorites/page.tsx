"use client";

import { useEffect } from "react";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import JokeCard from "@/components/JokeCard";

export default function FavoritesPage() {
  const { favorites, loading, hydrate } = useFavoritesStore();

  useEffect(() => {
    void hydrate();
  }, [hydrate]);

  if (loading && favorites.length === 0) {
    return <p className="opacity-70">Loading favorites…</p>;
  }

  if (!loading && favorites.length === 0) {
    return <p className="opacity-70">No favorites yet. Tap the star on any post to save it.</p>;
  }

  return (
    <div className="space-y-4">
      {favorites.map((post) => (
        <JokeCard key={post.id} post={post} />
      ))}
    </div>
  );
}
