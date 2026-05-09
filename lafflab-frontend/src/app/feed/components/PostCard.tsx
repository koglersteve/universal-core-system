"use client";

import { Post } from "@/types/post";

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="snap-center py-6">
      <div className="rounded-xl bg-white/5 border border-white/10 p-4">
        {/* Media goes here */}
        {/* Reaction bar goes here */}
      </div>
    </div>
  );
}
