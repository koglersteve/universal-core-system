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

  if (loading && favorites.length === 0) {
    return (
      <p className="text-center opacity-70 pt-10">
        Loading favorites…
      </p>
    );
  }

  if (!loading && favorites.length === 0) {
    return (
      <p className="text-center opacity-70 pt-10">
        No favorites yet. Tap the star on any post to save it.
      </p>
    );
  }

  return (
    <div className="space-y-6 pb-10">
      {favorites.map((post) => (
        <JokeCard key={post.id} post={post} active={false} />
      ))}
    </div>
  );
}
