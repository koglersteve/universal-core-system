import { HealthSnapshot, HealthStatus } from "./types";

type HealthCheckFn = () => Promise<import("./types").HealthCheckResult>;

export class HealthMonitor {
  constructor(private checks: HealthCheckFn[]) {}

  private aggregateStatus(results: HealthSnapshot["checks"]): HealthStatus {
    if (results.some((c) => c.status === "down")) return "down";
    if (results.some((c) => c.status === "degraded")) return "degraded";
    return "up";
  }

  async snapshot(): Promise<HealthSnapshot> {
    const results = await Promise.all(this.checks.map((fn) => fn()));
    return {
      status: this.aggregateStatus(results),
      checks: results,
      timestamp: new Date().toISOString(),
    };
  }
}
