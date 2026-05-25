import { ReactionService } from "../reactions/reaction-service.js";

export class ReactionFanoutWorker {
  static async fanoutReaction({
    userId,
    postId,
    app,
    emoji,
  }: {
    userId: string;
    postId: string;
    app: string;
    emoji: string;
  }) {
    await ReactionService.addReaction({
      userId,
      postId,
      app,
      emoji,
    });
  }
}
