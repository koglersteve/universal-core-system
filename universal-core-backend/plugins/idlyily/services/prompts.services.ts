import { db } from '../db/client';

const DEFAULT_PROMPTS = [
  "when you don’t vacuum",
  "when you don’t do the dishes",
  "when you don’t clean the sink",
  "when you don’t fold the laundry",
  "when you don’t replace the toilet paper roll",
  "when you fart then walk away",
  "when you walk in front of me at the store",
  "when you eat my leftovers",
  "when you leave crumbs everywhere",
  "when you snore like a chainsaw",
  "when you steal my hoodie",
  "when you eat my fries"
];

export class PromptsService {
  getDefaultPrompts() {
    return DEFAULT_PROMPTS;
  }

  async getUserPrompts(userId: string) {
    return db.prompt.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
  }

  async createUserPrompt(userId: string, text: string) {
    return db.prompt.create({
      data: { userId, text }
    });
  }
}

export const promptsService = new PromptsService();
