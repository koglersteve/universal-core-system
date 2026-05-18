import prisma from "@/shared/prisma.js";

export default function lafflabRoutes(app: any) {
  app.get("/", async (c: any) => {
    return c.json({
      message: "Lafflab API online",
      updatedAt: Date.now()
    });
  });
}
