import prisma from "@/shared/prisma.js";

export type AnalyticsEventPayload = {
  type: string;          // e.g. "view", "click", "share", "open_settings"
  userId: string;
  app: string;           // e.g. "lafflab", "drama", "northstar"
  postId?: string;
  emoji?: string;
  metadata?: Record<string, unknown>;
};

export class AnalyticsWorker {
  static async recordEvent(payload: AnalyticsEventPayload) {
    const { type, userId, app, postId, emoji, metadata } = payload;

    await prisma.analyticsEvent.create({
      data: {
        type,
        userId,
        app,
        postId: postId ?? null,
        emoji: emoji ?? null,
        metadata: metadata ?? undefined,
      },
    });
  }

  static async recordBatch(events: AnalyticsEventPayload[]) {
    if (events.length === 0) return;

    await prisma.$transaction(
      events.map((e) =>
        prisma.analyticsEvent.create({
          data: {
            type: e.type,
            userId: e.userId,
            app: e.app,
            postId: e.postId ?? null,
            emoji: e.emoji ?? null,
            metadata: e.metadata ?? undefined,
          },
        })
      )
    );
  }
}
