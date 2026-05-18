import prisma from "@/shared/prisma.js";
import { z } from "zod";

export default function lafflabRoutes(app: any) {
  app.get("/", async (c: any) => {
    return c.json({
      message: "Module Lafflab API online",
      updatedAt: Date.now()
    });
  });
}
