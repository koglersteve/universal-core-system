import prisma from "@/shared/prisma.js";
import { nanoid } from "nanoid";
import { z } from "zod";

export default function postRoutes(app: any) {
  app.get("/", async (c: any) => {
    return c.json({ posts: [] });
  });

  app.post("/", async (c: any) => {
    const body = await c.req.json();
    const schema = z.object({ content: z.string() });
    const data = schema.parse(body);

    return c.json({
      ok: true,
      created: {
        id: nanoid(),
        content: data.content
      }
    });
  });
}
