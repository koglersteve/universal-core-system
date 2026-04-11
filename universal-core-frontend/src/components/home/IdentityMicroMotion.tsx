"use client";

import { ReactNode } from "react";
import { useIdentityStore } from "@/state/useIdentityStore";

type IdentityMicroMotionProps = {
  children: ReactNode;
};

export function IdentityMicroMotion({ children }: IdentityMicroMotionProps) {
  const trait = useIdentityStore((s) => s.trait);

  const className = `identity-micromotion identity-trait-${
    trait || "calm"
  }`;

  return <div className={className}>{children}</div>;
}
