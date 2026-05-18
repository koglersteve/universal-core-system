import { Router } from "express";
import { prisma } from "../prisma";

export const postRouter = Router();

// GET /posts
postRouter.get("/", async (req, res, next) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

// POST /posts
postRouter.post("/", async (req, res, next) => {
  try {
    const { authorId, content, title } = req.body; // validate in real code

    const post = await prisma.post.create({
      data: { authorId, content, title },
    });

    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
});

// GET /posts/:id
postRouter.get("/:id", async (req, res, next) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: req.params.id },
    });

    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) {
    next(err);
  }
});
