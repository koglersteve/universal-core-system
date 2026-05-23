import { Hono } from "hono";
import { prisma } from "../../../src/core/config/prisma"; // adjust if needed

const posts = new Hono();

// POST /lafflab/posts
posts.post("/posts", async c => {
  const userId = c.get("userId") as string | undefined;
  if (!userId) return c.json({ error: "Unauthorized" }, 401);

  const body = await c.req.json<{
    text: string;
    type: "text" | "image" | "video" | "audio";
    mediaUrl?: string | null;
    mediaDurationSeconds?: number | null;
  }>();

  const { text, type, mediaUrl, mediaDurationSeconds } = body;

  if (!text || text.length > 150) {
    return c.json({ error: "Text is required (max 150 chars)" }, 400);
  }

  if (!["text", "image", "video", "audio"].includes(type)) {
    return c.json({ error: "Invalid post type" }, 400);
  }

  if (type === "text") {
    if (mediaUrl || mediaDurationSeconds) {
      return c.json({ error: "Text posts cannot include media" }, 400);
    }
  }

  if (type === "image") {
    if (!mediaUrl) return c.json({ error: "Image requires mediaUrl" }, 400);
  }

  if (type === "video" || type === "audio") {
    if (!mediaUrl) return c.json({ error: "Media required" }, 400);
    if (!mediaDurationSeconds || mediaDurationSeconds > 30) {
      return c.json({ error: "Media duration must be <= 30 seconds" }, 400);
    }
  }

  const post = await prisma.post.create({
    data: {
      authorId: userId,
      text,
      type: type.toUpperCase(),
      mediaUrl: mediaUrl ?? null,
      mediaDurationSeconds: mediaDurationSeconds ?? null,
    },
  });

  return c.json({ post });
});

export default posts;
