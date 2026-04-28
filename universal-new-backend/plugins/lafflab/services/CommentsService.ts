import { db } from '../db/client';

export const commentsService = {
  list(clipId: number) {
    return db.laffComment.findMany({
      where: { clipId },
      orderBy: { createdAt: 'asc' }
    });
  },

  create(clipId: number, text: string, userId?: number) {
    return db.laffComment.create({
      data: { clipId, text, userId }
    });
  }
};
