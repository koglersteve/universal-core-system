import { eventBus } from "../eventbus/bus";
import { insightEngine } from "./engine";

export function registerInsightEventHandlers() {
  eventBus.on("kernel:health_warning", async (payload) => {
    await insightEngine.recordKernelHealthWarning(payload.message);
  });

  eventBus.on("kernel:health_critical", async (payload) => {
    await insightEngine.recordKernelHealthCritical(payload.message);
  });

  eventBus.on("autonomy:decision_executed", async (payload) => {
    await insightEngine.recordAutonomyDecision(
      payload.action,
      payload.goalId
    );
  });
}
