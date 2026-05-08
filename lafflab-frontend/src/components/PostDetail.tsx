// src/components/PostDetail.tsx
"use client";

import type { Post } from "@/types/jokes";
import PostMedia from "./PostMedia";
import PostActions from "./PostActions";

type PostDetailProps = {
  post: Post;
};

export default function PostDetail({ post }: PostDetailProps) {
  return (
    <div className="space-y-4 p-4">
      <PostMedia post={post} active={false} />

      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-white">
          {post.text}
        </h2>

        <p className="text-sm text-white/70 leading-relaxed">
          {post.text}
        </p>
      </div>

      <PostActions post={post} />
    </div>
  );
}
