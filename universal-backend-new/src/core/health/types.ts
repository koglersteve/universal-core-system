export interface HealthStatus {
  status: "ok" | "error";
  timestamp: number;
  checks: Record<string, any>;
}
