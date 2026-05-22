"use client";

import { useEffect, useState } from "react";

export default function VerifyPage() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/verify/status`)
      .then((res) => res.json())
      .then(setStatus);
  }, []);

  return (
    <div className="p-6 text-white space-y-4">
      <h1 className="text-2xl font-semibold">Verification</h1>

      {status ? (
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <p>Status: {status.state}</p>
        </div>
      ) : (
        <p className="text-white/60">Loading…</p>
      )}
    </div>
  );
}

