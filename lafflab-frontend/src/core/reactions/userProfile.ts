// src/core/reactions/userProfile.ts

import type { ReactionEmojiKey, ReactionCounts } from "@/types/os";

export type UserProfile = {
  userId: string;
  emojiCounts: ReactionCounts;
  totalReactions: number;
};

const profiles = new Map<string, UserProfile>();

function emptyCounts(): ReactionCounts {
  return {
    laugh: 0,
    smile: 0,
    expressionless: 0,
    shock: 0,
    mindblown: 0,
    angry: 0,
    crickets: 0,
  };
}

export function getOrCreateUserProfile(userId: string): UserProfile {
  if (!profiles.has(userId)) {
    profiles.set(userId, {
      userId,
      emojiCounts: emptyCounts(),
      totalReactions: 0,
    });
  }
  return profiles.get(userId)!;
}

export function recordUserReaction(userId: string, emoji: ReactionEmojiKey) {
  const profile = getOrCreateUserProfile(userId);
  profile.emojiCounts[emoji] += 1;
  profile.totalReactions += 1;
}

export function getUserProfile(userId: string): UserProfile | null {
  return profiles.get(userId) ?? null;
}
