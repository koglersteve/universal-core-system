"use client";

export default function ErrorPage({ error }: { error: Error }) {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
      <p className="text-red-600">{error.message}</p>
    </main>
  );
}
