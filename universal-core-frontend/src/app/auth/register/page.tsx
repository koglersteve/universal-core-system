import { useMood } from "@/context/MoodContext";

"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { AuthCard } from "@/components/auth/AuthCard";
import { AuthField } from "@/components/auth/AuthField";
import { AuthButton } from "@/components/auth/AuthButton";

export default function RegisterPage() {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister() {
    await register(email, password);
  }

  return (
    <div className="auth-container">
      <AuthCard title="Create Account">
        <AuthField label="Email" type="email" value={email} onChange={setEmail} />
        <AuthField label="Password" type="password" value={password} onChange={setPassword} />

        <AuthButton>Create Account</AuthButton>

        <div className="auth-links">
          <Link href="/auth/login">Already have an account?</Link>
        </div>
      </AuthCard>
    </div>
  );
}
