// /src/personalization/engine.ts

import { extractFeatures } from "./feature-extractor";
import { profileToSignals } from "./signal-bundle";
import { rankPosts } from "./ranker";
import { getUserProfile } from "./profile-store";
import type { PersonalizationContext } from "./types";

export async function getPersonalizedFeed(ctx: PersonalizationContext) {
  const profile = await getUserProfile(ctx.userId);
  const signals = profileToSignals(profile);

  // 🔥 Always extract features — never pass raw posts
  const { posts: features } = await extractFeatures(ctx);

  const ranked = rankPosts(features, signals);

  return { ranked, signals };
}
