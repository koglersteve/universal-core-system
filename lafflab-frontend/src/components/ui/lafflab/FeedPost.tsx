"use client";

import React from "react";
import { LaffLabApi } from "@/lib/api";

export default function FeedPost({ post }) {
  const handleReaction = async (emoji: string) => {
    try {
      await LaffLabApi.react(post.id, emoji);
    } catch (err) {
      console.error("Reaction failed:", err);
    }
  };

  return (
    <div style={{ padding: 16, background: "#fff", borderRadius: 12 }}>
      {/* Backend uses `text`, not `content` */}
      {post.text && <p>{post.text}</p>}

      {/* Optional media support */}
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
