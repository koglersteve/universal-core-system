import React from "react";

type Post = {
  id: string;
  content: string;
  createdAt: string;
  author?: { username?: string };
};

export default function HistoryList({ posts }: { posts: Post[] }) {
  return (
    <div style={{ color: "#FFFFFF" }}>
      {posts.length === 0 && (
        <div style={{ opacity: 0.7, textAlign: "center", marginTop: 20 }}>
          No history yet.
        </div>
      )}

      {posts.map(post => (
        <div
          key={post.id}
          style={{
            marginBottom: 12,
            padding: 12,
            borderRadius: 16,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div style={{ fontSize: 12, opacity: 0.7 }}>
            {new Date(post.createdAt).toLocaleString()}
          </div>
          <div style={{ marginTop: 6 }}>{post.content}</div>
        </div>
      ))}
    </div>
  );
}
