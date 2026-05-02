"use client";

import Link from "next/link";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import type { Post } from "@/types/jokes";
import PostMedia from "@/components/PostMedia";

interface JokeCardProps {
  post: Post;
  active?: boolean;
}

export default function JokeCard({ post, active = false }: JokeCardProps) {
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);
  const isFavorite = useFavoritesStore((s) => s.isFavorite(post.id));

  return (
    <div
      className={`relative rounded-xl border border-white/10 bg-white/5 p-4 transition-all duration-300 ${
        active ? "scale-[1.02] shadow-lg shadow-black/20" : "opacity-90"
      }`}
    >
      {/* Favorite Button */}
      <button
        type="button"
        onClick={() => toggleFavorite(post)}
        className="absolute right-3 top-3 text-xl select-none"
      >
        <span className={isFavorite ? "text-yellow-400" : "text-white/40"}>
          {isFavorite ? "★" : "☆"}
        </span>
      </button>

      {/* Text */}
      {post.text && (
        <p className="mb-3 whitespace-pre-line text-base leading-relaxed text-white">
          {post.text}
        </p>
      )}

      {/* Media */}
      <PostMedia post={post} active={active} />

      {/* Footer / Metadata */}
      <div className="mt-3 flex items-center justify-between text-xs text-white/50">
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>

        <Link
          href={`/post/${post.id}`}
          className="text-white/60 hover:text-white transition"
        >
          View
        </Link>
      </div>
    </div>
  );
}


