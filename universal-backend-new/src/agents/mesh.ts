import { agentRegistry } from "./registry";
import type { AgentContext } from "./types";
import { eventBus } from "../eventbus/bus";

class AgentMesh {
  async startAll() {
    for (const agent of agentRegistry.list()) {
      if (agent.start) {
        await agent.start();
      }
    }

    // Fan-out events to agents that implement onEvent
    eventBus.on("any", async (payload: { event: string; data: any }) => {
      const { event, data } = payload;

      for (const agent of agentRegistry.list()) {
        if (!agent.onEvent) continue;

        const ctx: AgentContext = {
          id: agent.id,
          role: agent.role,
        };

        await agent.onEvent(event, data, ctx);
      }
    });
  }
}

export const agentMesh = new AgentMesh();
