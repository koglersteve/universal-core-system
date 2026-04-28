import { prisma } from "./client";

export const FavoritesDB = {
  add(userId: string, jokeId: string) {
    return prisma.lafflabFavorites.create({
      data: { user_id: userId, joke_id: jokeId }
    });
  }
};
