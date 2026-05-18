import { Multiverse } from "../multiverse";
import { EmotionalEngine } from "../engine";

export const KernelActions = {
  summary() {
    const universe = Multiverse.ensureDefault();
    const s = universe.state;
    return {
      emotion: s.emotion,
      cognitive: s.cognitive,
      behavior: s.behavior,
      intent: s.intent,
      identity: s.identity
    };
  },

  applyEvent(event: { type: string; payload?: any }) {
    const universe = Multiverse.ensureDefault();
    universe.state = EmotionalEngine.applyEvent(universe.state, {
      type: event.type as any,
      payload: event.payload
    });
    return universe.state;
  }
};
