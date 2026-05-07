import Link from "next/link";
import XCircleIcon from "@components/icons/XCircleIcon";

export default function VerifyUploadVerifyReviewRetryFailurePage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 text-center text-white">
      <div className="space-y-6">
        <div className="flex justify-center">
          <XCircleIcon className="w-16 h-16 text-red-400" />
        </div>

        <h1 className="text-3xl font-bold">Retry Failed</h1>
        <p className="text-gray-300">
          Your corrected documents did not pass review. Please fix the issues and try again.
        </p>

        <Link
          href="/verify/upload"
          className="inline-block px-4 py-2 rounded bg-white/10 border border-white/20 hover:bg-white/20 transition"
        >
          Retry Upload
        </Link>
      </div>
    </div>
  );
}
