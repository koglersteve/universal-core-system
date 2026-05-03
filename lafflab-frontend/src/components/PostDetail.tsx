"use client";

import type { Post } from "@/types/jokes";
import PostActions from "./PostActions";
import PostMedia from "./PostMedia";

export default function PostDetail({ post }: { post: Post }) {
  return (
    <div className="space-y-[var(--space-4)] p-[var(--space-4)]">
      {/* Media */}
      <PostMedia post={post} />

      {/* Text Content */}
      <div className="space-y-[var(--space-2)]">
        <h2 className="text-[var(--text-xl)] font-semibold">
          {post.text}
        </h2>

        <p className="text-white/70 text-[var(--text-sm)] leading-relaxed">
          {post.text}
        </p>
      </div>

      {/* Actions */}
      <PostActions post={post} />
    </div>
  );
}
