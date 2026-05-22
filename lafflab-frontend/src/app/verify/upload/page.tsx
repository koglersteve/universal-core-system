"use client";

import { useState } from "react";

export default function VerifyUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState(null);

  async function handleUpload() {
    if (!file) return;

    const form = new FormData();
    form.append("file", file);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/verify/upload`,
      {
        method: "POST",
        body: form,
      }
    );

    const data = await res.json();
    setResult(data);
  }

  return (
    <div className="p-6 text-white space-y-4">
      <h1 className="text-2xl font-semibold">Upload Verification</h1>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        className="text-white"
      />

      <button
        onClick={handleUpload}
        className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition"
      >
        Upload
      </button>

      {result && (
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <p>Upload Result: {result.status}</p>
        </div>
      )}
    </div>
  );
}

