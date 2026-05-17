import { Hono } from "hono";

export function registerMultiverseSwitchRoutes(app: Hono) {
  app.post("/multiverse/switch/:id", async (c) => {
    const id = c.req.param("id");

    // Set cookie for universe
    c.header(
      "Set-Cookie",
      `universeId=${id}; Path=/; HttpOnly; SameSite=Lax; Secure`
    );

    return c.json({ success: true, universeId: id });
  });
}
