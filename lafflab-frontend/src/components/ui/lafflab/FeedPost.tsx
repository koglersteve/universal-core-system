"use client";

import React from "react";

export default function FeedPost({ post }) {
  const handleReaction = async (emoji: string) => {
    await fetch("/api/reactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        postId: post.id,
        reaction: emoji,
      }),
    });
  };

  return (
    <div style={{ padding: 16, background: "#fff", borderRadius: 12 }}>
      {post.text && <p>{post.text}</p>}

      {post.mediaUrl && (
        <img
          src={post.mediaUrl}
          style={{ width: "100%", borderRadius: 12 }}
          alt=""
        />
      )}

      <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
        <button onClick={() => handleReaction("😂")}>😂</button>
        <button onClick={() => handleReaction("🔥")}>🔥</button>
        <button onClick={() => handleReaction("❤️")}>❤️</button>
      </div>
    </div>
  );
}
