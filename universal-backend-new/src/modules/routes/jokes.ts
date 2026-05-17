// src/modules/routes/jokes.ts
import { Hono } from "hono";
import {
  getAllJokes,
  getJokeById,
  getRandomJoke,
  getJokesByCategory,
} from "../services/useJokes";

export const jokesRoute = new Hono();

jokesRoute.get("/", async (c: any) => {
  const jokes = await getAllJokes();
  return c.json(jokes);
});

jokesRoute.get("/:id", async (c: any) => {
  const id = c.req.param("id");
  const joke = await getJokeById(id);
  return c.json(joke);
});

jokesRoute.get("/random", async (c: any) => {
  const joke = await getRandomJoke();
  return c.json(joke);
});

jokesRoute.get("/by-category", async (c: any) => {
  const categoryId = c.req.query("categoryId");
  if (!categoryId) {
    return c.json([]);
  }
  const jokes = await getJokesByCategory(categoryId);
  return c.json(jokes);
});
