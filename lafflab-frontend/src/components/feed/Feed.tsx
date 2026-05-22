"use client";

import type { Post } from "@/types/jokes";
import JokeCard from "@/components/JokeCard";

export default function FeedList({ items }: { items: Post[] }) {
  if (!items || items.length === 0) {
    return (
      <div className="text-center text-white/50 py-8">
        No posts yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((post) => (
        <JokeCard key={post.id} post={post} />
      ))}
    </div>
  );
}
