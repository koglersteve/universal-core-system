import prisma from "@/shared/prisma.js";

export default function categoriesRoutes(app: any) {
  app.get("/", async (c: any) => {
    return c.json({
      categories: [],
      message: "Categories API online",
      updatedAt: Date.now()
    });
  });
}
