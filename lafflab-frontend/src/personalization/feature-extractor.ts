export interface PostFeature {
  id: string;
  createdAt: string;
  authorId: string;
  score: number;
}

export function extractFeatures(post: any): PostFeature {
  return {
    id: post.id,
    createdAt: String(post.createdAt),
    authorId: String(post.authorId ?? ""),
    score: Number(post.score ?? 0),
  };
}


