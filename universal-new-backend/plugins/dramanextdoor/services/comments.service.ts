import { db } from '../db/client';

export const commentsService = {
  list(postId: number) {
    return db.comment.findMany({
      where: { postId },
      orderBy: { createdAt: 'asc' }
    });
  },

  create(postId: number, text: string, userId?: number) {
    return db.comment.create({
      data: { postId, text, userId }
    });
  }
};
