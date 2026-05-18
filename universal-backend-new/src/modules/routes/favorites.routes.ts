import prisma from "@/shared/prisma.js";

export default function favoritesRoutes(app: any) {
  app.get("/", async (c: any) => {
    return c.json({
      favorites: [],
      message: "Favorites API online",
      updatedAt: Date.now()
    });
  });
}
