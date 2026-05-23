import { Router } from "express";
import { prisma } from "../prisma.js";

const router = Router();

/**
 * GET /core/profile/:username
 * Returns user profile data
 */
router.get("/core/profile/:username", async (req, res) => {
  try {
    const { username } = req.params;

    const user = await prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        avatarUrl: true,
        bio: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "Profile not found" });
    }

    return res.json(user);
  } catch (err) {
    console.error("Error fetching profile:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * GET /core/profile/:username/posts
 * Returns posts created by the user
 */
router.get("/core/profile/:username/posts", async (req, res) => {
  try {
    const { username } = req.params;

    const user = await prisma.user.findUnique({
      where: { username },
      select: { id: true },
    });

    if (!user) {
      return res.status(404).json({ error: "Profile not found" });
    }

    const posts = await prisma.post.findMany({
      where: { authorId: user.id },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        content: true,
        mediaUrl: true,
        createdAt: true,
        author: {
          select: {
            id: true,
            username: true,
            avatarUrl: true,
          },
        },
      },
    });

    return res.json(posts);
  } catch (err) {
    console.error("Error fetching profile posts:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
