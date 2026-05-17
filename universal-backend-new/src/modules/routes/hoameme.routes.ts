import { Hono } from "hono";

export function registerHoaMemeRoutes(app: Hono) {
  app.post("/api/hoameme/generate", async (c) => {
    const body = await c.req.json();
    const { template, text } = body;

    return c.json({
      status: "ok",
      template,
      text,
      url: `https://dummyimage.com/600x600/444/fff&text=${encodeURIComponent(
        text || "HOA Meme"
      )}`
    });
  });
}
