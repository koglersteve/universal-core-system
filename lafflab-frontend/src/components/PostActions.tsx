// src/components/PostActions.tsx
"use client";

import { useFavoritesStore } from "@/store/useFavoritesStore";
import type { Post } from "@/types/jokes";

type PostActionsProps = {
  post: Post;
};

export default function PostActions({ post }: PostActionsProps) {
  const { isFavorite, toggleFavorite } = useFavoritesStore();

  function share() {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({
        title: "LaffLab Post",
        text: post.text,
        url: window.location.href,
      });
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard");
    }
  }

  return (
    <div className="flex items-center gap-3 pt-2">
      <button
        onClick={() => toggleFavorite(post.id)}
        className="px-3 py-2 rounded-md bg-white/10 border border-white/20 hover:bg-white/20 transition-colors text-sm text-white"
      >
        {isFavorite(post.id) ? "★ Favorited" : "☆ Favorite"}
      </button>

      <button
        onClick={share}
        className="px-3 py-2 rounded-md bg-white/10 border border-white/20 hover:bg-white/20 transition-colors text-sm text-white"
      >
        Share
      </button>

      <button
        onClick={() => alert("Coming soon")}
        className="px-3 py-2 rounded-md bg-white/10 border border-white/20 hover:bg-white/20 transition-colors text-sm text-white"
      >
        More like this
      </button>
    </div>
  );
}
