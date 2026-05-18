import prisma from "@/shared/prisma.js";

export default function jokesRoutes(app: any) {
  app.get("/", async (c: any) => {
    return c.json({
      jokes: [],
      message: "Jokes API online",
      updatedAt: Date.now()
    });
  });
}
