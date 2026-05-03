"use client";

import PostMedia from "./PostMedia";
import PostActions from "./PostActions";
import type { Post } from "@/types/jokes";

export default function PostDetail({ post }: { post: Post }) {
  return (
    <div className="space-y-[var(--space-4)] animate-fadeIn">
      <div className="rounded-[var(--radius-lg)] overflow-hidden shadow-lg card-elevated">
        <PostMedia post={post} active={true} />
      </div>

      <div className="space-y-[var(--space-2)]">
        <h2 className="text-[var(--text-xl)] font-semibold">{post.title}</h2>

        <p className="text-white/70 text-[var(--text-sm)] leading-relaxed">
          {post.text}
        </p>

        <p className="text-white/50 text-[var(--text-xs)]">
          {new Date(post.createdAt).toLocaleString()}
        </p>
      </div>

      <PostActions post={post} />
    </div>
  );
}
