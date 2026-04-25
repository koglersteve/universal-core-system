"use client";

import { useEffect, useState } from "react";
import { useFavorites } from "@/hooks/useFavorites";
import { Joke } from "@/lib/models";
import { LaffLabApi } from "@/lib/api/LaffLabApi";
import { JokeCard } from "@/components/JokeCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { EmptyState } from "@/components/EmptyState";
import { timeAgo } from "@/lib/time";

export default function FavoritesPage() {
  const { favorites, loadFavorites, loading } = useFavorites();
  const [jokes, setJokes] = useState<Joke[]>([]);

  useEffect(() => {
    if (favorites.length === 0) {
      loadFavorites();
      return;
    }

    async function load() {
      const list = await Promise.all(
        favorites.map((f) => LaffLabApi.getJokeById(f.id))
      );
      setJokes(list);
    }

    load();
  }, [favorites]);

  return (
    <div style={{ padding: 24 }}>
      <h1>Favorites</h1>

      {loading && <LoadingSpinner />}

      {!loading && favorites.length === 0 && (
        <EmptyState message="No favorites yet." />
      )}

      {favorites.map((f, i) => (
        <div key={f.id} style={{ marginBottom: 8 }}>
          <p style={{ opacity: 0.6, fontSize: 12 }}>
            Favorited {timeAgo(f.favoritedAt)}
          </p>
          <JokeCard joke={jokes[i]} />
        </div>
      ))}
    </div>
  );
}
