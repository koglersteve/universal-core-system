import prisma from "../../shared/prisma";

export async function healthChecks() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return { database: "ok" };
  } catch (err) {
    return { database: "error", details: String(err) };
  }
}
