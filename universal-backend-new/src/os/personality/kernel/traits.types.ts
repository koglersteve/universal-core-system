export type PersonalityTraitName =
  | "creativity"
  | "warmth"
  | "intensity"
  | "stability"
  | "expressiveness"
  | "symbolicBias";

export type TraitValue = number;

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
