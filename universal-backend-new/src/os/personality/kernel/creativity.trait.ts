import type { PersonalityProfile } from "./traits.types.js";

export interface CreativityContext {
  domain: "identity" | "ui" | "copy" | "reaction" | "transition" | "naming";
  app?: string;
}

export interface CreativityShapingResult<T> {
  original: T;
  shaped: T;
  creativityApplied: boolean;
  creativityLevel: number;
  notes?: string;
}

export class CreativityEngine {
  constructor(private readonly profile: PersonalityProfile) {}

  private get level(): number {
    return this.profile.traits.creativity.value;
  }

  isHigh(): boolean {
    return this.level >= 0.75;
  }

  isMedium(): boolean {
    return this.level >= 0.4 && this.level < 0.75;
  }

  isLow(): boolean {
    return this.level < 0.4;
  }

  shapeIdentityName(
    name: string,
    ctx: CreativityContext
  ): CreativityShapingResult<string> {
    const level = this.level;

    if (level < 0.35) {
      return {
        original: name,
        shaped: name,
        creativityApplied: false,
        creativityLevel: level,
      };
    }

    let shaped = name.trim();

    if (shaped.includes("@")) {
      shaped = shaped.split("@")[0];
    }

    if (/^[A-Z_0-9]+$/.test(shaped)) {
      shaped = shaped.toLowerCase();
    }

    if (this.isHigh() && shaped.length <= 3) {
      shaped = `${shaped}_signal`;
    }

    return {
      original: name,
      shaped,
      creativityApplied: shaped !== name,
      creativityLevel: level,
      notes: `Creativity shaping applied in domain=${ctx.domain}`,
    };
  }
}
