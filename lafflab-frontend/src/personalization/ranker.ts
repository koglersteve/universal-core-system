import type { PostFeature } from "./feature-extractor";

export interface SignalBundle {
  relevance: number;
  momentum: number;
  emotion: number;
  social: number;
  governance: number;
  diversity: number;
  session: number;
}

export function rankPosts(posts: PostFeature[], signals: SignalBundle) {
  return posts
    .map((p) => ({
      ...p,
      weighted:
        p.score * signals.relevance +
        signals.momentum +
        signals.emotion +
        signals.social +
        signals.governance +
        signals.diversity +
        signals.session,
    }))
    .sort((a, b) => b.weighted - a.weighted);
}
