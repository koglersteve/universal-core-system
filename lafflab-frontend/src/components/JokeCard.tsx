"use client";

import Link from "next/link";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import PostMedia from "./PostMedia";
import ImpressionBar from "@/components/ImpressionBar";
import type { Post } from "@/types/jokes";

export default function JokeCard({ post }: { post: Post }) {
  const { isFavorite, toggleFavorite } = useFavoritesStore();

  return (
    <div className="p-[var(--space-3)] rounded-[var(--radius-md)] bg-white/5 border border-white/10 text-white space-y-[var(--space-2)] card-elevated card-interactive">
      <Link href={`/post/${post.id}`} className="block transition-soft">
        <PostMedia post={post} active={false} />
      </Link>

      <div className="flex justify-between items-center">
        <span className="text-[var(--text-xs)] text-white/60">
          {new Date(post.createdAt).toLocaleString()}
        </span>

        <button
          onClick={() => toggleFavorite(post.id)}
          className="text-[var(--text-sm)] px-[var(--space-2)] py-[var(--space-1)] rounded-[var(--radius-sm)] bg-white/10 border border-white/20 hover:bg-white/20 transition-soft"
        >
          {isFavorite(post.id) ? "★ Favorited" : "☆ Favorite"}
        </button>
      </div>

      {/* ⭐ Impression Bar at the bottom */}
      <ImpressionBar postId={post.id} />
    </div>
  );
}

