import { db } from '../db/client';

export const reportsService = {
  create(postId: number, reason: string, userId?: number) {
    return db.report.create({
      data: { postId, reason, userId }
    });
  }
};
