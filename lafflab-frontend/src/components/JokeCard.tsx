"use client";

import type { Post } from "@/types/jokes";
import Link from "next/link";
// add:
import { useFavoritesStore } from "@/store/useFavoritesStore";

interface JokeCardProps {
  post: Post;
  active?: boolean;
}

export default function JokeCard({ post, active = false }: JokeCardProps) {
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const favorite = isFavorite(post.id);

  return (
    <div className="relative rounded-xl border border-white/20 bg-white/5 p-4">
      <button
        type="button"
        onClick={() => toggleFavorite(post)}
        className="absolute right-3 top-3 text-xl"
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        <span className={favorite ? "text-yellow-400" : "text-white/40"}>
          {favorite ? "★" : "☆"}
        </span>
      </button>

      <Link href={`/post/${post.id}`} className="block space-y-2">
        <p className="text-lg font-semibold">{post.text ?? "View post"}</p>
        {/* existing media / meta rendering here */}
      </Link>
    </div>
  );
}


