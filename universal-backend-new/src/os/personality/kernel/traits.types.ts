// src/core/os/personality/kernel/traits.types.ts

export type PersonalityTraitName =
  | "creativity"
  | "warmth"
  | "intensity"
  | "stability"
  | "expressiveness"
  | "symbolicBias";

export type TraitValue = number; // 0.0 - 1.0

export interface PersonalityTrait {
  name: PersonalityTraitName;
  value: TraitValue;
  description?: string;
}

export interface PersonalityProfile {
  id: "emotional-os-core";
  traits: Record<PersonalityTraitName, PersonalityTrait>;
  version: string;
  createdAt: string;
}
