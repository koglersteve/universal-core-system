"use client";

import { useAuth } from "@/hooks/useAuth";
import { useMood } from "@/context/MoodContext";   // ← ADD THIS
import LogoutButton from "@/components/auth/LogoutButton";

export default function ProfilePage() {
  const { user } = useAuth();
  const mood = useMood();   // ← READ MOOD HERE

  return (
    <div className={`auth-container auth-${mood}`}>   {/* ← WRAP THE CARD HERE */}
      <div className="auth-card">
        <h1 className="auth-title">Your Profile</h1>

        <p>Email: {user?.email}</p>

        <LogoutButton />
      </div>
    </div>
  );
}
