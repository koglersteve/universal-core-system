// src/core/reactions/matrix.ts

import type { ReactionEmojiKey, ReactionPropagation } from "@/types/os";

const EMOJIS: ReactionEmojiKey[] = [
  "hysterical",
  "laughing",
  "expressionless",
  "shock",
  "mindblown",
  "angry",
  "crickets",
];

// 7×7 matrix: simple defaults (tunable later)
export const REACTION_MATRIX: ReactionPropagation[] = EMOJIS.flatMap(
  (from) =>
    EMOJIS.map((to) => ({
      fromEmoji: from,
      toEmoji: to,
      weight: from === to ? 1 : 0.25,
      channel: "feed" as const,
    }))
);
