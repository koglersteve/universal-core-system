import { Hono } from "hono";

export function registerDramaNextDoorRoutes(app: Hono) {
  app.get("/api/dramanextdoor/scene", (c) => {
    const mood = c.req.query("mood") || "neutral";

    // Safe dramatization payload
    return c.json({
      status: "ok",
      mood,
      scene: {
        title: `Dramatic Scene: ${mood.toUpperCase()}`,
        description: `A safe, exaggerated dramatization based on mood: ${mood}.`,
        lines: [
          `The neighborhood senses your ${mood} energy.`,
          `Karen 2.0 adjusts her sunglasses dramatically.`,
          `A digital breeze blows through the HOA bylaws.`,
          `Someone whispers: "Oh… it’s happening again."`
        ]
      }
    });
  });
}
