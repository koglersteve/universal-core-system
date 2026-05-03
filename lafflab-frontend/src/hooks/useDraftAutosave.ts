import { useEffect, useRef } from "react";

export function useDraftAutosave(key: string, value: string) {
  const firstRun = useRef(true);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }

    const timeout = setTimeout(() => {
      localStorage.setItem(key, value);
    }, 500);

    return () => clearTimeout(timeout);
  }, [key, value]);
}

export function loadDraft(key: string): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(key) || "";
}

export function clearDraft(key: string) {
  if (typeof window === "undefined") return;
  localStorage.removeItem(key);
}
