"use client";

import React from "react";
import { sendReaction } from "@/lib/api/reactions";

const REACTIONS = [
  { key: "laugh", emoji: "😂" },
  { key: "smile", emoji: "🙂" },
  { key: "expressionless", emoji: "😐" },
  { key: "shock", emoji: "😱" },
  { key: "mindblown", emoji: "🤯" },
  { key: "angry", emoji: "😡" },
  { key: "crickets", emoji: "🦗" },
];

export default function FeedPost({ post }) {
  const handleReaction = async (emoji: string) => {
    try {
      await sendReaction({
        postId: post.id,
        emoji,
        surface: "lafflab-feed",
      });
    } catch (err) {
      console.error("Reaction failed:", err);
    }
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
        {REACTIONS.map((r) => (
          <button key={r.key} onClick={() => handleReaction(r.emoji)}>
            {r.emoji}
          </button>
        ))}
      </div>
    </div>
  );
}
