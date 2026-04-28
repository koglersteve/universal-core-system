import { prisma } from "./client";

export const JokesDB = {
  random() {
    return prisma.lafflabJokes.findFirst({
      orderBy: { created_at: "desc" }
    });
  },

  byCategory(categoryId: string) {
    return prisma.lafflabJokes.findMany({
      where: { category_id: categoryId }
    });
  }
};
