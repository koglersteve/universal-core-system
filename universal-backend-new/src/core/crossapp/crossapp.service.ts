import type {
  ReactionPayload,
  ImpressionPayload,
  ResonanceContext,
} from "./crossapp.types";
import { ResonanceService } from "./resonance.service";

export class CrossAppService {
  //
  // REACTIONS
  //
  static async addReaction(payload: ReactionPayload) {
    const ctx: ResonanceContext = {
      userId: payload.userId,
      postId: payload.postId,
      sourceApp: payload.sourceApp,
      signalType: "reaction",
      emoji: payload.emoji,
    };

    // 1. Compute emotional resonance
    const resonance = await ResonanceService.compute(ctx);

    // 2. Propagate cross-app emotional effects
    await ResonanceService.propagate(resonance, ctx);

    // 3. TODO: persist reaction (future schema upgrade)
    // 4. TODO: update Emotional OS memory/attention (future)

    console.log("[CrossApp] Reaction handled", {
      payload,
      resonance,
    });

    return { ok: true, resonance };
  }

  //
  // IMPRESSIONS
  //
  static async addImpression(payload: ImpressionPayload) {
    const ctx: ResonanceContext = {
      userId: payload.userId,
      postId: payload.postId,
      sourceApp: payload.sourceApp,
      signalType: "impression",
    };

    // 1. Compute resonance (weaker than reactions)
    const resonance = await ResonanceService.compute(ctx);

    // 2. Propagate cross-app effects
    await ResonanceService.propagate(resonance, ctx);

    // 3. TODO: persist impression (future schema upgrade)
    // 4. TODO: update Emotional OS attention/memory (future)

    console.log("[CrossApp] Impression handled", {
      payload,
      resonance,
    });

    return { ok: true, resonance };
  }

  //
  // GETTERS (placeholder until schema upgrade)
  //
  static async getReactionsForPost(postId: string) {
    console.log("[CrossApp] Get reactions for post", { postId });
    return { items: [] };
  }

  static async getImpressionsForPost(postId: string) {
    console.log("[CrossApp] Get impressions for post", { postId });
    return { count: 0 };
  }
}
