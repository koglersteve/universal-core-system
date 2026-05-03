"use client";

import { useFavoritesStore } from "@/store/useFavoritesStore";
import type { Post } from "@/types/jokes";

export default function PostActions({ post }: { post: Post }) {
  const { isFavorite, toggleFavorite } = useFavoritesStore();

  function share() {
    if (navigator.share) {
      navigator.share({
        title: "LaffLab Post",
        text: post.text,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard");
    }
  }

  return (
    <div className="flex items-center gap-[var(--space-3)] pt-[var(--space-2)]">
      <button
        onClick={() => toggleFavorite(post.id)}
        className="px-[var(--space-3)] py-[var(--space-2)] rounded-[var(--radius-md)] bg-white/10 border border-white/20 hover:bg-white/20 transition-soft"
      >
        {isFavorite(post.id) ? "★ Favorited" : "☆ Favorite"}
      </button>

      <button
        onClick={share}
        className="px-[var(--space-3)] py-[var(--space-2)] rounded-[var(--radius-md)] bg-white/10 border border-white/20 hover:bg-white/20 transition-soft"
      >
        Share
      </button>

      <button
        onClick={() => alert("Coming soon")}
        className="px-[var(--space-3)] py-[var(--space-2)] rounded-[var(--radius-md)] bg-white/10 border border-white/20 hover:bg-white/20 transition-soft"
      >
        More like this
      </button>
    </div>
  );
}
