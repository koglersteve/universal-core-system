"use client";

import React from "react";
import { LaffLabApi } from "@/lib/LaffLabApi";

export default function FeedPost({ post }) {
  const handleReaction = async (emoji: string) => {
    await LaffLabApi.react(post.id, "USER_ID_HERE", emoji);
  };

  return (
    <div style={{ padding: 16, background: "#fff", borderRadius: 12 }}>
      {post.text && <p>{post.text}</p>}
      {post.mediaUrl && <img src={post.mediaUrl} style={{ width: "100%", borderRadius: 12 }} />}
      <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
        <button onClick={() => handleReaction("😂")}>😂</button>
        <button onClick={() => handleReaction("🔥")}>🔥</button>
        <button onClick={() => handleReaction("❤️")}>❤️</button>
      </div>
    </div>
  );
}
