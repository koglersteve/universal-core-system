import type { ReactionEmojiKey, ReactionPropagation } from "./types";

const EMOJIS: ReactionEmojiKey[] = [
  "laugh",
  "smile",
  "shock",
  "expressionless",
  "angry",
  "mindblown",
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
