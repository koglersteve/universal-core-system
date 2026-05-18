import prisma from "@/shared/prisma.js";

export default function hoaMemeRoutes(app: any) {
  app.get("/", async (c: any) => {
    return c.json({
      message: "HoaMeme API online",
      updatedAt: Date.now()
    });
  });
}
