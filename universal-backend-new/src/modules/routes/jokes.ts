import { Hono } from "hono";
import { getAllJokes, getRandomJoke } from "../../shared/api/jokes";

const router = new Hono();

router.get("/", async (c) => {
  const jokes = await getAllJokes();
  return c.json(jokes);
});

router.get("/random", async (c) => {
  const joke = await getRandomJoke();
  if (!joke) return c.json({ error: "No jokes available" }, 404);
  return c.json(joke);
});

export default router;
