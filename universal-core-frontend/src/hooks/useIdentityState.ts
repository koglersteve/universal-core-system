"use client";

import { useState, useEffect } from "react";

export function useIdentityState() {
  const [identity, setIdentity] = useState<string | null>(null);

  useEffect(() => {
    // Placeholder: load identity from OS, auth, or profile
    setIdentity("default-user");
  }, []);

  return { identity, setIdentity };
}
