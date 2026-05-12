"use client";

import { createContext, useContext } from "react";

export const SessionContext = createContext(null as any);

export function useSession() {
  return useContext(SessionContext);
}
