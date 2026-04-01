import { prisma } from "./client";

export const CrossAppLinksDB = {
  create(userId: string, jokeId: string, targetApp: string) {
    return prisma.lafflabCrossAppLinks.create({
      data: { user_id: userId, joke_id: jokeId, target_app: targetApp }
    });
  }
};
