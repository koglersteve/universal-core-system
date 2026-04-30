export type InsightSeverity = "info" | "warning" | "critical";

export interface Insight {
  id: string;
  type: string;
  message: string;
  severity: InsightSeverity;
  createdAt: number;
  context?: any;
}
