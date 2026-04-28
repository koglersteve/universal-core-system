import { Hono } from "hono";

export function registerMemeMyCatRoutes(app: Hono) {
  app.post("/api/mememycat/generate", async (c) => {
    const body = await c.req.json();
    const { template, text } = body;

    return c.json({
      status: "ok",
      template,
      text,
      url: `https://dummyimage.com/600x600/222/fff&text=${encodeURIComponent(
        text || "Your Cat Meme"
      )}`
    });
  });
}
