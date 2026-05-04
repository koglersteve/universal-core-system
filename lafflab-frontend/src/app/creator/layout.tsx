"use client";

import { useSession } from "@/hooks/useSession";
import { useRouter } from "next/navigation";

export default function CreatorLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useSession();
  const router = useRouter();

  if (!loading && !isAuthenticated) {
    router.replace("/login");
    return null;
  }

  return <>{children}</>;
}
