import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function lafflabRoutes(app: FastifyInstance) {
  // Base route
  app.get("/lafflab", async () => ({
    service: "LAFFlab",
    status: "online",
    endpoints: ["/lafflab/memes", "/lafflab/jokes", "/lafflab/quotes", "/lafflab/gifs", "/lafflab/random"]
  }));

  // Get all memes
  app.get("/lafflab/memes", async () => {
    return prisma.lAFFItem.findMany({
      where: { type: "meme" },
      orderBy: { createdAt: "desc" }
    });
  });

  // Get all jokes
  app.get("/lafflab/jokes", async () => {
    return prisma.lAFFItem.findMany({
      where: { type: "joke" },
      orderBy: { createdAt: "desc" }
    });
  });

  // Get all quotes
  app.get("/lafflab/quotes", async () => {
    return prisma.lAFFItem.findMany({
      where: { type: "quote" },
      orderBy: { createdAt: "desc" }
    });
  });

  // Get all GIFs
  app.get("/lafflab/gifs", async () => {
    return prisma.lAFFItem.findMany({
      where: { type: "gif" },
      orderBy: { createdAt: "desc" }
    });
  });

  // Random LAFFlab item
  app.get("/lafflab/random", async () => {
    const items = await prisma.lAFFItem.findMany();
    if (items.length === 0) return { error: "No LAFFlab items found" };

    const random = items[Math.floor(Math.random() * items.length)];
    return random;
  });
}
