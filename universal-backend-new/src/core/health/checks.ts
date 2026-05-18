import prisma from "../../shared/api/prisma";

export async function databaseCheck() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return { database: "ok" };
  } catch (err) {
    return { database: "error" };
  }
}

export async function uptimeCheck() {
  return { uptime: process.uptime() };
}

export async function basicCheck() {
  return { alive: true };
}
