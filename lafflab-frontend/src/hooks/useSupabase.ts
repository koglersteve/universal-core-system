"use client";

import { useMemo } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";

export function useSupabase() {
  const client = useMemo(() => createSupabaseBrowserClient(), []);
  return client;
}
