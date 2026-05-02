import { Hono } from "hono";
import { prisma } from "@/lib/prisma";

export const postsRouter = new Hono();

//
// -----------------------------------------------------
// GET /api/lafflab/posts
// Optional query params:
//   ?type=video
//   ?limit=20
// -----------------------------------------------------
//
postsRouter.get("/", async (c) => {
  const type = c.req.query("type");
  const limit = Number(c.req.query("limit") ?? "50");

  const posts = await prisma.post.findMany({
    where: type ? { type } : undefined,
    orderBy: { createdAt: "desc" },
    take: Math.min(limit, 100),
  });

  return c.json(
    posts.map((p) => ({
      id: p.id,
      type: p.type,
      text: p.text,
      imageUrl: p.imageUrl,
      videoUrl: p.videoUrl,
      audioUrl: p.audioUrl,
      thumbnailUrl: p.thumbnailUrl,
      createdAt: p.createdAt.toISOString(),
    }))
  );
});

//
// -----------------------------------------------------
// GET /api/lafflab/posts/:id
// -----------------------------------------------------
//
postsRouter.get("/:id", async (c) => {
  const id = c.req.param("id");

  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) return c.notFound();

  return c.json({
    id: post.id,
    type: post.type,
    text: post.text,
    imageUrl: post.imageUrl,
    videoUrl: post.videoUrl,
    audioUrl: post.audioUrl,
    thumbnailUrl: post.thumbnailUrl,
    createdAt: post.createdAt.toISOString(),
  });
});

//
// -----------------------------------------------------
// POST /api/lafflab/posts
// Body:
// {
//   type: "text" | "image" | "meme" | "video" | "audio",
//   text?: string,
//   imageUrl?: string,
//   videoUrl?: string,
//   audioUrl?: string,
//   thumbnailUrl?: string
// }
// -----------------------------------------------------
//
postsRouter.post("/", async (c) => {
  const body = await c.req.json<{
    type: string;
    text?: string;
    imageUrl?: string;
    videoUrl?: string;
    audioUrl?: string;
    thumbnailUrl?: string;
  }>();

  if (!body.type) {
    return c.json({ error: "type is required" }, 400);
  }

  const post = await prisma.post.create({
    data: {
      type: body.type,
      text: body.text,
      imageUrl: body.imageUrl,
      videoUrl: body.videoUrl,
      audioUrl: body.audioUrl,
      thumbnailUrl: body.thumbnailUrl,
    },
  });

  return c.json({
    id: post.id,
    type: post.type,
    text: post.text,
    imageUrl: post.imageUrl,
    videoUrl: post.videoUrl,
    audioUrl: post.audioUrl,
    thumbnailUrl: post.thumbnailUrl,
    createdAt: post.createdAt.toISOString(),
  });
});

//
// -----------------------------------------------------
// PATCH /api/lafflab/posts/:id
// -----------------------------------------------------
//
postsRouter.patch("/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json<{
    type?: string;
    text?: string | null;
    imageUrl?: string | null;
    videoUrl?: string | null;
    audioUrl?: string | null;
    thumbnailUrl?: string | null;
  }>();

  const post = await prisma.post.update({
    where: { id },
    data: {
      type: body.type ?? undefined,
      text: body.text ?? undefined,
      imageUrl: body.imageUrl ?? undefined,
      videoUrl: body.videoUrl ?? undefined,
      audioUrl: body.audioUrl ?? undefined,
      thumbnailUrl: body.thumbnailUrl ?? undefined,
    },
  });

  return c.json({
    id: post.id,
    type: post.type,
    text: post.text,
    imageUrl: post.imageUrl,
    videoUrl: post.videoUrl,
    audioUrl: post.audioUrl,
    thumbnailUrl: post.thumbnailUrl,
    createdAt: post.createdAt.toISOString(),
  });
});

//
// -----------------------------------------------------
// DELETE /api/lafflab/posts/:id
// -----------------------------------------------------
//
postsRouter.delete("/:id", async (c) => {
  const id = c.req.param("id");

  await prisma.post.delete({ where: { id } });

  return c.json({ ok: true });
});

//
// -----------------------------------------------------
// DEV SEEDER — PUT IT *INSIDE* postsRouter
// URL: POST /api/lafflab/posts/seed/dev
// -----------------------------------------------------
//
postsRouter.post("/seed/dev", async (c) => {
  await prisma.post.deleteMany();

  await prisma.post.createMany({
    data: [
      {
        type: "text",
        text: "Why don’t skeletons fight each other? They don’t have the guts.",
      },
      {
        type: "image",
        text: "Relatable meme of the day.",
        imageUrl: "https://example.com/memes/relatable.png",
      },
      {
        type: "meme",
        text: "When the deploy works on the first try.",
        imageUrl: "https://example.com/memes/deploy.png",
      },
      {
        type: "video",
        text: "Stand‑up clip: 15 seconds of chaos.",
        videoUrl: "https://example.com/videos/standup.mp4",
        thumbnailUrl: "https://example.com/videos/standup-thumb.jpg",
      },
      {
        type: "audio",
        text: "Audio joke: classic one‑liner.",
        audioUrl: "https://example.com/audio/joke1.mp3",
      },
    ],
  });

  return c.json({ ok: true });
});
