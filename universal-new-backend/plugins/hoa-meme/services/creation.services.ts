import { db } from '../db/client';

export class CreationsService {
  async listUserCreations(userId: string) {
    return db.meme.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
  }
}

export const creationsService = new CreationsService();
