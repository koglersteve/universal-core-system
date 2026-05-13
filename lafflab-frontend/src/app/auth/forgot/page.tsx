"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.ok) setSent(true);
  }

  return (
    <div className="max-w-md mx-auto p-6 text-white space-y-6">
      <h1 className="text-2xl font-bold">Reset Your Password</h1>

      {sent ? (
        <p>Check your email for a reset link.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded bg-white/10 border border-white/20"
          />

          <button className="px-4 py-2 rounded bg-pink-600 hover:bg-pink-700">
            Send Reset Link
          </button>
        </form>
      )}
    </div>
  );
}
