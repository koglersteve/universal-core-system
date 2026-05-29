import type {
  ReactionPayload,
  ImpressionPayload,
  ResonanceContext,
  ResonanceResult,
  ReactionEmojiKey,
} from "./crossapp.types.js";
import { computeResonance } from "./resonance.service.js";
import { prisma } from "../../prisma.js";
import { publishEvent } from "../events/publisher.js";
import { EVENT_TYPES } from "../events/event-types.js";

type StoredReaction = {
  id: string;
  userId: string;
  postId: string;
  emoji: ReactionEmojiKey;
  sourceApp: string | null;
  createdAt: Date;
};

type StoredImpression = {
  id: string;
  userId: string;
  postId: string;
  sourceApp: string | null;
  createdAt: Date;
};

function buildResonanceContext(
  payload: ReactionPayload | ImpressionPayload,
  signalType: "reaction" | "impression",
  emoji?: ReactionEmojiKey
): ResonanceContext {
  return {
    userId: payload.userId,
    postId: payload.postId,
    sourceApp: payload.sourceApp,
    signalType,
    emoji,
  };
}

export const CrossAppService = {
  async addReaction(payload: ReactionPayload): Promise<{
    ok: true;
    reaction: StoredReaction;
    resonance: ResonanceResult;
  }> {
    const context = buildResonanceContext(payload, "reaction", payload.emoji);
    const resonance = computeResonance(context);

    const reaction = (await (prisma as any).reaction.create({
      data: {
        userId: payload.userId,
        postId: payload.postId,
        emoji: payload.emoji,
        sourceApp: payload.sourceApp ?? null,
      },
    })) as StoredReaction;

    await publishEvent(EVENT_TYPES.REACTION_FANOUT_REQUEST, {
      ...payload,
      resonance,
    });

    return {
      ok: true,
      reaction,
      resonance,
    };
  },

  async getReactionsForPost(postId: string): Promise<{
    ok: true;
    postId: string;
    total: number;
    counts: Record<ReactionEmojiKey, number>;
    latest: StoredReaction[];
  }> {
    const reactions = (await (prisma as any).reaction.findMany({
      where: { postId },
      orderBy: { createdAt: "desc" },
      take: 100,
    })) as StoredReaction[];

    const counts = reactions.reduce<Record<ReactionEmojiKey, number>>(
      (acc, r) => {
        acc[r.emoji] = (acc[r.emoji] ?? 0) + 1;
        return acc;
      },
      {
        laugh: 0,
        smile: 0,
        expressionless: 0,
        shock: 0,
        mindblown: 0,
        angry: 0,
        crickets: 0,
      }
    );

    return {
      ok: true,
      postId,
      total: reactions.length,
      counts,
      latest: reactions,
    };
  },

  async addImpression(payload: ImpressionPayload): Promise<{
    ok: true;
    impression: StoredImpression;
    resonance: ResonanceResult;
  }> {
    const context = buildResonanceContext(payload, "impression");
    const resonance = computeResonance(context);

    const impression = (await (prisma as any).impression.create({
      data: {
        userId: payload.userId,
        postId: payload.postId,
        sourceApp: payload.sourceApp ?? null,
      },
    })) as StoredImpression;

    await publishEvent(EVENT_TYPES.IMPRESSION_FANOUT_REQUEST, {
      ...payload,
      resonance,
    });

    return {
      ok: true,
      impression,
      resonance,
    };
  },

  async getImpressionsForPost(postId: string): Promise<{
    ok: true;
    postId: string;
    total: number;
    latest: StoredImpression[];
  }> {
    const impressions = (await (prisma as any).impression.findMany({
      where: { postId },
      orderBy: { createdAt: "desc" },
      take: 100,
    })) as StoredImpression[];

    return {
      ok: true,
      postId,
      total: impressions.length,
      latest: impressions,
    };
  },

  async handleImpression(payload: ImpressionPayload) {
    return this.addImpression(payload);
  },
};
