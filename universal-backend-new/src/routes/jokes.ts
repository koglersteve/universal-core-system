import { Hono } from "hono";
import {
  getAllJokes,
  getJokeById,
  getRandomJoke,
  getJokesByCategory
} from "@/services/useJokes";

export const jokesRoute = new Hono();

jokesRoute.get("/", async (c) => c.json(await getAllJokes()));

jokesRoute.get("/:id", async (c) => {
  const id = c.req.param("id");
  return c.json(await getJokeById(id));
});

jokesRoute.get("/random", async (c) => c.json(await getRandomJoke()));

jokesRoute.get("/by-category", async (c) => {
  const categoryId = c.req.query("categoryId");
  return c.json(await getJokesByCategory(categoryId));
});
