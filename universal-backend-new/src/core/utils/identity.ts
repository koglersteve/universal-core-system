import { PersonalityKernel } from "@/os/personality/kernel/index.js";

export function normalizeScreenName(raw: string): string {
  const kernel = PersonalityKernel.getInstance();
  const shaped = kernel.shapeIdentityName(raw, "identity");
  return shaped.shaped;
}
