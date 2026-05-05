// src/personalization/engine.ts

import type { PersonalizationContext } from "./types";
import { getUserProfile } from "./profile";
import { rankPosts } from "./ranking";

export function personalizeFeed(ctx: PersonalizationContext) {
  const profile = getUserProfile(ctx.userId);

  // rankPosts now requires (profile, posts)
  const ranked = rankPosts(profile, ctx.posts);

  if (profile && profile.totalReactions > 10) {
    return ranked.slice(0, 20);
  }

  return ranked;
}
