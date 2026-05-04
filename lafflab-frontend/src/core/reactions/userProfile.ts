// src/core/reactions/userProfile.ts

import type { ReactionEmojiKey } from "@/types/os";

export type UserReactionProfile = {
  userId: string;
  emojiCounts: Record<ReactionEmojiKey, number>;
  totalReactions: number;
};

const profiles = new Map<string, UserReactionProfile>();

/**
 * Initialize a strict‑safe empty profile for all 7 emojis
 */
function createEmptyProfile(userId: string): UserReactionProfile {
  return {
    userId,
    emojiCounts: {
      hysterical: 0,
      laughing: 0,
      expressionless: 0,
      shock: 0,
      mindblown: 0,
      angry: 0,
      crickets: 0,
    },
    totalReactions: 0,
  };
}

/**
 * Update a user's emotional profile based on a new reaction
 */
export function updateUserProfile(userId: string, emoji: ReactionEmojiKey) {
  if (!profiles.has(userId)) {
    profiles.set(userId, createEmptyProfile(userId));
  }

  const profile = profiles.get(userId)!;
  profile.emojiCounts[emoji] += 1;
  profile.totalReactions += 1;
}

/**
 * Retrieve a user's emotional profile
 */
export function getUserProfile(userId: string): UserReactionProfile | null {
  return profiles.get(userId) || null;
}
