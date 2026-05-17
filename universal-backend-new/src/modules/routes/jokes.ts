import { Hono } from "hono";
import {
  getAllJokes,
  getJokeById,
  getRandomJoke,
  getJokesByCategory
} from "@/services/useJokes";

export const jokesRoute = new Hono();

// GET /jokes
jokesRoute.get("/", async (c) => {
  const jokes = await getAllJokes();
  return c.json(jokes);
});

// GET /jokes/:id
jokesRoute.get("/:id", async (c) => {
  const id = c.req.param("id");
  const joke = await getJokeById(id);
  return c.json(joke);
});

// GET /jokes/random
jokesRoute.get("/random", async (c) => {
  const joke = await getRandomJoke();
  return c.json(joke);
});

// GET /jokes/by-category?categoryId=...
jokesRoute.get("/by-category", async (c) => {
  const categoryId = c.req.query("categoryId");
  if (!categoryId) {
    return c.json([]);
  }
  const jokes = await getJokesByCategory(categoryId);
  return c.json(jokes);
});
