import { extractFeatures } from "./feature-extractor";
import { computeRelevanceSignal } from "./signals/relevance";
import { computeMomentumSignal } from "./signals/momentum";
import { computeEmotionSignal } from "./signals/emotion";
import { computeSocialSignal } from "./signals/social";
import { computeGovernanceSignal } from "./signals/governance";
import { computeDiversitySignal } from "./signals/diversity";
import { computeSessionSignal } from "./signals/session";
import { rankPosts } from "./ranker";
import { getUserProfile } from "./profile-store";

export type PersonalizationContext = {
  userId: string;
  sessionId: string;
};

export async function getPersonalizedFeed(
  ctx: PersonalizationContext
) {
  const profile = await getUserProfile(ctx.userId);
  const features = await extractFeatures(ctx);

  const signals = {
    relevance: await computeRelevanceSignal(profile, features),
    momentum: await computeMomentumSignal(features),
    emotion: await computeEmotionSignal(profile, features),
    social: await computeSocialSignal(profile, features),
    governance: await computeGovernanceSignal(features),
    diversity: await computeDiversitySignal(profile, features),
    session: await computeSessionSignal(ctx, features),
  };

  const ranked = rankPosts(features.posts, signals);
  return { ranked, signals };
}
