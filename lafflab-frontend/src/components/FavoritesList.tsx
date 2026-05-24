"use client";

import React from "react";
import ReactionBar, { ReactionEmojiKey } from "@/components/ui/lafflab/ReactionBar";

type Post = {
  id: string;
  content: string;
  createdAt: string;
  author?: { username?: string };
  reactions?: Partial<Record<ReactionEmojiKey, number>>;
};

export default function FavoritesList({ posts }: { posts: Post[] }) {
  if (!posts || posts.length === 0) {
    return (
      <div
        style={{
          color: "rgba(255,255,255,0.7)",
          textAlign: "center",
          marginTop: 24,
        }}
      >
        No favorites yet.
      </div>
    );
  }

  return (
    <div style={{ marginTop: 12 }}>
      {posts.map(post => (
        <div
          key={post.id}
          style={{
            marginBottom: 12,
            padding: 12,
            borderRadius: 16,
            background: "rgba(0,0,0,0.35)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "#FFFFFF",
          }}
        >
          {post.author?.username && (
            <div
              style={{
                fontSize: 12,
                opacity: 0.8,
                marginBottom: 4,
              }}
            >
              @{post.author.username}
            </div>
          )}

          <div style={{ fontSize: 14, lineHeight: 1.5 }}>{post.content}</div>

          <ReactionBar onReact={() => {}} />
        </div>
      ))}
    </div>
  );
}
