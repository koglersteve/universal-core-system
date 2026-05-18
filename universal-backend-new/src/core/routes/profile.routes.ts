import { Router } from "express";
import { prisma } from "../prisma";

export const profileRouter = Router();

// GET /profile/:id
profileRouter.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const profile = await prisma.user.findUnique({ where: { id } });

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.json(profile);
  } catch (err) {
    next(err);
  }
});

// PATCH /profile/:id
profileRouter.patch("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body; // ideally validate with zod

    const updated = await prisma.user.update({
      where: { id },
      data,
    });

    res.json(updated);
  } catch (err) {
    next(err);
  }
});
