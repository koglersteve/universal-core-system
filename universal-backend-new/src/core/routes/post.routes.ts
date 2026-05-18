import prisma from "@/shared/prisma.js";
import { z } from "zod";
import { nanoid } from "nanoid";

export default function postRoutes(app: any) {
  app.get("/", async (c: any) => {
    const posts = await prisma.post.findMany().catch(() => []);
    return c.json({ posts });
  });

  app.post("/", async (c: any) => {
    const body = await c.req.json();
    const schema = z.object({
      content: z.string()
    });
    const data = schema.parse(body);

    const created = await prisma.post
      .create({
        data: {
          id: nanoid(),
          content: data.content
        }
      })
      .catch(() => null);

    return c.json({ ok: true, created });
  });
}
