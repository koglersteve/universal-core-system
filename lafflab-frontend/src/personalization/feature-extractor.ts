export interface PostFeature {
  id: string;
  createdAt: string;
  authorId: string;
  score: number;
}

export type ExtractedFeatures = PostFeature[];

export function extractFeatures(posts: any[]): ExtractedFeatures {
  return posts.map((post) => ({
    id: post.id,
    createdAt: String(post.createdAt),
    authorId: String(post.authorId ?? ""),
    score: Number(post.score ?? 0),
  }));
}

export function extractSignals(profile: any) {
  return {
    relevance: Number(profile.relevance ?? 1),
    momentum: Number(profile.momentum ?? 1),
    emotion: Number(profile.emotion ?? 1),
    social: Number(profile.social ?? 1),
    governance: Number(profile.governance ?? 1),
    diversity: Number(profile.diversity ?? 1),
    session: Number(profile.session ?? 1),
  };
}


