import { Hono } from "hono";
import prisma from "../../shared/api/prisma";

const router = new Hono();

router.get("/", (c) => {
  return c.json({
    service: "LAFFLab",
    status: "online",
    endpoints: [
      "/lafflab/jokes",
      "/lafflab/memes",
      "/lafflab/random"
    ],
  });
});

router.get("/jokes", async (c) => {
  const jokes = await prisma.joke.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return c.json(jokes);
});

router.get("/memes", async (c) => {
  const memes = await prisma.meme.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return c.json(memes);
});

router.get("/random", async (c) => {
  const items = [
    ...(await prisma.joke.findMany()),
    ...(await prisma.meme.findMany()),
  ];

  if (items.length === 0) {
    return c.json({ error: "No content available" }, 404);
  }

  const random = items[Math.floor(Math.random() * items.length)];
  return c.json(random);
});

export default router;
