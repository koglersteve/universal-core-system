"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-4 px-4 py-4 border-b border-white/10">
        <button onClick={() => router.back()}>
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-semibold">Settings</h1>
      </div>

      {/* Page Content */}
      <div className="flex-1 p-6 space-y-6">
        {children}
      </div>
    </div>
  );
}
