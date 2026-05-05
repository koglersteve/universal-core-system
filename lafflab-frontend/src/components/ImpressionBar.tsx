import React from "react";
import { ReactionEmojiKey } from "@/types/os";

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
  onSelect: (emoji: ReactionEmojiKey) => void;
};

export default function ImpressionBar({ onSelect }: Props) {
  return (
    <div className="flex gap-3 items-center">
      {EMOJIS.map(({ key, icon }) => (
        <button
          key={key}
          onClick={() => onSelect(key)}
          className="text-2xl hover:scale-125 transition-transform"
        >
          {icon}
        </button>
      ))}
    </div>
  );
}
