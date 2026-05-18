import prisma from "@/shared/prisma.js";

export default function idlyilyRoutes(app: any) {
  app.get("/", async (c: any) => {
    return c.json({
      message: "Idlyily API online",
      updatedAt: Date.now()
    });
  });
}
