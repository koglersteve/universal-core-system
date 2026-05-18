export type HealthStatus = "up" | "degraded" | "down";

export interface HealthCheckResult {
  name: string;
  status: HealthStatus;
  details?: Record<string, unknown>;
  error?: string;
}

export interface HealthSnapshot {
  status: HealthStatus;
  checks: HealthCheckResult[];
  timestamp: string;
}
