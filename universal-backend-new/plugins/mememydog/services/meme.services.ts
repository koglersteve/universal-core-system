import { db } from '../db/client';

export class MemeService {
  async createMeme(userId: string, imageUrl: string, template?: string, title?: string) {
    return db.dogMeme.create({
      data: {
        userId,
        imageUrl,
        template: template || null,
        title: title || null
      }
    });
  }

  async getMemeById(id: number) {
    return db.dogMeme.findUnique({ where: { id } });
  }

  async listUserCreations(userId: string) {
    return db.dogMeme.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
  }
}

export const memeService = new MemeService();
