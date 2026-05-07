import Link from "next/link";
import RefreshCwIcon from "@components/icons/RefreshCwIcon";

export default function VerifyUploadVerifyReviewRetryPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 text-center text-white">
      <div className="space-y-6">
        <div className="flex justify-center">
          <RefreshCwIcon className="w-16 h-16 text-yellow-400" />
        </div>

        <h1 className="text-3xl font-bold">Retry Review</h1>
        <p className="text-gray-300">
          Your verification review requires updates. Please re-upload corrected documents.
        </p>

        <Link
          href="/verify/upload"
          className="inline-block px-4 py-2 rounded bg-white/10 border border-white/20 hover:bg-white/20 transition"
        >
          Re-upload Documents
        </Link>
      </div>
    </div>
  );
}
