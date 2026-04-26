import { Hono } from "hono";

export function registerDramaNextDoorRoutes(app: Hono) {
  const router = new Hono();

  // --- Start the drama engine ---
  router.get("/start", (c) => {
    return c.json({
      status: "ok",
      message: "Drama engine initialized",
      token: "drama-session-" + Date.now(),
    });
  });

  // --- Get the current scene ---
  router.get("/scene", (c) => {
    const mood = c.req.query("mood") || "neutral";

    return c.json({
      status: "ok",
      scene: {
        title: `Dramatic Scene: ${mood.toUpperCase()}`,
        description: `A dramatized neighborhood moment based on your mood: ${mood}.`,
        lines: [
          `The neighborhood senses your ${mood} energy.`,
          `Karen 2.0 adjusts her sunglasses dramatically.`,
          `A digital breeze blows through the HOA bylaws.`,
          `Someone whispers: "Oh… it’s happening again."`
        ]
      }
    });
  });

  // --- Move to the next scene ---
  router.post("/next", async (c) => {
    const body = await c.req.json().catch(() => ({}));
    const tension = body.tension || 1;

    return c.json({
      status: "ok",
      next: {
        title: "Escalation",
        description: `The tension rises to level ${tension}.`,
        lines: [
          `A neighbor peeks through the blinds.`,
          `Karen 2.0 gasps dramatically.`,
          `Someone drops a casserole.`,
          `The HOA president mutters: "Not again…"`,
        ]
      }
    });
  });

  // Mount router under /dramanextdoor
  app.route("/dramanextdoor", router);
}
