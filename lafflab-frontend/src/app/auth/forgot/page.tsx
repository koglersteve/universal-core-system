"use client";

import ResetPasswordForm from "@/components/forms/ResetPasswordForm";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();

  async function handleReset({ email }: { email: string }) {
    // Call your API route that triggers Supabase reset
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) throw new Error("Reset failed");

    router.push("/auth/forgot/success");
  }

  return (
    <div className="max-w-md mx-auto p-6 text-white space-y-6">
      <h1 className="text-2xl font-bold">Forgot Password</h1>
      <p className="text-white/60">
        Enter your email and we’ll send you a reset link.
      </p>

      <ResetPasswordForm onSubmit={handleReset} />
    </div>
  );
}
