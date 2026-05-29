import type {
  ResonanceContext,
  ResonanceResult,
  ReactionEmojiKey,
} from "./crossapp.types";
import { EmotionalOS } from "./os/os-engine";

const POSITIVE_EMOJIS: ReactionEmojiKey[] = ["laugh", "smile", "mindblown"];
const NEGATIVE_EMOJIS: ReactionEmojiKey[] = ["angry", "shock"];
const NEUTRAL_EMOJIS: ReactionEmojiKey[] = ["expressionless", "crickets"];

export class ResonanceService {
  static async compute(
    ctx: ResonanceContext
  ): Promise<ResonanceResult> {
    const baseScore =
      ctx.signalType === "reaction" ? 0.7 : 0.4;

    let emojiBoost = 0;

    if (ctx.emoji && POSITIVE_EMOJIS.includes(ctx.emoji)) {
      emojiBoost = 0.25;
    } else if (ctx.emoji && NEGATIVE_EMOJIS.includes(ctx.emoji)) {
      emojiBoost = 0.15;
    } else if (ctx.emoji && NEUTRAL_EMOJIS.includes(ctx.emoji)) {
      emojiBoost = 0.05;
    }

    const score = Math.min(1, baseScore + emojiBoost);

    const magnitude: ResonanceResult["magnitude"] =
      score > 0.8 ? "high" : score > 0.5 ? "medium" : "low";

    let polarity: ResonanceResult["polarity"] = "positive";

    if (ctx.emoji && NEGATIVE_EMOJIS.includes(ctx.emoji)) {
      polarity = "negative";
    } else if (ctx.emoji && NEUTRAL_EMOJIS.includes(ctx.emoji)) {
      polarity = "neutral";
    }

    const tags: string[] = [
      ctx.signalType,
      ctx.sourceApp ?? "unknown-app",
      `emoji:${ctx.emoji ?? "none"}`,
      `mag:${magnitude}`,
      `pol:${polarity}`,
    ];

    const result: ResonanceResult = {
      score,
      magnitude,
      polarity,
      tags,
      createdAt: new Date().toISOString(),
    };

    EmotionalOS.onResonance(ctx, result);

    console.log("[Resonance] computed", { ctx, result });

    return result;
  }

  static async propagate(result: ResonanceResult, ctx: ResonanceContext) {
    const effects = this.buildCrossAppEffects(ctx, result);

    console.log("[Resonance] propagate", {
      ctx,
      result,
      effects,
      propagatedAt: new Date().toISOString(),
    });
  }

  private static buildCrossAppEffects(
    ctx: ResonanceContext,
    result: ResonanceResult
  ) {
    const emoji = ctx.emoji;
    const { magnitude, polarity } = result;

    const base = {
      magnitude,
      polarity,
      sourceApp: ctx.sourceApp ?? "unknown-app",
    };

    switch (emoji) {
      case "laugh":
      case "smile":
        return {
          lafflab: { ...base, action: "boost_humor_content" },
          buildlab: { ...base, action: "surface_playful_projects" },
          universal: { ...base, action: "increase_lighthearted_rank" },
        };

      case "mindblown":
        return {
          lafflab: { ...base, action: "boost_high_impact_posts" },
          buildlab: { ...base, action: "highlight_breakthroughs" },
          universal: { ...base, action: "trigger_global_shockwave" },
        };

      case "angry":
      case "shock":
        return {
          hoa: { ...base, action: "escalate_conflict_scenarios" },
          universal: { ...base, action: "boost_controversial_content" },
          lafflab: { ...base, action: "surface_reaction_followups" },
        };

      case "expressionless":
      case "crickets":
        return {
          lafflab: { ...base, action: "deprioritize_low_engagement_posts" },
          universal: { ...base, action: "reduce_visibility" },
        };

      default:
        return {
          universal: { ...base, action: "no_op" },
        };
    }
  }
}
