// /src/personalization/signals/social.ts
import type { UserProfile } from "../profile-store";
import type { ExtractedFeatures } from "../feature-extractor";

export async function computeSocialSignal(
  profile: UserProfile,
  features: ExtractedFeatures
): Promise<Record<string, number>> {
  const scores: Record<string, number> = {};

  for (const post of features.posts) {
    const isFavAuthor = profile.favoriteAuthors.includes(
      post.authorId ?? ""
    );
    scores[post.id] = isFavAuthor ? 1 : 0;
  }

  return scores;
}
