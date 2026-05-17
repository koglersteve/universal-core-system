import { Hono } from "hono";

export function registerLaffLabRoutes(app: Hono) {
  const router = new Hono();

  router.get("/", (c) => {
    return c.json({
      service: "LAFFLab",
      status: "online",
      endpoints: [
        "/lafflab/jokes",
        "/lafflab/memes",
        "/lafflab/random",
      ],
    });
  });

  router.get("/jokes", (c) => {
    return c.json({
      items: [],
      message: "LAFFLab jokes endpoint stubbed (no DB models yet).",
    });
  });

  router.get("/memes", (c) => {
    return c.json({
      items: [],
      message: "LAFFLab memes endpoint stubbed (no DB models yet).",
    });
  });

  router.get("/random", (c) => {
    return c.json({
      item: null,
      message: "LAFFLab random endpoint stubbed (no DB models yet).",
    });
  });

  app.route("/lafflab", router);
}
