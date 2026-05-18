import prisma from "@/shared/prisma.js";
import { z } from "zod";

export default function profileRoutes(app: any) {
  app.get("/", async (c: any) => {
    return c.json({
      message: "Profile API online",
      updatedAt: Date.now()
    });
  });

  app.post("/", async (c: any) => {
    const body = await c.req.json();
    const schema = z.object({
      userId: z.string(),
      displayName: z.string()
    });
    const data = schema.parse(body);

    const profile = await prisma.profile
      .upsert({
        where: { userId: data.userId },
        update: { displayName: data.displayName },
        create: { userId: data.userId, displayName: data.displayName }
      })
      .catch(() => null);

    return c.json({ ok: true, profile });
  });
}
