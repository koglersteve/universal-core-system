// src/components/ImpressionBar.tsx
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

const EMOJIS: { key: ReactionEmojiKey; icon: string }[] = [
  { key: "laugh", icon: "😂" },
  { key: "smile", icon: "🙂" },
  { key: "expressionless", icon: "😐" },
  { key: "shock", icon: "😱" },
  { key: "mindblown", icon: "🤯" },
  { key: "angry", icon: "😡" },
  { key: "crickets", icon: "🦗" },
];

type Props = {
  onSelect: (key: ReactionEmojiKey) => void;
};

export default function ImpressionBar({ onSelect }: Props) {
  return (
    <div className="flex gap-2">
      {EMOJIS.map((e) => (
        <button
          key={e.key}
          onClick={() => onSelect(e.key)}
          className="text-2xl hover:scale-110 transition"
        >
          {e.icon}
        </button>
      ))}
    </div>
  );
}
