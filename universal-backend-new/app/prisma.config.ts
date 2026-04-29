/**
 * Prisma 7 inlineSchema configuration
 *
 * This file lives at the project root (inside Docker: /app/prisma.config.ts)
 * so schema paths MUST be relative to that root.
 *
 * Correct schema location inside Docker:
 *   /app/prisma/schema.prisma
 */

import { defineConfig } from "@prisma/config";

export default defineConfig({
  schema: "./prisma/schema.prisma",   // <-- THIS IS THE CORRECT PATH
  inlineSchema: true,
  datasource: {
    db: {
      url: process.env.DATABASE_URL!,
    },
  },
});
