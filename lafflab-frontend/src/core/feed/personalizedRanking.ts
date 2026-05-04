// src/core/feed/personalizedRanking.ts

export interface UserProfile {
  totalReactions: number;
  emojiCounts: {
    hysterical?: number;
    laughing?: number;
    expressionless?: number;
    shock?: number;
    mindblown?: number;
    angry?: number;
    crickets?: number;
  };
}

export interface RankedPost {
  id: string;
  hysterical: number;
  laughing: number;
  expressionless: number;
  shock: number;
  mindblown: number;
  angry: number;
  crickets: number;
}

/**
 * Simple user–post affinity based on emoji distribution similarity.
 */
export function personalizedRanking(
  posts: RankedPost[],
  profile: UserProfile
) {
  const totalUser = profile.totalReactions || 1;

  const uHysterical = (profile.emojiCounts.hysterical ?? 0) / totalUser;
  const uLaughing = (profile.emojiCounts.laughing ?? 0) / totalUser;
  const uExpressionless =
    (profile.emojiCounts.expressionless ?? 0) / totalUser;
  const uShock = (profile.emojiCounts.shock ?? 0) / totalUser;
  const uMindblown = (profile.emojiCounts.mindblown ?? 0) / totalUser;
  const uAngry = (profile.emojiCounts.angry ?? 0) / totalUser;
  const uCrickets = (profile.emojiCounts.crickets ?? 0) / totalUser;

  return posts
    .map((post) => {
      const postTotal =
        post.hysterical +
          post.laughing +
          post.expressionless +
          post.shock +
          post.mindblown +
          post.angry +
          post.crickets || 1;

      const pHysterical = post.hysterical / postTotal;
      const pLaughing = post.laughing / postTotal;
      const pExpressionless = post.expressionless / postTotal;
      const pShock = post.shock / postTotal;
      const pMindblown = post.mindblown / postTotal;
      const pAngry = post.angry / postTotal;
      const pCrickets = post.crickets / postTotal;

      // Cosine‑like similarity score across 7‑emoji space
      const affinity =
        uHysterical * pHysterical +
        uLaughing * pLaughing +
        uExpressionless * pExpressionless +
        uShock * pShock +
        uMindblown * pMindblown +
        uAngry * pAngry +
        uCrickets * pCrickets;

      return {
        id: post.id,
        score: affinity,
      };
    })
    .sort((a, b) => b.score - a.score);
}

