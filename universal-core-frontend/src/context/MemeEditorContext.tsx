"use client";

import React, { createContext, useContext, useState } from "react";

interface MemeEditorState {
  text: string;
  image: string | null;
  layers: any[];
}

interface MemeEditorContextValue {
  state: MemeEditorState;
  setState: React.Dispatch<React.SetStateAction<MemeEditorState>>;
}

const MemeEditorContext = createContext<MemeEditorContextValue | undefined>(undefined);

export function MemeEditorProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<MemeEditorState>({
    text: "",
    image: null,
    layers: []
  });

  return (
    <MemeEditorContext.Provider value={{ state, setState }}>
      {children}
    </MemeEditorContext.Provider>
  );
}

export function useMemeEditor() {
  const ctx = useContext(MemeEditorContext);
  if (!ctx) throw new Error("useMemeEditor must be used inside MemeEditorProvider");
  return ctx;
}
