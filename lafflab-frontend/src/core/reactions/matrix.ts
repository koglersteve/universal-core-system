// src/core/reactions/matrix.ts

export type ReactionEmojiKey =
  | "laugh"
  | "smile"
  | "expressionless"
  | "shock"
  | "mindblown"
  | "angry"
  | "crickets";

/**
 * Canonical reaction propagation matrix.
 * Defines how one reaction influences others.
 */
export const REACTION_MATRIX: Record<ReactionEmojiKey, ReactionEmojiKey[]> = {
  laugh: ["smile", "expressionless"],
  smile: ["laugh", "expressionless"],
  expressionless: ["smile"],
  shock: ["mindblown", "laugh"],
  mindblown: ["shock"],
  angry: ["expressionless"],
  crickets: ["expressionless"],
};
