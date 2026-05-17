import { FastifyInstance } from "fastify";
import { prisma } from "../prisma";

export default async function profileRoutes(app: FastifyInstance) {
  app.get("/profile/:id", async (req, reply) => {
    const { id } = req.params as { id: string };

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        posts: true
      }
    });

    if (!user) {
      return reply.status(404).send({ error: "User not found" });
    }

    return reply.send(user);
  });
}

