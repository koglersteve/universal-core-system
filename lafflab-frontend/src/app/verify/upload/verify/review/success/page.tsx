import Link from "next/link";
import CheckCircleIcon from "@components/icons/CheckCircleIcon";

export default function VerifyUploadVerifyReviewSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 text-center text-white">
      <div className="space-y-6">
        <div className="flex justify-center">
          <CheckCircleIcon className="w-16 h-16 text-green-400" />
        </div>

        <h1 className="text-3xl font-bold">Review Approved</h1>
        <p className="text-gray-300">
          Your verification review has been successfully completed.
        </p>

        <Link
          href="/verify"
          className="inline-block px-4 py-2 rounded bg-white/10 border border-white/20 hover:bg-white/20 transition"
        >
          Return to Verification
        </Link>
      </div>
    </div>
  );
}
