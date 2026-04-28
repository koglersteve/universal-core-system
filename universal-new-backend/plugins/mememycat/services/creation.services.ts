import { db } from '../db/client';

export class CreationsService {
  async listUserCreations(userId: string) {
    return db.catMeme.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
  }
}

export const creationsService = new CreationsService();
