"use client";

import React from "react";
import ReactionBar from "./ReactionBar";

export default function FavoritesList({ posts }: { posts: any[] }) {
  return (
    <div style={{ padding: 16 }}>
      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            padding: 16,
            marginBottom: 16,
            background: "#fff",
            borderRadius: 12,
          }}
        >
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
            {post.author?.screenName || "Unknown User"}
          </div>

          <div style={{ fontSize: 14, lineHeight: 1.5 }}>
            {post.content}
          </div>

          <ReactionBar postId={post.id} />
        </div>
      ))}
    </div>
  );
}
