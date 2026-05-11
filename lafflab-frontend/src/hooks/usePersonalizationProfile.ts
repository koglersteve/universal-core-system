"use client";

import { useEffect, useState } from "react";
import { LaffLabApi } from "@/lib/api";

export function usePersonalizationProfile(userId: string) {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await LaffLabApi.getSettings();
      setProfile(data);
      setLoading(false);
    }
    load();
  }, [userId]);

  return { profile, loading };
}
