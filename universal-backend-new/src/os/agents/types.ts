export type AgentRole = "planner" | "observer" | "executor" | "critic" | "custom";

export interface AgentContext {
  id: string;
  role: AgentRole;
}

export interface Agent {
  id: string;
  name: string;
  role: AgentRole;
  start?: () => Promise<void> | void;
  stop?: () => Promise<void> | void;
  onEvent?: (event: string, payload: any, ctx: AgentContext) => Promise<void> | void;
}
