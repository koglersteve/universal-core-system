// src/app/creator/layout.tsx

"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function CreatorLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, isCreator } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="p-6 text-white/70">
        Checking creator access…
      </div>
    );
  }

  if (!user) {
    router.replace("/login");
    return null;
  }

  if (!isCreator) {
    router.replace("/creator-locked");
    return null;
  }

  return <>{children}</>;
}
