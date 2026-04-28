import { db } from '../db/client';

export const reactionsService = {
  async react(clipId: number, emoji: string, userId?: number) {
    // Remove previous reaction from same user
    await db.laffReaction.deleteMany({
      where: { clipId, userId }
    });

    // Add new reaction
    return db.laffReaction.create({
      data: { clipId, emoji, userId }
    });
  }
};
