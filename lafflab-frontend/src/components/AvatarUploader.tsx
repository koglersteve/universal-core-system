"use client";

import { useState } from "react";

export default function AvatarUploader({
  onUploaded,
}: {
  onUploaded: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);

  async function handleFile(e: any) {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const res = await fetch("/api/avatar/upload-url");
    const { uploadUrl, fileUrl } = await res.json();

    await fetch(uploadUrl, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    });

    setUploading(false);
    onUploaded(fileUrl);
  }

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFile} />
      {uploading && <div className="text-white/60 mt-2">Uploading…</div>}
    </div>
  );
}
