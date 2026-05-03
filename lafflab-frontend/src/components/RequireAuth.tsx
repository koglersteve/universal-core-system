"use client";

import { ReactNode, useEffect } from "react";
import { useSession } from "@/hooks/useSession";
import { useRouter } from "next/navigation";

export function RequireAuth({ children }: { children: ReactNode }) {
  const { isAuthenticated, loading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="p-4 text-white/70 text-sm">
        Checking authentication…
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
