import prisma from "@/shared/prisma.js";
import { z } from "zod";

export default function profileRoutes(app: any) {
  app.get("/", (c: any) => {
    return c.json({
      message: "Profile API online",
      updatedAt: Date.now()
    });
  });
}
