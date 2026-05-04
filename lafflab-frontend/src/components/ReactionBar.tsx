"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { ReactionEmojiKey } from "@/types/os";

const REACTIONS: { key: ReactionEmojiKey; emoji: string }[] = [
  { key: "laugh", emoji: "🤣" },
  { key: "smile", emoji: "😂" },
  { key: "expressionless", emoji: "😐" },
  { key: "shock", emoji: "😱" },
  { key: "angry", emoji: "😡" },
  { key: "mindblown", emoji: "🤯" },
  { key: "crickets", emoji: "🦗" },
];

interface ReactionBarProps {
  postId: string;
  onReact?: (postId: string, reactionKey: ReactionEmojiKey) => void;
}

export function ReactionBar({ postId, onReact }: ReactionBarProps) {
  const [counts, setCounts] = useState<Partial<Record<ReactionEmojiKey, number>>>({});

  function handleReact(key: ReactionEmojiKey) {
    setCounts((prev) => ({ ...prev, [key]: (prev[key] ?? 0) + 1 }));
    onReact?.(postId, key);
  }

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      {REACTIONS.map((r) => (
        <motion.button
          key={r.key}
          onClick={() => handleReact(r.key)}
          whileTap={{ scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/10 border border-white/20 text-sm"
        >
          <span>{r.emoji}</span>
          {counts[r.key] ? <span className="text-xs opacity-80">{counts[r.key]}</span> : null}
        </motion.button>
      ))}
    </div>
  );
}
