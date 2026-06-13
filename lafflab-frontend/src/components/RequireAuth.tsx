"use client";

import { ReactNode, useEffect } from "react";
import Link from "next/link";
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
      <div className="min-h-screen flex items-center justify-center p-6 text-white">
        <div className="text-center">
          <p className="text-sm text-white/70">Checking authentication…</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-white">
        <div className="max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 text-center shadow-xl shadow-black/20">
          <h1 className="mb-4 text-2xl font-semibold">Authentication Required</h1>
          <p className="mb-6 text-sm text-white/70">
            You need to sign in to access this page. Redirecting to login now...
          </p>
          <Link
            href="/login"
            className="inline-flex rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            Go to login
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
