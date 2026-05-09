"use client";

import { useMemo } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";

export function useSupabase() {
  return useMemo(() => createSupabaseBrowserClient(), []);
}
