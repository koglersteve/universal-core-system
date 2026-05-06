export const dynamic = "force-dynamic";

"use client";

import { useEffect } from "react";
import { useSupabase } from "@/hooks/useSupabase";
import { useRouter } from "next/navigation";
import AppShell from "@/components/AppShell";

export default function LogoutPage() {
  const supabase = useSupabase();
  const router = useRouter();

  useEffect(() => {
    async function run() {
      await supabase.auth.signOut();
      router.push("/login");
    }
    run();
  }, [supabase, router]);

  return (
    <AppShell title="Logging out">
      <p className="text-white/70 text-sm">
        Logging you out…
      </p>
    </AppShell>
  );
}
