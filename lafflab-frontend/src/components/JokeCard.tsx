"use client";

import Link from "next/link";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import PostMedia from "./PostMedia";
import type { Post } from "@/types/jokes";

export default function JokeCard({ post }: { post: Post }) {
  const { isFavorite, toggleFavorite } = useFavoritesStore();

  return (
    <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-white space-y-3">
      <Link href={`/post/${post.id}`}>
        <PostMedia post={post} active={false} />
      </Link>

      <div className="flex justify-between items-center">
        <span className="text-xs text-white/60">
          {new Date(post.createdAt).toLocaleString()}
        </span>

        <button
          onClick={() => toggleFavorite(post.id)}
          className="text-sm px-3 py-1 rounded bg-white/10 border border-white/20 hover:bg-white/20 transition"
        >
          {isFavorite(post.id) ? "★ Favorited" : "☆ Favorite"}
        </button>
      </div>
    </div>
  );
}


