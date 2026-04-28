import { db } from '../db/client';

export const dramaService = {
  list() {
    return db.dramaPost.findMany({
      orderBy: { createdAt: 'desc' }
    });
  },

  create(data: { title?: string; mediaUrl?: string; type?: 'video' | 'audio' }) {
    return db.dramaPost.create({
      data: {
        title: data.title || 'Untitled Drama',
        mediaUrl: data.mediaUrl || '',
        type: data.type || 'video'
      }
    });
  }
};
