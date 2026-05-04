// src/types/os/ReactionCounts.ts

import type { ReactionEmojiKey } from "./ReactionEmojiKey";

/**
 * Aggregated emoji counts for a single post.
 * Always keyed by the canonical 7‑emoji set.
 */
export type ReactionCounts = Record<ReactionEmojiKey, number>;
