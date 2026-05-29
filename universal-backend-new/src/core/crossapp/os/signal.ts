import type { ResonanceContext, ResonanceResult } from "../crossapp.types.js";

export type EmotionalSignal = {
  userId: string;
  postId: string;
  sourceApp?: string;
  signalType: "reaction" | "impression";
  emoji?: string;
  score: number;
  polarity: string;
  magnitude: string;
  at: string;
};

export class Signal {
  static fromResonance(
    ctx: ResonanceContext,
    res: ResonanceResult
  ): EmotionalSignal {
    return {
      userId: ctx.userId,
      postId: ctx.postId,
      sourceApp: ctx.sourceApp,
      signalType: ctx.signalType,
      emoji: ctx.emoji,
      score: res.score,
      polarity: res.polarity,
      magnitude: res.magnitude,
      at: res.createdAt,
    };
  }
}
