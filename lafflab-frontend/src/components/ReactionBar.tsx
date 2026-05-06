// src/components/ReactionBar.tsx
"use client";

import React from "react";

type ReactionEmojiKey =
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

type Props = {
  onReact: (key: ReactionEmojiKey) => void;
};

export default function ReactionBar({ onReact }: Props) {
  return (
    <div className="flex gap-2">
      {REACTIONS.map((r) => (
        <button
          key={r.key}
          onClick={() => onReact(r.key)}
          className="text-2xl hover:scale-110 transition"
        >
          {r.emoji}
        </button>
      ))}
    </div>
  );
}
