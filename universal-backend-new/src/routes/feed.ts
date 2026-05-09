// src/routes/feed.ts
import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

type FeedPost = {
  id: string;
  type: string;
  text: string | null;
  mediaUrl: string | null;
  createdAt: string;
  score: number;
  creator: {
    id: string;
    screenName: string;
    avatarUrl: string | null;
  };
};

function normalizePost(p: any): FeedPost {
  return {
    id: p.id,
    type: p.type,
    text: p.text ?? null,
    mediaUrl: p.mediaUrl ?? null,
    createdAt: p.createdAt?.toISOString?.() ?? new Date().toISOString(),
    score: typeof p.score === "number" ? p.score : 0,
    creator: {
      id: p.creator?.id ?? "unknown",
      screenName: p.creator?.screenName ?? "Unknown",
      avatarUrl: p.creator?.avatarUrl ?? null
    }
  };
}

const MOCK_POSTS: FeedPost[] = [
  {
    id: "mock-1",
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
  },
  {
    id: "mock-2",
    type: "text",
    text: "Welcome to the Universal Feed Service!",
    mediaUrl: null,
    createdAt: new Date().toISOString(),
    score: 10,
    creator: {
      id: "user-2",
      screenName: "System",
      avatarUrl: null
    }
  }
];

export default async function feedRoutes(app: FastifyInstance) {
  app.get("/feed", async (_req, reply) => {
    try {
      let posts: any[] = [];

      try {
        posts = await prisma.post.findMany({
          orderBy: { createdAt: "desc" },
          include: {
            creator: {
              select: {
                id: true,
                screenName: true,
                avatarUrl: true
              }
            }
          },
          take: 50
        });
      } catch (err) {
        app.log.error({ err }, "Prisma error in /feed");
      }

      if (!posts || posts.length === 0) {
        return reply.send(MOCK_POSTS);
      }

      return reply.send(posts.map(normalizePost));
    } catch (err) {
      app.log.error({ err }, "Feed route error");
      return reply.status(500).send({ error: "Feed service failed" });
    }
  });

  app.get("/feed/recent", async (_req, reply) => {
    try {
      const posts = await prisma.post.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          creator: {
            select: {
              id: true,
              screenName: true,
              avatarUrl: true
            }
          }
        },
        take: 100
      });

      if (!posts || posts.length === 0) {
        return reply.send(MOCK_POSTS);
      }

      return reply.send(posts.map(normalizePost));
    } catch (err) {
      app.log.error({ err }, "Feed recent route error");
      return reply.status(500).send({ error: "Recent feed failed" });
    }
  });

  app.get("/feed/trending", async (_req, reply) => {
    try {
      const posts = await prisma.post.findMany({
        orderBy: [{ score: "desc" }, { createdAt: "desc" }],
        include: {
          creator: {
            select: {
              id: true,
              screenName: true,
              avatarUrl: true
            }
          }
        },
        take: 50
      });

      if (!posts || posts.length === 0) {
        return reply.send(MOCK_POSTS);
      }

      return reply.send(posts.map(normalizePost));
    } catch (err) {
      app.log.error({ err }, "Feed trending route error");
      return reply.status(500).send({ error: "Trending feed failed" });
    }
  });

  app.get("/feed/personalized", async (req, reply) => {
    try {
      const query = req.query as { userId?: string };
      const userId = query.userId;

      if (!userId) {
        return reply.status(400).send({ error: "userId query param required" });
      }

      const posts = await prisma.post.findMany({
        where: {
          OR: [{ creatorId: userId }]
        },
        orderBy: { createdAt: "desc" },
        include: {
          creator: {
            select: {
              id: true,
              screenName: true,
              avatarUrl: true
            }
          }
        },
        take: 50
      });

      if (!posts || posts.length === 0) {
        return reply.send(MOCK_POSTS);
      }

      return reply.send(posts.map(normalizePost));
    } catch (err) {
      app.log.error({ err }, "Feed personalized route error");
      return reply.status(500).send({ error: "Personalized feed failed" });
    }
  });
}
