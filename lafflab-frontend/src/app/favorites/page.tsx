"use client";

import { useEffect, useState } from "react";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import { LaffLabApi } from "@/lib/LaffLabApi";
import JokeCard from "@/components/JokeCard";
import type { Post } from "@/types/jokes";

export default function FavoritesPage() {
  const favorites = useFavoritesStore((s) => s.favorites);
  const hydrate = useFavoritesStore((s) => s.hydrate);
  const loading = useFavoritesStore((s) => s.loading);

  const [posts, setPosts] = useState<Post[]>([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    async function loadPosts() {
      if (favorites.size === 0) {
        setPosts([]);
        return;
      }

      setFetching(true);

      try {
        const all = await LaffLabApi.getPosts();
        const filtered = all.filter((p) => favorites.has(p.id));
        setPosts(filtered);
      } catch (err) {
        console.error("Failed to load favorite posts:", err);
      }

      setFetching(false);
    }

    loadPosts();
  }, [favorites]);

  return (
    <div className="p-6 text-white space-y-6">
      <h1 className="text-2xl font-bold">Favorites</h1>

      {(loading || fetching) && (
        <p className="opacity-70 text-center">Loading favorites…</p>
      )}

      {!loading && !fetching && posts.length === 0 && (
        <p className="opacity-60 text-center">No favorites yet.</p>
      )}

      {!loading && !fetching && posts.length > 0 && (
        <div className="space-y-4">
          {posts.map((post) => (
            <JokeCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
