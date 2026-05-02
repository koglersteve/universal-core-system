"use client";

import { useEffect } from "react";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import JokeCard from "@/components/JokeCard";
import LoadingState from "@/components/ui/LoadingState";
import EmptyState from "@/components/ui/EmptyState";

export default function FavoritesPage() {
  const favorites = useFavoritesStore((s) => s.favorites);
  const init = useFavoritesStore((s) => s.init);
  const loading = useFavoritesStore((s) => s.loading);

  useEffect(() => {
    init();
  }, [init]);

  if (loading) return <LoadingState message="Loading favorites…" />;

  const ids = Array.from(favorites);

  if (ids.length === 0) {
    return (
      <EmptyState
        title="No favorites yet"
        description="Tap the ★ icon on any post to save it here."
      />
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-white">Favorites</h1>

      <div className="space-y-4">
        {ids.map((id) => (
          <JokeCard key={id} post={{ id } as any} />
        ))}
      </div>
    </div>
  );
}
