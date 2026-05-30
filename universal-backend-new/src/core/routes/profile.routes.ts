// src/core/routes/profile.routes.ts
import { Hono } from "hono";
import { prisma } from "@/shared/prisma/client.js";

const profile = new Hono();

// TEMP: demo user
const DEMO_USERNAME = "demo";

function attachAuthorDisplayNameToPost(post: any) {
  if (post?.author) {
    const author: any = post.author;
    post.author = {
      ...author,
      displayName: author.displayName ?? author.username,
    };
  }
  return post;
}

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

  const postsRaw = await prisma.post.findMany({
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

  const items = postsRaw.map(attachAuthorDisplayNameToPost);

  return c.json({ items });
});

export default profile;
