import { useState } from "react";
import { canonicalizeState } from "./canonicalization";

export function useCanonicalization() {
  const [history, setHistory] = useState<any[]>([]);

  function record(ctx: any, identity: any, world: any) {
    const canonical = canonicalizeState(ctx, identity, world);
    setHistory((prev) => [canonical, ...prev]);
    return canonical;
  }

  return {
    history,
    record,
  };
}
