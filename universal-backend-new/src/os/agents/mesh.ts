import { agentRegistry } from "./registry";
import type { AgentContext } from "./types";
import { eventBus } from "../eventbus/bus";

class AgentMesh {
  async startAll() {
    // Start all agents
    for (const agent of agentRegistry.list()) {
      if (agent.start) await agent.start();
    }

    // Fan-out: kernel health warnings → all agents with onEvent
    eventBus.on("kernel:health_warning", async (payload) => {
      for (const agent of agentRegistry.list()) {
        if (!agent.onEvent) continue;

        const ctx: AgentContext = {
          id: agent.id,
          role: agent.role,
        };

        await agent.onEvent("kernel:health_warning", payload, ctx);
      }
    });
  }
}

export const agentMesh = new AgentMesh();
