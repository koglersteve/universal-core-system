import { Router } from "express";
import { profileRouter } from "./profile.routes";
import { postRouter } from "./post.routes";
import { lafflabRouter } from "./lafflab.routes";
import { feedRouter } from "./feed";

export const createCoreRouter = () => {
  const router = Router();

  router.use("/profile", profileRouter);
  router.use("/posts", postRouter);
  router.use("/lafflab", lafflabRouter);
  router.use("/feed", feedRouter);

  return router;
};
