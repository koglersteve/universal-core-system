import type { PostFeature } from "./feature-extractor";

export type SignalBundle = {
  relevance: Record<string, number>;
  momentum: Record<string, number>;
  emotion: Record<string, number>;
  social: Record<string, number>;
  governance: Record<string, number>;
  diversity: Record<string, number>;
  session: Record<string, number>;
};

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

      const relevance = signals.relevance[id] ?? 0;
      const momentum = signals.momentum[id] ?? 0;
      const emotion = signals.emotion[id] ?? 0;
      const social = signals.social[id] ?? 0;
      const governance = signals.governance[id] ?? 0;
      const diversity = signals.diversity[id] ?? 0;
      const session = signals.session[id] ?? 0;

      const score =
        relevance * 0.35 +
        momentum * 0.15 +
        emotion * 0.2 +
        social * 0.1 +
        diversity * 0.1 +
        session * 0.1 +
        governance * 1.0; // governance can zero out

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
