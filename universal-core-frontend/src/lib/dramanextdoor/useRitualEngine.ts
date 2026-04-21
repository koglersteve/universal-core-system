import { useState } from "react";
import { RITUALS } from "./rituals";

export function useRitualEngine() {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  function completeRitual(id: string) {
    setCompleted((prev) => ({ ...prev, [id]: true }));
  }

  return {
    rituals: RITUALS,
    completed,
    completeRitual,
  };
}
