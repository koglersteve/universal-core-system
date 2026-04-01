"use client";

import { useIdentityTrait } from "@/context/EmotionalIdentityContext";

export function IdentityMicroMotion({ children }: { children: React.ReactNode }) {
  const trait = useIdentityTrait();

  return (
    <div className={`identity-motion ${trait || ""}`}>
      {children}
    </div>
  );
}
