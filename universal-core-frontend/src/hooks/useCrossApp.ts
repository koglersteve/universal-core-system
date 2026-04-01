"use client";

import { useRouter } from "next/navigation";
import type { AppId } from "@/lib/types";
import { appPaths } from "@/lib/appPaths";

export function useCrossApp() {
  const router = useRouter();

  const openApp = (id: AppId, params?: Record<string, any>) => {
    const base = appPaths[id] || `/${id}`;

    const search = params
      ? "?" + new URLSearchParams(
          Object.entries(params).reduce((acc, [k, v]) => {
            acc[k] = String(v);
            return acc;
          }, {} as Record<string, string>)
        ).toString()
      : "";

    router.push(`${base}${search}`);
  };

  const openAppSafe = (id: string, params?: Record<string, any>) => {
    if (!(id in appPaths)) {
      console.warn(`Unknown appId: ${id}`);
      return;
    }
    openApp(id as AppId, params);
  };

  return { openApp, openAppSafe };
}
