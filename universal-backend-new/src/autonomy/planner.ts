import { pluginAutonomyActions } from "./pluginActions";
import { pluginCapabilityRouter } from "../plugins/runtime/capabilityRouter";

export async function planNextAction(state: any, policies: any) {
  // Core actions placeholder (restore later if needed)
  const coreActions: any[] = [];

  // Plugin autonomy actions
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

  // Pick highest priority action
  const best = allActions.sort((a, b) => b.priority - a.priority)[0];

  return {
    status: "ready",
    action: best.name,
    args: {},
    goalId: null,
    run: best.run,
  };
}
