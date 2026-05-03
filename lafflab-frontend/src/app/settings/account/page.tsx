"use client";

import { useState } from "react";
import AppShell from "@/components/AppShell";

export default function AccountSettings() {
  const [name, setName] = useState("Creator");
  const [email, setEmail] = useState("user@example.com");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <AppShell title="Account Settings">
      <div className="space-y-[var(--space-6)]">

        {/* Display Name */}
        <div className="space-y-[var(--space-2)]">
          <label className="text-[var(--text-sm)] text-white/70">Display Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-[var(--space-3)] bg-white/5 border border-white/10 rounded-lg text-white"
          />
        </div>

        {/* Email */}
        <div className="space-y-[var(--space-2)]">
          <label className="text-[var(--text-sm)] text-white/70">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-[var(--space-3)] bg-white/5 border border-white/10 rounded-lg text-white"
          />
        </div>

        {/* Password */}
        <div className="space-y-[var(--space-2)]">
          <label className="text-[var(--text-sm)] text-white/70">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full p-[var(--space-3)] bg-white/5 border border-white/10 rounded-lg text-white"
          />
        </div>

        {/* Delete Account */}
        <div className="pt-[var(--space-4)]">
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="text-red-400 text-[var(--text-sm)] underline"
          >
            Delete Account
          </button>

          {showDeleteConfirm && (
            <div className="mt-[var(--space-4)] p-[var(--space-4)] bg-red-500/10 border border-red-500/20 rounded-lg space-y-[var(--space-3)]">
              <p className="text-red-300 text-[var(--text-sm)]">
                Are you sure you want to delete your account? This action cannot be undone.
              </p>

              <div className="flex gap-[var(--space-3)]">
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg">
                  Yes, Delete
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 bg-white/10 text-white rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
