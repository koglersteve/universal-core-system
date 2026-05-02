"use client";

export default function UploadSuccessPage() {
  return (
    <div className="p-6 text-white space-y-4">
      <h1 className="text-2xl font-bold">Upload Complete</h1>

      <p className="text-white/70">
        Your files have been uploaded successfully.
      </p>

      <a
        href="/upload"
        className="inline-block px-4 py-2 rounded bg-white/10 border border-white/20 hover:bg-white/20 transition"
      >
        Upload More
      </a>

      <a
        href="/creator"
        className="inline-block ml-3 px-4 py-2 rounded bg-white/10 border border-white/20 hover:bg-white/20 transition"
      >
        Go to Creator Dashboard
      </a>
    </div>
  );
}
