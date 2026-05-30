import prisma from "@/shared/prisma.js";

export type AnalyticsEventPayload = {
  eventType: string;
  payload: Record<string, unknown>;
  type?: string;
  userId?: string;
  app?: string;
  postId?: string;
  emoji?: string;
  metadata?: Record<string, unknown>;
};

export class AnalyticsWorker {
  static async recordEvent(payload: AnalyticsEventPayload) {
    const { eventType, payload: dataPayload, type, userId, app, postId, emoji, metadata } = payload;

    await prisma.analyticsEvent.create({
      data: {
        eventType,
        payload: dataPayload as any,   // <-- FIXED
        type: type ?? null,
        userId: userId ?? null,
        app: app ?? null,
        postId: postId ?? null,
        emoji: emoji ?? null,
        metadata: metadata ? (metadata as any) : null,
      },
    });
  }

  static async recordBatch(events: AnalyticsEventPayload[]) {
    if (events.length === 0) return;

    await prisma.$transaction(
      events.map((e) =>
        prisma.analyticsEvent.create({
          data: {
            eventType: e.eventType,
            payload: e.payload as any,   // <-- FIXED
            type: e.type ?? null,
            userId: e.userId ?? null,
            app: e.app ?? null,
            postId: e.postId ?? null,
            emoji: e.emoji ?? null,
            metadata: e.metadata ? (e.metadata as any) : null,
          },
        })
      )
    );
  }
}
