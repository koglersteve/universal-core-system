"use client";

import AppShell from "@/components/AppShell";
import { useEffect, useState } from "react";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import { LaffLabApi } from "@/lib/LaffLabApi";
import JokeCard from "@/components/JokeCard";
import { JokeCardSkeleton } from "@/components/JokeCardSkeleton";
import { EmptyState, EmptyHeartIcon } from "@/components/ui/EmptyState";
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

  const isLoading = loading || fetching;
  const showEmpty = !isLoading && posts.length === 0;

  return (
    <AppShell title="Favorites">
      {isLoading ? (
        <div className="space-y-[var(--space-3)]">
          {[...Array(4)].map((_, i) => (
            <JokeCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="animate-fadeIn space-y-[var(--space-3)]">
          {posts.length > 0 &&
            posts.map((post) => <JokeCard key={post.id} post={post} />)}

          {showEmpty && (
            <EmptyState
              title="No favorites yet"
              subtitle="Save jokes you love and they’ll appear here."
              icon={EmptyHeartIcon}
            />
          )}
        </div>
      )}
    </AppShell>
  );
}
