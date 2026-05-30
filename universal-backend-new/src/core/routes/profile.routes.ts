import { Hono } from "hono";
import { prisma } from "@/shared/prisma/client.js";

const profile = new Hono();

// TEMP: demo user
const DEMO_USERNAME = "demo";

// GET /core/profile (current user)
profile.get("/", async (c) => {
  const user = await prisma.user.findUnique({
    where: { username: DEMO_USERNAME },
  });

  if (!user) return c.json({ error: "User not found" }, 404);

  return c.json(user);
});

// GET /core/profile/:username
profile.get("/:username", async (c) => {
  const username = c.req.param("username");

  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) return c.json({ error: "User not found" }, 404);

  return c.json(user);
});

// GET /core/profile/:username/posts
profile.get("/:username/posts", async (c) => {
  const username = c.req.param("username");

  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) return c.json({ items: [] });

  const posts = await prisma.post.findMany({
    where: { authorId: user.id },
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: {
          id: true,
          username: true,
          avatarUrl: true,
        },
      },
    },
  });

  return c.json({ items: posts });
});

export default profile;
