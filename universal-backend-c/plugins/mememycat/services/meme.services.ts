import { db } from '../db/client';

export class MemeService {
  async createMeme(userId: string, imageUrl: string, template?: string, title?: string) {
    return db.catMeme.create({
      data: {
        userId,
        imageUrl,
        template: template || null,
        title: title || null
      }
    });
  }

  async getMemeById(id: number) {
    return db.catMeme.findUnique({ where: { id } });
  }

  async listUserCreations(userId: string) {
    return db.catMeme.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
  }
}

export const memeService = new MemeService();
