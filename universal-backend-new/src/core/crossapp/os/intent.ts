import type { ResonanceContext, ResonanceResult } from "../crossapp.types.js";

export type IntentSnapshot = {
  lastEmoji?: string;
  lastSourceApp?: string;
  inferredIntent: string | null;
};

export class Intent {
  private static perUser: Map<string, IntentSnapshot> = new Map();

  static update(ctx: ResonanceContext, res: ResonanceResult) {
    const prev = this.perUser.get(ctx.userId) ?? {
      lastEmoji: undefined,
      lastSourceApp: undefined,
      inferredIntent: null,
    };

    let inferredIntent = prev.inferredIntent;

    if (ctx.signalType === "reaction" && ctx.emoji) {
      if (res.polarity === "positive") {
        inferredIntent = "seek_more_like_this";
      } else if (res.polarity === "negative") {
        inferredIntent = "avoid_similar";
      } else {
        inferredIntent = "undecided";
      }
    }

    this.perUser.set(ctx.userId, {
      lastEmoji: ctx.emoji,
      lastSourceApp: ctx.sourceApp,
      inferredIntent,
    });
  }

  static snapshot(userId: string): IntentSnapshot {
    return (
      this.perUser.get(userId) ?? {
        lastEmoji: undefined,
        lastSourceApp: undefined,
        inferredIntent: null,
      }
    );
  }
}
