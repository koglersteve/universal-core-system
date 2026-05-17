import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function postRoutes(app: FastifyInstance) {
  // Universal POST endpoint for all apps
  app.post("/post", async (request, reply) => {
    try {
      const { app: appName, type, text, mediaUrl, creatorId } = request.body as {
        app: string;
        type: string;
        text?: string;
        mediaUrl?: string;
        creatorId: string;
      };

      if (!appName || !type || !creatorId) {
        return reply.status(400).send({
          error: "Missing required fields: app, type, creatorId"
        });
      }

      const post = await prisma.post.create({
        data: {
          app: appName,
          type,
          text: text || null,
          mediaUrl: mediaUrl || null,
          creatorId
        }
      });

      return { success: true, post };
    } catch (err) {
      console.error("POST /post error:", err);
      return reply.status(500).send({ error: "Failed to create post" });
    }
  });

  // Universal GET feed endpoint with optional app filter
  app.get("/post", async (request) => {
    const { app: appName } = request.query as { app?: string };

    if (appName) {
      return prisma.post.findMany({
        where: { app: appName },
        orderBy: { createdAt: "desc" }
      });
    }

    return prisma.post.findMany({
      orderBy: { createdAt: "desc" }
    });
  });
}
