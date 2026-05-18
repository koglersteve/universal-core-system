import prisma from "@/shared/prisma.js";
import { z } from "zod";

export default function lafflabRoutes(app: any) {
  app.get("/", async (c: any) => {
    return c.json({
      message: "Lafflab API online",
      updatedAt: Date.now()
    });
  });

  app.post("/", async (c: any) => {
    const body = await c.req.json();
    const schema = z.object({
      content: z.string()
    });
    const data = schema.parse(body);

    const created = await prisma.lafflabPost
      .create({ data: { content: data.content } })
      .catch(() => null);

    return c.json({ ok: true, created });
  });
}
