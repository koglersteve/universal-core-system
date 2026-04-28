import { db } from '../db/client';

export const reactionsService = {
  toggle(postId: number, userId?: number) {
    return db.reaction.findFirst({ where: { postId, userId } })
      .then(existing => {
        if (existing) {
          return db.reaction.delete({ where: { id: existing.id } });
        }
        return db.reaction.create({ data: { postId, userId } });
      });
  }
};
