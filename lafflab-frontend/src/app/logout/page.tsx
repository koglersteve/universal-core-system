"use client";
export const dynamic = "force-dynamic";

export default function LogoutPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Logged out</h1>
        <p className="text-gray-500">You have been logged out.</p>
      </div>
    </main>
  );
}
