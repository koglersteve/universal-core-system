"use client";

import { useEmotionalAgents } from "@/hooks/useEmotionalAgents";

export function EmotionalAgentPanel() {
  const { agents } = useEmotionalAgents();

  return (
    <div className="agent-panel">
      <h3 className="agent-title">Emotional Agents</h3>

      <ul className="agent-list">
        {agents.map(agent => (
          <li key={agent.id} className="agent-item">
            <strong>{agent.name}</strong> — {agent.role}
          </li>
        ))}
      </ul>
    </div>
  );
}
