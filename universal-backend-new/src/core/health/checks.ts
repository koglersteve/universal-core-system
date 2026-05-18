import prisma from "@/shared/prisma.js";

export async function healthChecks() {
  return {
    database: await prisma.$queryRaw`SELECT 1`.then(() => "ok").catch(() => "error"),
    timestamp: Date.now()
  };
}
