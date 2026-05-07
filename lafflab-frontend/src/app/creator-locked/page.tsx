import Link from "next/link";
import { Lock } from "lucide-react";

export default function CreatorLockedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center space-y-6">
      <div className="p-4 rounded-full bg-gray-800/50">
        <Lock className="h-10 w-10 text-gray-300" />
      </div>

      <h1 className="text-2xl font-semibold text-gray-200">Creator Mode Locked</h1>

      <p className="text-gray-400 max-w-md">
        Creator Mode gives you access to advanced publishing tools, analytics, templates, and collaboration features.
        Apply now to unlock your creator profile.
      </p>

      <Link
        href="/settings/creator"
        className="px-5 py-2.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium"
      >
        Apply for Creator Access
      </Link>
    </div>
  );
}
