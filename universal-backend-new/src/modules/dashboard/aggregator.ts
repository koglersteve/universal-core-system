import { DashboardState } from "./types";

class DashboardAggregator {
  private state: DashboardState = {
    kernel: null,
    os: null,
    persona: null,
    memory: null,
    cognitive: null,
    emotion: null,
    behavior: null,
    autonomy: {},
    updatedAt: Date.now(),
  };

  async refresh() {
    this.state = {
      kernel: await globalThis.kernel?.getStatus?.(),
      os: await globalThis.os?.getState?.(),
      persona: await globalThis.persona?.getActive?.(),
      memory: await globalThis.memory?.getSnapshot?.(),
      cognitive: await globalThis.cognitive?.getState?.(),
      emotion: await globalThis.emotion?.getCurrent?.(),
      behavior: await globalThis.behavior?.getState?.(),
      autonomy: this.state.autonomy,
      updatedAt: Date.now(),
    };
  }

  setAutonomyDecision(action: string, goalId?: string) {
    this.state.autonomy.lastDecision = {
      action,
      goalId,
      at: Date.now(),
    };
    this.state.updatedAt = Date.now();
  }

  getState(): DashboardState {
    return this.state;
  }
}

export const dashboardAggregator = new DashboardAggregator();
