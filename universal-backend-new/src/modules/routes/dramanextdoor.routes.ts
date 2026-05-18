import prisma from "@/shared/prisma.js";

export default function dramaNextDoorRoutes(app: any) {
  app.get("/", async (c: any) => {
    return c.json({
      message: "DramaNextDoor API online",
      updatedAt: Date.now()
    });
  });
}
