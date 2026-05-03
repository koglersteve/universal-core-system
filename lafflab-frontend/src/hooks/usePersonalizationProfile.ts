"use client";

import { useEffect, useState } from "react";

export function usePersonalizationProfile(userId: string) {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await fetch(`/api/personalization/profile?user=${userId}`);
      const data = await res.json();
      setProfile(data);
      setLoading(false);
    }
    load();
  }, [userId]);

  return { profile, loading };
}
