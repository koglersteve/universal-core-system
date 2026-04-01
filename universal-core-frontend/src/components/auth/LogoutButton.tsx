"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useMood } from "@/context/MoodContext";
import { useIdentityTrait } from "@/context/EmotionalIdentityContext";

export default function LogoutButton() {
  const router = useRouter();
  const { logout } = useAuth();
  const mood = useMood();
  const trait = useIdentityTrait();

  function handleLogout() {
    logout();
    router.push("/auth/login");
  }

  return (
    <button
      onClick={handleLogout}
      className={`logout-btn logout-${mood} logout-${trait}`}
    >
      Logout
    </button>
  );
}
