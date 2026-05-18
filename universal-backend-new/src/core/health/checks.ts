import { prisma } from "../prisma";
import { HealthCheckResult } from "./types";

export const dbHealthCheck = async (): Promise<HealthCheckResult> => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return { name: "database", status: "up" };
  } catch (err: any) {
    return {
      name: "database",
      status: "down",
      error: err?.message ?? "Unknown DB error",
    };
  }
};

export const makeBasicChecks = () => {
  const uptimeCheck = async (): Promise<HealthCheckResult> => ({
    name: "uptime",
    status: "up",
    details: { uptimeSeconds: process.uptime() },
  });

  return [uptimeCheck, dbHealthCheck];
};
