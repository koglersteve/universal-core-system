import prisma from "@/shared/prisma.js";

export default function memeMyCatRoutes(app: any) {
  app.get("/", async (c: any) => {
    return c.json({
      message: "MemeMyCat API online",
      updatedAt: Date.now()
    });
  });
}
