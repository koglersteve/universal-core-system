import emotion, { EmotionState } from "./emotion.js";
import cognitive, { CognitiveState } from "./cognitive.js";
import memory, { MemoryState } from "./memory.js";
import behavior, { BehaviorState } from "./behavior.js";
import intent, { IntentState } from "./intent.js";
import identity, { IdentityState } from "./identity.js";
import persona, { PersonaState } from "./persona.js";
import energy, { EnergyState } from "./energy.js";
import ethics, { EthicsState } from "./ethics.js";
import harmony, { HarmonyState } from "./harmony.js";
import signal, { SignalState } from "./signal.js";
import tempo, { TempoState } from "./tempo.js";

export interface OSState {
  emotion: EmotionState;
  cognitive: CognitiveState;
  memory: MemoryState;
  behavior: BehaviorState;
  intent: IntentState;
  identity: IdentityState;
  persona: PersonaState;
  energy: EnergyState;
  ethics: EthicsState;
  harmony: HarmonyState;
  signal: SignalState;
  tempo: TempoState;
}

export const state: OSState = {
  emotion,
  cognitive,
  memory,
  behavior,
  intent,
  identity,
  persona,
  energy,
  ethics,
  harmony,
  signal,
  tempo
};

export default state;

