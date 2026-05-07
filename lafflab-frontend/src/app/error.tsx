"use client";

export default function GlobalError({ error }: { error: Error }) {
  return (
    <html>
      <body className="min-h-screen flex items-center justify-center text-center text-white p-6">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Something Went Wrong</h1>
          <p className="text-gray-300">{error.message}</p>
        </div>
      </body>
    </html>
  );
}
