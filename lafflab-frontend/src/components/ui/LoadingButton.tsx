"use client";

import { useState } from "react";

export default function LoadingButton({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => Promise<void> | void;
  className?: string;
}) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if (loading) return;
    setLoading(true);

    try {
      await onClick?.();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`px-4 py-2 rounded bg-white/20 hover:bg-white/30 transition ${className}`}
    >
      {loading ? "…" : children}
    </button>
  );
}
