import { getSystemState } from "./state";
import { planNextAction } from "./planner";
import { AutonomyPolicies } from "./policies";

export class AutonomyEngine {
  private interval: NodeJS.Timeout | null = null;

  constructor(
    private config: {
      policies: AutonomyPolicies;
      tickInterval: number;
    }
  ) {}

  start() {
    console.log("[Autonomy] Starting engine...");
    this.interval = setInterval(() => this.tick(), this.config.tickInterval);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
      console.log("[Autonomy] Engine stopped.");
    }
  }

  private async tick() {
    try {
      const state = await getSystemState();
      const decision = await planNextAction(state, this.config.policies);

      if (decision.status === "execute") {
        console.log("[Autonomy] Executing:", decision.action.name);
        await decision.action.run(decision.args);

        if (decision.goalId) {
          globalThis.goals.complete(decision.goalId);
        }
      } else {
        console.log("[Autonomy] Idle:", decision.reason);
      }
    } catch (err) {
      console.error("[Autonomy] Tick error:", err);
    }
  }
}
