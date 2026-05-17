import { Hono } from "hono";

const router = new Hono();

router.get("/", (c) => {
  return c.json({
    items: [],
    message: "Jokes API stubbed (no DB models wired yet).",
  });
});

router.get("/:id", (c) => {
  const id = c.req.param("id");
  return c.json({
    id,
    joke: null,
    message: "Joke by ID stubbed.",
  });
});

router.post("/generate", async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const { category, mood } = body || {};
  return c.json({
    category: category ?? null,
    mood: mood ?? null,
    joke: null,
    message: "Generate joke stubbed.",
  });
});

router.post("/:id/view", (c) => {
  const id = c.req.param("id");
  return c.json({
    id,
    message: "Record view stubbed.",
  });
});

export default router;
