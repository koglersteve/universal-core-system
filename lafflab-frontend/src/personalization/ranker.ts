// src/personalization/ranker.ts

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

export type RankedPost = {
  id: string;
  score: number;
  reasons: string[];
};

export function rankPosts(
  posts: PostFeature[],
  signals: SignalBundle
): RankedPost[] {
  return posts
    .map((post) => {
      const id = post.id;

      const relevance = signals.relevance ?? 0;
      const momentum = signals.momentum ?? 0;
      const emotion = signals.emotion ?? 0;
      const social = signals.social ?? 0;
      const governance = signals.governance ?? 0;
      const diversity = signals.diversity ?? 0;
      const session = signals.session ?? 0;

      const score =
        relevance * 0.35 +
        momentum * 0.15 +
        emotion * 0.2 +
        social * 0.1 +
        diversity * 0.1 +
        session * 0.1 +
        governance * 1.0;

      const reasons: string[] = [];
      if (relevance > 0.7) reasons.push("high_relevance");
      if (emotion > 0.7) reasons.push("emotion_match");
      if (momentum > 0.7) reasons.push("high_momentum");
      if (session > 0.7) reasons.push("session_alignment");

      return { id, score, reasons };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);
}

