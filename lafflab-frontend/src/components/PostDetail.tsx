"use client";

import type { Post } from "@/types/jokes";
import PostMedia from "./PostMedia";
import PostActions from "./PostActions";

export default function PostDetail({ post }: { post: Post }) {
  return (
    <div className="space-y-[var(--space-4)] p-[var(--space-4)]">
      <PostMedia post={post} active={false} />

      <div className="space-y-[var(--space-2)]">
        <h2 className="text-[var(--text-xl)] font-semibold">
          {post.text}
        </h2>

        <p className="text-white/70 text-[var(--text-sm)] leading-relaxed">
          {post.text}
        </p>
      </div>

      <PostActions post={post} />
    </div>
  );
}
