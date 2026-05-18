import prisma from "@/shared/prisma.js";

export default function historyRoutes(app: any) {
  app.get("/", async (c: any) => {
    return c.json({
      history: [],
      message: "History API online",
      updatedAt: Date.now()
    });
  });
}
