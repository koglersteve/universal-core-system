"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useMood } from "@/hooks/useMood";   // ← FIXED
import Link from "next/link";

import { AuthCard } from "@/components/auth/AuthCard";
import { AuthField } from "@/components/auth/AuthField";
import { AuthButton } from "@/components/auth/AuthButton";

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");

  const { mood } = useMood();   // ← FIXED

  async function handleReset() {
    await resetPassword(email);
  }

  return (
    <div className={`auth-container auth-${mood || "neutral"}`}>
      <AuthCard title="Reset Password">
        <AuthField
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
        />

        <AuthButton onClick={handleReset}>Send Reset Link</AuthButton>

        <div className="auth-links">
          <Link href="/auth/login">Back to login</Link>
        </div>
      </AuthCard>
    </div>
  );
}
