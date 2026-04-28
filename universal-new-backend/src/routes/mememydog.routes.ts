import { Hono } from "hono";

export function registerMemeMyDogRoutes(app: Hono) {
  app.post("/api/mememydog/generate", async (c) => {
    const body = await c.req.json();
    const { template, text } = body;

    return c.json({
      status: "ok",
      template,
      text,
      url: `https://dummyimage.com/600x600/000/fff&text=${encodeURIComponent(
        text || "Your Meme"
      )}`
    });
  });
}
