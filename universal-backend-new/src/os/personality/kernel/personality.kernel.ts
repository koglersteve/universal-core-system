// src/core/os/personality/kernel/personality.kernel.ts

import { DEFAULT_PERSONALITY_PROFILE } from "./traits.config.js";
import type { PersonalityProfile } from "./traits.types.js";
import { CreativityEngine } from "./creativity.trait.js";
import { getEffectiveInfluence } from "./influence.map.js";

export class PersonalityKernel {
  private static instance: PersonalityKernel | null = null;

  private readonly profile: PersonalityProfile;
  private readonly creativityEngine: CreativityEngine;

  private constructor(profile?: PersonalityProfile) {
    this.profile = profile ?? DEFAULT_PERSONALITY_PROFILE;
    this.creativityEngine = new CreativityEngine(this.profile);
  }

  static getInstance(profile?: PersonalityProfile): PersonalityKernel {
    if (!PersonalityKernel.instance) {
      PersonalityKernel.instance = new PersonalityKernel(profile);
    }
    return PersonalityKernel.instance;
  }

  getProfile(): PersonalityProfile {
    return this.profile;
  }

  getCreativityEngine(): CreativityEngine {
    return this.creativityEngine;
  }

  getInfluence() {
    return getEffectiveInfluence(this.profile);
  }

  shapeIdentityName(name: string, app?: string) {
    return this.creativityEngine.shapeIdentityName(name, {
      domain: "identity",
      app,
    });
  }
}
