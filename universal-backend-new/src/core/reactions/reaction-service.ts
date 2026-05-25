import prisma from "@/shared/prisma.js";

export type ReactionEmoji = string;

export type AddReactionInput = {
  userId: string;
  postId: string;
  app: string; // e.g. "lafflab", "drama", "northstar"
  emoji: ReactionEmoji;
};

export type RemoveReactionInput = {
  userId: string;
  postId: string;
  app: string;
  emoji: ReactionEmoji;
};

export const ReactionService = {
  async addReaction(input: AddReactionInput) {
    const { userId, postId, app, emoji } = input;

    return prisma.reaction.create({
      data: {
        userId,
        postId,
        app,
        emoji,
      },
    });
  },

  async removeReaction(input: RemoveReactionInput) {
    const { userId, postId, app, emoji } = input;

    const existing = await prisma.reaction.findFirst({
      where: {
        userId,
        postId,
        app,
        emoji,
      },
    });

    if (!existing) return null;

    await prisma.reaction.delete({
      where: { id: existing.id },
    });

    return existing;
  },

  async getReactionsForPost(postId: string, app: string) {
    return prisma.reaction.findMany({
      where: {
        postId,
        app,
      },
    });
  },
};
