"use client";

import { useFavoritesStore } from "@/store/useFavoritesStore";

interface FavoritesListProps {
  posts: any[];
}

export default function FavoritesList({ posts }: FavoritesListProps) {
  const { favorites } = useFavoritesStore(); // Set<string>

  const favoritePosts = posts.filter((post) => favorites.has(post.id));

  if (!favoritePosts.length) {
    return (
      <p className="text-white/60">
        No favorites yet.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {favoritePosts.map((post) => (
        <div
          key={post.id}
          className="p-4 rounded bg-white/10 border border-white/20 text-white"
        >
          {JSON.stringify(post)}
        </div>
      ))}
    </div>
  );
}
