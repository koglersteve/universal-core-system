import prisma from "@/shared/prisma.js";

export default function memeMyDogRoutes(app: any) {
  app.get("/", async (c: any) => {
    return c.json({
      message: "MemeMyDog API online",
      updatedAt: Date.now()
    });
  });
}
