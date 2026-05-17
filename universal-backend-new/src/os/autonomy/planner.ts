// src/os/autonomy/planner.ts
export type AutonomyDecision =
  | { status: "idle" }
  | {
      status: "ready";
      action: string;
      args: any;
      goalId?: string | null;
      run?: () => Promise<any>;
    };

import { pluginAutonomyActions } from "./pluginActions";
import { pluginCapabilityRouter } from "../../modules/plugins/runtime/capabilityRouter";

export async function planNextAction(
  state: any,
  policies: any
): Promise<AutonomyDecision> {
  const coreActions: any[] = [];

  const pluginActions = pluginAutonomyActions.list().map((pa) => ({
    name: pa.actionName,
    priority: pa.priority,
    run: async () => {
      return pluginCapabilityRouter.call(
        pa.pluginId,
        pa.capability,
        pa.defaultArgs ?? {}
      );
    },
  }));

  const allActions = [...coreActions, ...pluginActions];

  if (allActions.length === 0) {
    return { status: "idle" };
  }

  const best = allActions.sort((a, b) => b.priority - a.priority)[0];

  return {
    status: "ready",
    action: best.name,
    args: {},
    goalId: null,
    run: best.run,
  };
}
