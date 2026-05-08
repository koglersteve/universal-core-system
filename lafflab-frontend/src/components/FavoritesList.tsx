// FILE: src/components/FavoritesList.tsx
"use client";

import JokeCard from "@/components/JokeCard";
import { EmptyState, EmptyHeartIcon } from "@/components/EmptyState";
import type { Post } from "@/types/jokes";
import { useFavoritesStore } from "@/store/useFavoritesStore";

type FavoritesListProps = {
  posts: Post[];
};

export default function FavoritesList({ posts }: FavoritesListProps) {
  const { favorites } = useFavoritesStore();

  const favoritePosts = posts.filter((post) => favorites.includes(post.id));

  if (!favoritePosts.length) {
    return (
      <EmptyState
        title="No favorites yet"
        subtitle="Save jokes you love and they’ll show up here for quick laughs."
        icon={EmptyHeartIcon}
      />
    );
  }

  return (
    <div className="space-y-4">
      {favoritePosts.map((post) => (
        <JokeCard key={post.id} post={post} />
      ))}
    </div>
  );
}
