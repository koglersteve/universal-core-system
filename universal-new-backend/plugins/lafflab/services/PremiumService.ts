// C:\AureliaQ_Labs\universal-core-monorepo\universal-core\plugins\lafflab\services\PremiumService.ts
import { prisma } from "../db/client";

export const PremiumService = {
  async isPremium(userId: string) {
    const sub = await prisma.lafflabPremium.findUnique({
      where: { user_id: userId }
    });
    return !!sub;
  },

  async activate(userId: string, productId: string) {
    return prisma.lafflabPremium.upsert({
      where: { user_id: userId },
      update: { product_id: productId },
      create: { user_id: userId, product_id: productId }
    });
  }
};
