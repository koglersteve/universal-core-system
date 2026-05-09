import { Router } from "express";
import prisma from "../lib/prisma";

const router = Router();

// TEMP: replace with real auth later
const USER_ID = "demo-user-123";

router.get("/", async (req, res) => {
  let settings = await prisma.userSettings.findUnique({
    where: { userId: USER_ID }
  });

  if (!settings) {
    settings = await prisma.userSettings.create({
      data: { userId: USER_ID }
    });
  }

  res.json(settings);
});

router.patch("/", async (req, res) => {
  const updated = await prisma.userSettings.update({
    where: { userId: USER_ID },
    data: req.body
  });

  res.json(updated);
});

export default router;
