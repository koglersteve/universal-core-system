"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/logout", { method: "POST" }).finally(() => {
      router.replace("/login");
    });
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center text-gray-300">
      Logging you out…
    </div>
  );
}
