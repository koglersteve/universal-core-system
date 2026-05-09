"use client";

import { useState } from "react";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-white">
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full p-2 rounded bg-white/10 border border-white/20"
      />

      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
        className="w-full p-2 rounded bg-white/10 border border-white/20"
      />

      <button
        type="submit"
        className="px-4 py-2 rounded bg-pink-600 hover:bg-pink-700"
      >
        Sign Up
      </button>
    </form>
  );
}

