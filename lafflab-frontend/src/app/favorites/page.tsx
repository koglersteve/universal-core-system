"use client";

import JokeCard from "@/components/JokeCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { EmptyState } from "@/components/EmptyState";
import { useFavoritesStore } from "@/hooks/useFavoritesStore";
import { LaffLabApi } from "@/lib/api/LaffLabApi";
import { useEffect, useState } from "react";

export default function FavoritesPage() {
  const { favorites } = useFavoritesStore(); // array of IDs
  const [jokes, setJokes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const results = await Promise.all(
        favorites.map((id) => LaffLabApi.getJokeById(id))
      );
      setJokes(results.filter(Boolean));
      setLoading(false);
    }

    load();
  }, [favorites]);

  if (loading) return <LoadingSpinner />;

  if (!jokes.length) {
    return <EmptyState message="No favorites yet." />;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Favorites</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jokes.map((joke) => (
          <JokeCard key={joke.id} joke={joke} viewed />
        ))}
      </div>
    </div>
  );
}
