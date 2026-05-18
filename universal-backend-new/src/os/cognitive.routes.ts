import { Hono } from "hono";
import { state } from "./state.js";

const router = new Hono();

router.get("/", (c) =>
  c.json({
    cognitive: state.cognitive,
    updatedAt: Date.now()
  })
);

export default router;
