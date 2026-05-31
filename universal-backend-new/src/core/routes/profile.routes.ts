import { Hono } from "hono";
import { prisma } from "@/shared/prisma/client.js";

const profile = new Hono();

// TEMP: demo user
const DEMO_SCREENNAME = "demo";

function attachAuthorIdentity(post: any) {
  if (post?.author) {
    const author = post.author;
    post.author = {
      id: author.id,
      screenName: author.screenName,
      displayName: author.screenName,
      avatarUrl: author.avatarUrl,
    };
  }
  return post;
}

// GET /core/profile (current user)
profile.get("/", async (c) => {
  const user = await prisma.user.findUnique({
    where: { screenName: DEMO_SCREENNAME },
  });

  if (!user) return c.json({ error: "User not found" }, 404);

  return c.json(user);
});

// GET /core/profile/:screenName
profile.get("/:screenName", async (c) => {
  const screenName = c.req.param("screenName");

  const user = await prisma.user.findUnique({
    where: { screenName },
  });

  if (!user) return c.json({ error: "User not found" }, 404);

  return c.json(user);
});

// GET /core/profile/:screenName/posts
profile.get("/:screenName/posts", async (c) => {
  const screenName = c.req.param("screenName");

  const user = await prisma.user.findUnique({
    where: { screenName },
  });

  if (!user) return c.json({ items: [] });

  const postsRaw = await prisma.post.findMany({
    where: { authorId: user.id },
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: {
          id: true,
          screenName: true,
          avatarUrl: true,
        },
      },
    },
  });

  const items = postsRaw.map(attachAuthorIdentity);

  return c.json({ items });
});

export default profile;
