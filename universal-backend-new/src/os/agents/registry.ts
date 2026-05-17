import type { Agent } from "./types";

class AgentRegistry {
  private agents = new Map<string, Agent>();

  register(agent: Agent) {
    if (this.agents.has(agent.id)) {
      throw new Error(`Agent already registered: ${agent.id}`);
    }
    this.agents.set(agent.id, agent);
  }

  list() {
    return Array.from(this.agents.values());
  }

  get(id: string) {
    return this.agents.get(id);
  }
}

export const agentRegistry = new AgentRegistry();
