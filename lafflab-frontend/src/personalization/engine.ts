// src/personalization/engine.ts

import { rankPosts } from "./ranker";
import { getUserProfile } from "./profile-store";
import { sendTrendingNotification } from "@/notifications/engine";

export type PersonalizationContext = {
  userId: string;
};

export function personalizeFeed(ctx: PersonalizationContext) {
  const profile = getUserProfile(ctx.userId);
  const ranked = rankPosts(profile);

  // Example personalization rule:
  // If user has high engagement, send trending notification
  if (profile && profile.totalReactions > 10) {
    sendTrendingNotification(ctx.userId);
  }

  return ranked;
}
