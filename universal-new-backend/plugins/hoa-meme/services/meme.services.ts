import { db } from '../db/client';

export class MemeService {
  async createMeme(userId: string, imageUrl: string, template?: string, title?: string) {
    return db.meme.create({
      data: {
        userId,
        imageUrl,
        template: template || null,
        title: title || null
      }
    });
  }

  async getMemeById(id: number) {
    return db.meme.findUnique({
      where: { id }
    });
  }
}

export const memeService = new MemeService();
