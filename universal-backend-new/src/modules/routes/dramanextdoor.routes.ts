import { Hono } from "hono";
import { prisma } from "../../core/lib/prisma";

export function registerDramaNextDoorRoutes(app: Hono) {
  const route = new Hono();

  // FEED
  route.get("/feed", async (c) => {
    const clips = await prisma.dramaClip.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    return c.json({ items: clips });
  });

  // FAVORITE
  route.post("/favorite", async (c) => {
    const { userId, clipId } = await c.req.json();
    await prisma.dramaFavorite.create({ data: { userId, clipId } });
    return c.json({ ok: true });
  });

  // FAVORITES LIST
  route.get("/favorites", async (c) => {
    const userId = c.req.query("userId") || "anon";
    const items = await prisma.dramaFavorite.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: { clip: true },
    });
    return c.json({ items: items.map((f: any) => f.clip) });
  });

  // HISTORY
  route.get("/history", async (c) => {
    const userId = c.req.query("userId") || "anon";
    const views = await prisma.dramaView.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: { clip: true },
    });
    return c.json({ items: views.map((v: any) => v.clip) });
  });

  // POST CLIP
  route.post("/post", async (c) => {
    const { type, url, title } = await c.req.json();

    const valid = ["video", "audio", "image", "meme"];
    if (!valid.includes(type)) {
      return c.json({ error: "Invalid type" }, 400);
    }

    const clip = await prisma.dramaClip.create({
      data: {
        type,
        title: title ?? "Untitled",
        videoUrl: url
      },
    });

    return c.json({ clip });
  });

  // REACT
  route.post("/react", async (c) => {
    const { clipId, reaction } = await c.req.json();

    const valid = [
      "laugh",
      "smile",
      "shock",
      "sad",
      "angry",
      "mindblown",
      "chaos",
    ];

    if (!valid.includes(reaction)) {
      return c.json({ error: "Invalid reaction" }, 400);
    }

    await prisma.dramaClip.update({
      where: { id: clipId },
      data: { [reaction]: { increment: 1 } },
    });

    return c.json({ ok: true });
  });

  // Mount namespace
  app.route("/api/dramanextdoor", route);
}

