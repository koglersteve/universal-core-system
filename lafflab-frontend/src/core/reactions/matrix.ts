// src/core/reactions/matrix.ts

import { ReactionEmojiKey } from "@/types/os";

/**
 * Canonical Emotional OS emoji list.
 */
export const EMOJIS: ReactionEmojiKey[] = [
  "laugh",
  "smile",
  "expressionless",
  "shock",
  "mindblown",
  "angry",
  "crickets",
];

/**
 * Identity matrix for reaction transforms.
 */
export const REACTION_IDENTITY_MATRIX: Record<
  ReactionEmojiKey,
  Record<ReactionEmojiKey, number>
> = EMOJIS.reduce((acc, key) => {
  acc[key] = EMOJIS.reduce((inner, k) => {
    inner[k] = k === key ? 1 : 0;
    return inner;
  }, {} as Record<ReactionEmojiKey, number>);
  return acc;
}, {} as Record<ReactionEmojiKey, Record<ReactionEmojiKey, number>>);
