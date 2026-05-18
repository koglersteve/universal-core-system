import { registerOSRoutes } from "@/os/os.routes.js";
import { registerCognitiveRoutes } from "@/os/cognitive.routes.js";
import { registerBehaviorRoutes } from "@/os/behavior.routes.js";

export function createKernel() {
  // In a more advanced version, this would wire up internal OS subsystems.
  return {
    register(app: any) {
      registerOSRoutes(app);
      registerCognitiveRoutes(app);
      registerBehaviorRoutes(app);
    }
  };
}
