"use client";

import type { Post } from "@/types/jokes";
import PostMedia from "./PostMedia";

export default function PostCard({ post }: { post: Post }) {
  const createdAt = post.createdAt
    ? new Date(post.createdAt).toLocaleString()
    : null;

  return (
    <div className="bg-white/5 p-4 rounded-lg border border-white/10 space-y-3">
      {/* Media (image/video/audio) */}
      <PostMedia post={post} active={false} />

      {/* Main text */}
      <div className="text-white font-semibold">
        {post.text || "Untitled Post"}
      </div>

      {/* Date (only if exists) */}
      {createdAt && (
        <div className="text-xs text-white/40">
          {createdAt}
        </div>
      )}
    </div>
  );
}

