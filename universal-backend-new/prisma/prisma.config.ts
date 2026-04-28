import { defineConfig } from "@prisma/config";

export default defineConfig({
  schema: "./prisma/schema.prisma",
  inlineSchema: true,
  datasource: {
    db: {
      url: process.env.DATABASE_URL!,
    },
  },
});
