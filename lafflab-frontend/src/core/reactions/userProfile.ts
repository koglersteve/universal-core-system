// src/core/reactions/userProfile.ts

export type ReactionEmojiKey =
  | "laugh"
  | "smile"
  | "expressionless"
  | "shock"
  | "mindblown"
  | "angry"
  | "crickets";

export type ReactionCounts = Record<ReactionEmojiKey, number>;

export type UserProfile = {
  userId: string;
  emojiCounts: ReactionCounts;
  totalReactions: number;
};

const profiles = new Map<string, UserProfile>();

export function initUserProfile(userId: string) {
  if (!profiles.has(userId)) {
    profiles.set(userId, {
      userId,
      emojiCounts: {
        laugh: 0,
        smile: 0,
        expressionless: 0,
        shock: 0,
        mindblown: 0,
        angry: 0,
        crickets: 0,
      },
      totalReactions: 0,
    });
  }
}

export function addUserReaction(userId: string, emoji: ReactionEmojiKey) {
  initUserProfile(userId);

  const profile = profiles.get(userId);
  if (!profile) return;

  const current = profile.emojiCounts[emoji] ?? 0;
  profile.emojiCounts[emoji] = current + 1;
  profile.totalReactions += 1;
}

export function getUserProfile(userId: string): UserProfile {
  initUserProfile(userId);

  const profile = profiles.get(userId);
  if (!profile) {
    return {
      userId,
      emojiCounts: {
        laugh: 0,
        smile: 0,
        expressionless: 0,
        shock: 0,
        mindblown: 0,
        angry: 0,
        crickets: 0,
      },
      totalReactions: 0,
    };
  }

  return profile;
}

export function clearUserProfiles() {
  profiles.clear();
}
