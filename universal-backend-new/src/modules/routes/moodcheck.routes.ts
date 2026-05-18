import prisma from "@/shared/prisma.js";

export default function moodcheckRoutes(app: any) {
  app.get("/", async (c: any) => {
    return c.json({
      message: "Moodcheck API online",
      updatedAt: Date.now()
    });
  });
}
