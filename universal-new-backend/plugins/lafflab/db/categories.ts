// C:\AureliaQ_Labs\universal-core-monorepo\universal-core\plugins\lafflab\db\categories.ts
import { prisma } from "./client";

export const CategoriesDB = {
  all() {
    return prisma.lafflabCategories.findMany({
      orderBy: { name: "asc" }
    });
  }
};
