import { pluginAutonomyActions } from "./pluginActions";
import { pluginCapabilityRouter } from "../plugins/runtime/capabilityRouter";

export async function planNextAction(state: any, policies: any) {
  // existing logic…

  // Add plugin autonomy actions
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

  // choose best action…
}
