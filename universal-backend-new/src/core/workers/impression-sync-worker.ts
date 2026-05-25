import prisma from "@/shared/prisma.js";

export type ImpressionPayload = {
  userId: string;
  postId: string;
  app: string; // e.g. "lafflab", "drama", "northstar"
};

export class ImpressionSyncWorker {
  static async recordImpression(payload: ImpressionPayload) {
    const { userId, postId, app } = payload;

    await prisma.impression.create({
      data: {
        userId,
        postId,
        app,
      },
    });
  }

  static async recordBatch(impressions: ImpressionPayload[]) {
    if (impressions.length === 0) return;

    await prisma.$transaction(
      impressions.map((imp) =>
        prisma.impression.create({
          data: {
            userId: imp.userId,
            postId: imp.postId,
            app: imp.app,
          },
        })
      )
    );
  }
}
