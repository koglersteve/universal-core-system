import { Hono } from "hono";

const router = new Hono();

const CATEGORIES = [
  { id: "dev", name: "Developer Jokes" },
  { id: "net", name: "Networking Jokes" },
];

// GET /categories
router.get("/", (c) => c.json(CATEGORIES));

// GET /categories/:id
router.get("/:id", (c) => {
  const id = c.req.param("id");
  const category = CATEGORIES.find((c) => c.id === id);
  if (!category) return c.json({ error: "Not found" }, 404);
  return c.json(category);
});

export default router;
