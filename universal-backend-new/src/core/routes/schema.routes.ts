import { Hono } from "hono";
import { prisma } from "@/shared/prisma/client.js";

const schema = new Hono();

// TEMP: Inspect User table columns
schema.get("/user", async (c) => {
  const result = await prisma.$queryRaw`
    SELECT column_name, data_type
    FROM information_schema.columns
    WHERE table_name = 'User'
       OR table_name = 'user'
  `;
  return c.json(result);
});

export default schema;
