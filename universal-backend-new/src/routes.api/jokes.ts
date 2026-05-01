import { Hono } from "hono";

const router = new Hono();

const JOKES = [
  { id: "1", text: "Why did the developer go broke? They used up all their cache.", categoryId: "dev" },
  { id: "2", text: "I would tell you a UDP joke, but you might not get it.", categoryId: "net" },
];

// GET /jokes
router.get("/", (c) => c.json(JOKES));

// GET /jokes/random
router.get("/random", (c) => {
  const idx = Math.floor(Math.random() * JOKES.length);
  return c.json(JOKES[idx]);
});

// GET /jokes/by-category?categoryId=dev
router.get("/by-category", (c) => {
  const categoryId = c.req.query("categoryId");
  if (!categoryId) return c.json({ error: "Missing categoryId" }, 400);

  const filtered = JOKES.filter((j) => j.categoryId === categoryId);
  return c.json(filtered);
});

// GET /jokes/:id
router.get("/:id", (c) => {
  const id = c.req.param("id");
  const joke = JOKES.find((j) => j.id === id);
  if (!joke) return c.json({ error: "Not found" }, 404);
  return c.json(joke);
});

export default router;
