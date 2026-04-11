"use client";

import { useAuth } from "@/hooks/useAuth";
import { useMood } from "@/hooks/useMood";   // ← FIXED
import LogoutButton from "@/components/auth/LogoutButton";

export default function ProfilePage() {
  const { user } = useAuth();
  const { mood } = useMood();   // ← FIXED

  return (
    <div className={`auth-container auth-${mood || "neutral"}`}>
      <div className="auth-card">
        <h1 className="auth-title">Your Profile</h1>

        <p>Email: {user?.email}</p>

        <LogoutButton />
      </div>
    </div>
  );
}
