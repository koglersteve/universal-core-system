"use client";

import { useState } from "react";

export function useEmotionalAgents() {
  const [agents, setAgents] = useState<any[]>([]);

  return {
    agents,
    setAgents
  };
}
