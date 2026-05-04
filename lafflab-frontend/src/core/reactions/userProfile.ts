import type { ReactionEmojiKey } from "@/types/os";

export type UserReactionProfile = {
  userId: string;
  emojiCounts: Record<ReactionEmojiKey, number>;
  totalReactions: number;
};

const profiles = new Map<string, UserReactionProfile>();

export function updateUserProfile(userId: string, emoji: ReactionEmojiKey) {
  if (!profiles.has(userId)) {
    profiles.set(userId, {
      userId,
      emojiCounts: {
        laugh: 0, smile: 0, shock: 0,
        expressionless: 0, angry: 0,
        mindblown: 0, crickets: 0,
      },
      totalReactions: 0,
    });
  }
  const profile = profiles.get(userId)!;
  profile.emojiCounts[emoji] += 1;
  profile.totalReactions += 1;
}

export function getUserProfile(userId: string): UserReactionProfile | null {
  return profiles.get(userId) || null;
}
