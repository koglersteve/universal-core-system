import { Hono } from "hono";
import { postsRouter } from "./routes/posts";

const app = new Hono();

app.route("/api/lafflab/posts", postsRouter);

export default app;
