import type { UniverseContext } from "../middleware/universe.types";

declare module "hono" {
  interface ContextVariableMap {
    universe: UniverseContext;
  }
}
