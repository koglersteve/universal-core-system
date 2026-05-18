import prisma from "@/shared/prisma.js";

export default function feedRoutes(app: any) {
  app.get("/", async (c: any) => {
    // Example: simple stub
    const posts = await prisma.post.findMany().catch(() => []);
    return c.json({
      posts,
      message: "Feed API online",
      updatedAt: Date.now()
    });
  });
}
