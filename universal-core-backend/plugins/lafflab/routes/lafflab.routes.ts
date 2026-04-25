import { Hono } from "hono";
import {
  getRandomJoke,
  getJokeById,
  getJokesByCategory,
  getCategories,
  addHistory,
  getHistory,
} from "../plugins/lafflab/lafflab.service";

export function registerLaffLabRoutes(app: Hono) {
  const route = app.basePath("/lafflab");

  route.get("/jokes/random", (c) => c.json(getRandomJoke()));

  route.get("/jokes/:id", (c) => {
    const id = c.req.param("id");
    const joke = getJokeById(id);
    return joke ? c.json(joke) : c.json({ error: "Not found" }, 404);
  });

  route.get("/jokes/by-category", (c) => {
    const categoryId = c.req.query("id");
    return c.json(getJokesByCategory(categoryId));
  });

  route.get("/categories", (c) => c.json(getCategories()));

  route.post("/history/add", async (c) => {
    const { id } = await c.req.json();
    addHistory(id);
    return c.json({ success: true });
  });

  route.get("/history/list", (c) => c.json(getHistory()));
}
