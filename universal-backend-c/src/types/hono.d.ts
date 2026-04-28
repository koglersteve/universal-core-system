import "hono";

declare module "hono" {
  interface ContextVariableMap {
    universeId: string;
    universe: any;
    universeState: any;
  }
}
