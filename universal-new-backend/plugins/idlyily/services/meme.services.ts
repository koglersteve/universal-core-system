import { db } from '../db/client';

export class MemeService {
  async createMeme(
    userId: string,
    imageUrl: string,
    template?: string,
    title?: string,
    couples?: boolean
  ) {
    return db.meme.create({
      data: {
        userId,
        imageUrl,
        template: template || null,
        title: title || null,
        couples: !!couples
      }
    });
  }

  async getMemeById(id: number) {
    return db.meme.findUnique({ where: { id } });
  }

  async listUserCreations(userId: string) {
    return db.meme.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
  }
}

export const memeService = new MemeService();

