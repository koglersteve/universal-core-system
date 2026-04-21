export interface AgentMeta {
  id: string;
  name: string;
  color: string;
  description: string;
}

const AGENTS: Record<string, AgentMeta> = {
  observer: {
    id: "observer",
    name: "Observer",
    color: "#7dd3fc",
    description: "Calm, descriptive, emotionally neutral perspective.",
  },
  chaos: {
    id: "chaos",
    name: "Chaos",
    color: "#f87171",
    description: "Escalates tension and amplifies dramatic energy.",
  },
  innerVoice: {
    id: "innerVoice",
    name: "Inner Voice",
    color: "#c084fc",
    description: "Reflective, identity‑focused commentary.",
  },
};

export function getAgentMeta(id?: string | null): AgentMeta | null {
  if (!id) return null;
  return AGENTS[id] ?? {
    id,
    name: id,
    color: "#9ca3af",
    description: "Neutral emotional tone.",
  };
}
