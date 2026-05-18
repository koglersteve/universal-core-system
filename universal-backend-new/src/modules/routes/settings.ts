import prisma from "@/shared/prisma.js";

export default function settingsRoutes(app: any) {
  app.get("/", async (c: any) => {
    return c.json({
      message: "Settings API online",
      updatedAt: Date.now()
    });
  });
}
