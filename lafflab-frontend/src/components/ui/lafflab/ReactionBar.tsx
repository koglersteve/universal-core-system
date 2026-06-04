"use client";

import React from "react";

export type ReactionEmojiKey =
  | "laugh"
  | "smile"
  | "expressionless"
  | "shock"
  | "mindblown"
  | "angry"
  | "crickets";

const REACTIONS: { key: ReactionEmojiKey; emoji: string }[] = [
  { key: "laugh", emoji: "😂" },
  { key: "smile", emoji: "🙂" },
  { key: "expressionless", emoji: "😐" },
  { key: "shock", emoji: "😱" },
  { key: "mindblown", emoji: "🤯" },
  { key: "angry", emoji: "😡" },
  { key: "crickets", emoji: "🦗" },
];

export default function ReactionBar({ postId }: { postId: string }) {
  const onReact = (key: ReactionEmojiKey) => {
    console.log("React:", key, "on post", postId);
    // TODO: wire to backend: POST /core/reactions/:postId/toggle
  };

  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        marginTop: 10,
        flexWrap: "wrap",
      }}
    >
      {REACTIONS.map((r) => (
        <button
          key={r.key}
          onClick={() => onReact(r.key)}
          style={{
            fontSize: 22,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            padding: "6px 10px",
            borderRadius: 12,
            cursor: "pointer",
            transition: "transform 0.12s ease",
          }}
          onMouseDown={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.9)";
          }}
          onMouseUp={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
          }}
        >
          {r.emoji}
        </button>
      ))}
    </div>
  );
}

