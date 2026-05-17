import { eventBus } from "../bus";

export function registerAutonomyEventHandlers() {
  eventBus.on("kernel:health_warning", async (payload) => {
    globalThis.goals.add("system_stability", 10, {
      reason: payload.message,
      severity: "warning",
    });
  });

  eventBus.on("kernel:health_critical", async (payload) => {
    globalThis.goals.add("system_stability", 100, {
      reason: payload.message,
      severity: "critical",
    });
  });
}
