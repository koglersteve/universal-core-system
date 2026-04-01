"use client";

import { createContext, useContext, ReactNode, useMemo } from "react";
import { useEmotionalIdentity } from "@/hooks/useEmotionalIdentity";
import { useEmotionalPhysics } from "@/hooks/useEmotionalPhysics";
import { useMoodHistory } from "@/hooks/useMoodHistory";
import { useEmotionalMultiverse } from "@/hooks/useEmotionalMultiverse";
import { useEmotionalAgents } from "@/hooks/useEmotionalAgents";
import { useEmotionalTheme } from "@/context/EmotionalThemeContext";
import { useEmotionalGovernance } from "@/hooks/useEmotionalGovernance";

type EmotionalExport = {
  identity: unknown;
  physics: unknown;
  history: unknown;
  multiverse: unknown;
  agents: unknown;
  theme: unknown;
  governance: unknown;
  exportedAt: number;
};

type ExportContextType = {
  exportOS: () => EmotionalExport;
};

const EmotionalExportContext = createContext<ExportContextType | undefined>(undefined);

export function EmotionalExportProvider({ children }: { children: ReactNode }) {
  const identity = useEmotionalIdentity();
  const physics = useEmotionalPhysics();
  const history = useMoodHistory();
  const multiverse = useEmotionalMultiverse();
  const agents = useEmotionalAgents();
  const theme = useEmotionalTheme();
  const governance = useEmotionalGovernance();

  const exportOS = useMemo(
    () => () => ({
      identity,
      physics,
      history,
      multiverse,
      agents,
      theme,
      governance,
      exportedAt: Date.now()
    }),
    [identity, physics, history, multiverse, agents, theme, governance]
  );

  const value = useMemo(() => ({ exportOS }), [exportOS]);

  return (
    <EmotionalExportContext.Provider value={value}>
      {children}
    </EmotionalExportContext.Provider>
  );
}

export function useEmotionalExport() {
  const ctx = useContext(EmotionalExportContext);
  if (!ctx) throw new Error("useEmotionalExport must be used inside EmotionalExportProvider");
  return ctx;
}
