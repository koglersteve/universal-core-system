// src/personalization/engine.ts

import type { PersonalizationContext } from "./types";
import { getUserProfile } from "./profile-store";
import { rankPosts } from "./ranker";

export async function personalizeFeed(ctx: PersonalizationContext) {
  const profile = await getUserProfile(ctx.userId);

  const ranked = rankPosts(profile, ctx.posts);

  if (profile && profile.totalReactions > 10) {
    return ranked.slice(0, 20);
  }

  return ranked;
}
