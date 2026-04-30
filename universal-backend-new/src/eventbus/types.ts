export type CoreEvent =
  | "memory:new_entry"
  | "emotion:changed"
  | "persona:updated"
  | "cognitive:reframed"
  | "behavior:nudged"
  | "kernel:health_warning"
  | "kernel:health_critical"
  | "autonomy:decision_executed";

export interface CoreEventPayloads {
  "memory:new_entry": { id: string; kind: string };
  "emotion:changed": { from: string; to: string };
  "persona:updated": { id: string };
  "cognitive:reframed": { id: string };
  "behavior:nudged": { id: string; type: string };
  "kernel:health_warning": { message: string };
  "kernel:health_critical": { message: string };
  "autonomy:decision_executed": { action: string; goalId?: string };
}
