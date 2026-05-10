import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export default async function feedRoutes(app: FastifyInstance) {
  app.get("/feed", async (_req, reply) => {
    try {
      const posts = await prisma.post.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          creator: true // allow null creator safely
        },
        take: 50
      });

      // If DB is empty, return mock post
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
            creator: {
              id: "user-1",
              screenName: "MockUser",
              avatarUrl: null
            }
          }
        ]);
      }

      // Normalize creator to avoid crashes
      const safePosts = posts.map((p) => ({
        ...p,
        creator: p.creator
          ? {
              id: p.creator.id,
              screenName: p.creator.screenName,
              avatarUrl: p.creator.avatarUrl
            }
          : {
              id: "unknown",
              screenName: "Unknown User",
              avatarUrl: null
            }
      }));

      return reply.send(safePosts);
    } catch (err) {
      app.log.error(err);
      return reply.status(500).send({ error: "Feed service failed" });
    }
  });
}
