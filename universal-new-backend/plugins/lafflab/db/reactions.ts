import { prisma } from "./client";

export const ReactionsDB = {
  add(userId: string, jokeId: string, reaction: string) {
    return prisma.lafflabReactions.create({
      data: { user_id: userId, joke_id: jokeId, reaction }
    });
  }
};
