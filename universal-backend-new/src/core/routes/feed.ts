import { FastifyInstance } from "fastify";
import { prisma } from "../prisma";

export default async function feedRoutes(app: FastifyInstance) {
  app.get("/feed", async (req, reply) => {
    try {
      const { cursor, limit = 10, app: appFilter } = req.query as {
        cursor?: string;
        limit?: string | number;
        app?: string;
      };

      const take = Number(limit) || 10;

      const posts = await prisma.post.findMany({
        where: appFilter ? { app: appFilter } : {},
        take,
        skip: cursor ? 1 : 0,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: { createdAt: "desc" },
        include: {
          creator: {
            select: {
              id: true,
              screenName: true,
              avatarUrl: true,
            },
          },
        },
      });

      const nextCursor =
        posts.length === take ? posts[posts.length - 1].id : null;

      return reply.send({
        items: posts,
        nextCursor,
      });
    } catch (err) {
      app.log.error(err);
      return reply.status(500).send({ error: "Feed service failed" });
    }
  });
}
