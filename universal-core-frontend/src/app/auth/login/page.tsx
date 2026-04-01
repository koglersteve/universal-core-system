"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useMood } from "@/context/MoodContext";   // ← ADD THIS
import Link from "next/link";

import { AuthCard } from "@/components/auth/AuthCard";
import { AuthField } from "@/components/auth/AuthField";
import { AuthButton } from "@/components/auth/AuthButton";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const mood = useMood();   // ← READ MOOD HERE

  async function handleLogin() {
    await login(email, password);
  }

  return (
    <div className={`auth-container auth-${mood}`}>   {/* ← WRAP THE CARD HERE */}
      <AuthCard title="Welcome Back">
        <AuthField
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
        />

        <AuthField
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
        />

        <AuthButton>Login</AuthButton>

        <div className="auth-links">
          <Link href="/auth/forgot">Forgot password</Link>
          <Link href="/auth/register">Create account</Link>
        </div>
      </AuthCard>
    </div>
  );
}
