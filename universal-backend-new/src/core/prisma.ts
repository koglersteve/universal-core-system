import { PrismaClient } from "@prisma/client";
import pino from "pino";
import { loadConfig } from "./config/config";

const config = loadConfig();
const logger = pino({ level: config.LOG_LEVEL });

declare global {
  // eslint-disable-next-line no-var
  var __PRISMA_CLIENT__: PrismaClient | undefined;
}

const prismaClient = global.__PRISMA_CLIENT__ ?? new PrismaClient({
  log: config.NODE_ENV === "development"
    ? ["query", "info", "warn", "error"]
    : ["warn", "error"],
});

if (!global.__PRISMA_CLIENT__) {
  global.__PRISMA_CLIENT__ = prismaClient;
  prismaClient.$connect()
    .then(() => logger.info("Prisma connected"))
    .catch((err) => {
      logger.error({ err }, "Prisma connection failed");
      process.exit(1);
    });
}

export const prisma = prismaClient;
