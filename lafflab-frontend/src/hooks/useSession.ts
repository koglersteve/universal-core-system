"use client";

import { useContext } from "react";
import { SessionContext } from "@/context/SessionProvider";

export function useSession() {
  return useContext(SessionContext);
}
