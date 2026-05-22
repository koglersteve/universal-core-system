"use client";

import type { Post } from "@/types/jokes";
import PostMedia from "./PostMedia";

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="bg-white/5 p-4 rounded-lg border border-white/10 space-y-3">
      <PostMedia post={post} active={false} />

      <div className="text-white font-semibold">
        {post.text || "Untitled Post"}
      </div>

      <div className="text-gray-300 text-sm">
        {post.text || "No content"}
      </div>

      <div className="text-xs text-white/40">
        {new Date(post.createdAt).toLocaleString()}
      </div>
    </div>
  );
}

