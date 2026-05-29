import type { ResonanceContext, ResonanceResult } from "../crossapp.types.js";

import { Attention } from "./attention.js";
import { Intent } from "./intent.js";
import { Harmony } from "./harmony.js";
import { Identity } from "./identity.js";
import { Memory } from "./memory.js";
import { OSState } from "./state.js";
import { Tempo } from "./tempo.js";

import { Behavior } from "./behavior.js";
import { Boundary } from "./boundary.js";
import { Cognitive } from "./cognitive.js";
import { Emotion } from "./emotion.js";
import { Energy } from "./energy.js";
import { Ethics } from "./ethics.js";
import { Persona } from "./persona.js";
import { World } from "./world.js";
import { Multiverse } from "./multiverse.js";

export type EmotionalOSSnapshot = {
  attention: ReturnType<typeof Attention.snapshot>;
  intent: ReturnType<typeof Intent.snapshot>;
  harmony: ReturnType<typeof Harmony.snapshot>;
  identity: ReturnType<typeof Identity.snapshot>;
  memory: ReturnType<typeof Memory.snapshot>;
  state: ReturnType<typeof OSState.snapshot>;
  tempo: ReturnType<typeof Tempo.snapshot>;
};

export type EmotionalOSView = {
  core: EmotionalOSSnapshot;
  behavior: ReturnType<typeof Behavior.derive>;
  boundary: ReturnType<typeof Boundary.derive>;
  cognitive: ReturnType<typeof Cognitive.derive>;
  emotion: ReturnType<typeof Emotion.derive>;
  energy: ReturnType<typeof Energy.derive>;
  ethics: ReturnType<typeof Ethics.derive>;
  persona: ReturnType<typeof Persona.derive>;
  world: ReturnType<typeof World.derive>;
  multiverse: ReturnType<typeof Multiverse.derive>;
};

export class EmotionalOS {
  static onResonance(ctx: ResonanceContext, res: ResonanceResult) {
    Attention.update(ctx, res);
    Intent.update(ctx, res);
    Harmony.update(ctx, res);
    Identity.update(ctx, res);
    Memory.update(ctx, res);
    OSState.update(Harmony.snapshot(), res);
    Tempo.markEvent();
  }

  static snapshot(userId: string): EmotionalOSView {
    const core: EmotionalOSSnapshot = {
      attention: Attention.snapshot(userId),
      intent: Intent.snapshot(userId),
      harmony: Harmony.snapshot(),
      identity: Identity.snapshot(userId),
      memory: Memory.snapshot(userId),
      state: OSState.snapshot(),
      tempo: Tempo.snapshot(),
    };

    return {
      core,
      behavior: Behavior.derive(core),
      boundary: Boundary.derive(core),
      cognitive: Cognitive.derive(core),
      emotion: Emotion.derive(core),
      energy: Energy.derive(core),
      ethics: Ethics.derive(core),
      persona: Persona.derive(core),
      world: World.derive(core),
      multiverse: Multiverse.derive(core),
    };
  }
}

/**
 * Required by resonance.service.ts
 * This exposes the current OS state for any module that needs it.
 */
export function getOSState(userId: string): EmotionalOSView {
  return EmotionalOS.snapshot(userId);
}
