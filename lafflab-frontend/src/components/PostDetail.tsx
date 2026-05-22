"use client";

import PostMedia from "./PostMedia";
import type { Post } from "@/types/jokes";

export default function PostDetail({ post }: { post: Post }) {
  return (
    <div className="space-y-4 p-4">
      {/* Media */}
      <PostMedia post={post} active={false} />

      {/* Text Content */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-white">
          {post.text || "Untitled Post"}
        </h2>

        <p className="text-sm text-white/70 leading-relaxed">
          {post.text}
        </p>

        <span className="text-xs text-white/50">
          {new Date(post.createdAt).toLocaleString()}
        </span>
      </div>
    </div>
  );
}
