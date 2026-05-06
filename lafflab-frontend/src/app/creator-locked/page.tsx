"use client";
export const dynamic = "force-dynamic";

export default function CreatorLockedPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-2 max-w-md">
        <h1 className="text-2xl font-bold">Creator Access Locked</h1>
        <p className="text-gray-500">
          Creator tools are currently locked for this account.
        </p>
      </div>
    </main>
  );
}
