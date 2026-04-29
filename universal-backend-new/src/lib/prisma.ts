import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaNodePostgres } from "@prisma/adapter-node-postgres";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

const adapter = new PrismaNodePostgres(pool);

export const prisma = new PrismaClient({
  adapter,
});
