/**
 * Prisma 7 inlineSchema configuration
 *
 * This file MUST live inside the /prisma directory so that Prisma
 * detects it during `prisma generate` inside Docker.
 *
 * IMPORTANT:
 * - `schema` must be "./schema.prisma" because this file is already
 *   inside the prisma folder.
 * - inlineSchema MUST be true for PrismaClient() to work without
 *   datasourceUrl or adapters.
 * - datasource.url MUST be provided here because schema.prisma
 *   cannot contain `url = env("DATABASE_URL")` in Prisma 7.
 */

import { defineConfig } from "@prisma/config";

export default defineConfig({
  schema: "./schema.prisma",   // <-- FIXED PATH
  inlineSchema: true,
  datasource: {
    db: {
      url: process.env.DATABASE_URL!,  // embedded into generated client
    },
  },
});
