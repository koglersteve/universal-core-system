// src/os/insight/engine.ts
import crypto from "crypto";
import { insightStore } from "./store";
import { Insight } from "./types";
import { dashboardAggregator } from "../../modules/dashboard/aggregator";

function createInsight(
  type: string,
  message: string,
  severity: "info" | "warning" | "critical",
  context?: any
): Insight {
  return {
    id: crypto.randomUUID(),
    type,
    message,
    severity,
    createdAt: Date.now(),
    context,
  };
}

export class InsightEngine {
  async recordKernelHealthWarning(message: string) {
    const state = dashboardAggregator.getState();
    const insight = createInsight(
      "kernel:health_warning",
      message,
      "warning",
      {
        kernel: state.kernel,
        os: state.os,
      }
    );
    insightStore.add(insight);
  }

  async recordKernelHealthCritical(message: string) {
    const state = dashboardAggregator.getState();
    const insight = createInsight(
      "kernel:health_critical",
      message,
      "critical",
      {
        kernel: state.kernel,
        os: state.os,
      }
    );
    insightStore.add(insight);
  }

  async recordAutonomyDecision(action: string, goalId?: string) {
    const state = dashboardAggregator.getState();
    const insight = createInsight(
      "autonomy:decision_executed",
      `Autonomy executed action "${action}"`,
      "info",
      {
        action,
        goalId,
        autonomy: state.autonomy,
      }
    );
    insightStore.add(insight);
  }

  listRecent(limit = 50) {
    return insightStore.list(limit);
  }
}

export const insightEngine = new InsightEngine();
