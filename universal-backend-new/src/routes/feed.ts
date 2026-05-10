import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export default async function feedRoutes(app: FastifyInstance) {
  app.get("/feed", async (_req, reply) => {
    try {
      const posts = await prisma.post.findMany({
        orderBy: { createdAt: "desc" },
        take: 50
      });

      if (!posts || posts.length === 0) {
        return reply.send([
          {
            id: "mock-1",
            app: "mock",
            type: "meme",
            text: null,
            mediaUrl: "https://i.imgflip.com/30b1gx.jpg",
            createdAt: new Date().toISOString(),
            score: 42,
            creatorId: "user-1",
            creator: {
              id: "user-1",
              screenName: "MockUser",
              avatarUrl: null
            }
          }
        ]);
      }

      return reply.send(posts);
    } catch (err: any) {
      app.log.error(err);
      return reply
        .status(500)
        .send({
          error: "Feed service failed",
          message: err?.message ?? "unknown error"
        });
    }
  });
}
