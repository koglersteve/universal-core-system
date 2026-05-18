import { Router } from "express";
import { prisma } from "../prisma";

export const feedRouter = Router();

// GET /feed
feedRouter.get("/", async (req, res, next) => {
  try {
    const feed = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      include: { author: true },
      take: 100,
    });

    res.json(feed);
  } catch (err) {
    next(err);
  }
});
