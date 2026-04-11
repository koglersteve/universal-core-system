"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useMood } from "@/hooks/useMood";                 // ← FIXED
import { useIdentityStore } from "@/state/useIdentityStore"; // ← FIXED

export default function LogoutButton() {
  const router = useRouter();
  const { logout } = useAuth();

  const { mood } = useMood();                               // ← FIXED
  const trait = useIdentityStore((s) => s.trait);            // ← FIXED

  function handleLogout() {
    logout();
    router.push("/auth/login");
  }

  return (
    <button
      onClick={handleLogout}
      className={`logout-btn logout-${mood || "neutral"} logout-trait-${trait || "calm"}`}
    >
      Logout
    </button>
  );
}
