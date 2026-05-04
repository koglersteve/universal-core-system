// lafflab-frontend/src/core/feed/personalizedRanking.ts

export interface UserProfile {
  totalReactions: number;
  emojiCounts: {
    laugh?: number;
    smile?: number;
    shock?: number;
    mindblown?: number;
  };
}

export interface RankedPost {
  id: string;
  laugh: number;
  smile: number;
  shock: number;
  mindblown: number;
}

export function personalizedRanking(
  posts: RankedPost[],
  profile: UserProfile
) {
  const totalUser = profile.totalReactions || 1;

  // Safe defaults (strict‑mode compliant)
  const userLaugh = (profile.emojiCounts.laugh ?? 0) / totalUser;
  const userSmile = (profile.emojiCounts.smile ?? 0) / totalUser;
  const userShock = (profile.emojiCounts.shock ?? 0) / totalUser;
  const userMindblown =
    (profile.emojiCounts.mindblown ?? 0) / totalUser;

  return posts
    .map((post) => {
      const postTotal =
        post.laugh + post.smile + post.shock + post.mindblown || 1;

      const postLaugh = post.laugh / postTotal;
      const postSmile = post.smile / postTotal;
      const postShock = post.shock / postTotal;
      const postMindblown = post.mindblown / postTotal;

      // Cosine‑like similarity score
      const affinity =
        userLaugh * postLaugh +
        userSmile * postSmile +
        userShock * postShock +
        userMindblown * postMindblown;

      return {
        id: post.id,
        score: affinity,
      };
    })
    .sort((a, b) => b.score - a.score);
}

