import { planNextAction } from "./planner";

type AutonomyDecision =
  | { status: "idle" }
  | {
      status: "ready";
      action: string;
      args: any;
      goalId?: string | null;
      run?: () => Promise<any>;
    };

export class AutonomyEngine {
  private running = false;
  private interval: any;
  private tickInterval: number;
  private policies: any;

  constructor(opts: { tickInterval: number; policies: any }) {
    this.tickInterval = opts.tickInterval;
    this.policies = opts.policies;
  }

  start() {
    if (this.running) return;
    this.running = true;

    this.interval = setInterval(() => this.tick(), this.tickInterval);
  }

  stop() {
    this.running = false;
    clearInterval(this.interval);
  }

  async tick() {
    const state = {}; // TODO: real state later

    const decision: AutonomyDecision = await planNextAction(
      state,
      this.policies
    );

    // Idle path
    if (decision.status === "idle") {
      console.log("[Autonomy] Idle");
      return;
    }

    // Ready path
    if (decision.goalId) {
      globalThis.goals.complete(decision.goalId);
    }

    if (decision.run) {
      try {
        const result = await decision.run();
        console.log("[Autonomy] Action executed:", decision.action, result);
      } catch (err) {
        console.error("[Autonomy] Action failed:", decision.action, err);
      }
    }
  }
}
