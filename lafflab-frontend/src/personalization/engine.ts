// src/personalization/engine.ts

import type { PersonalizationContext } from "./types";
import { getUserProfile } from "./profile-store";
import { rankPosts } from "./ranker";
import { profileToSignals } from "./signal-bundle";

export async function personalizeFeed(ctx: PersonalizationContext) {
  const profile = await getUserProfile(ctx.userId);

  const signals = profileToSignals(profile);

  const ranked = rankPosts(ctx.posts, signals);

  // Use the real field from UserProfile: recentEmotions
  if (profile.recentEmotions && profile.recentEmotions > 10) {
    return ranked.slice(0, 20);
  }

  return ranked;
}
