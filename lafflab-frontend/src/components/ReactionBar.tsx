"use client";

import React from "react";
import { ReactionEmojiKey } from "@/types/os";

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
  onSelect: (emoji: ReactionEmojiKey) => void;
};

export default function ReactionBar({ onSelect }: Props) {
  return (
    <div className="flex gap-3 items-center">
      {REACTIONS.map(({ key, emoji }) => (
        <button
          key={key}
          onClick={() => onSelect(key)}
          className="text-2xl hover:scale-125 transition-transform"
        >
          {emoji}
        </button>
      ))}
    </div>
  );
}
