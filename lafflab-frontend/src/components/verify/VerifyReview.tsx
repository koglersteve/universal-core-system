"use client";

export type VerifyReviewProps = {
  details: {
    userId: string;
    review: Record<string, any>;
  };
};

export default function VerifyReview({ details }: VerifyReviewProps) {
  return (
    <div className="space-y-4 text-white">
      <h2 className="text-xl font-semibold">Review Details</h2>

      <div className="p-4 rounded-lg bg-white/5 border border-white/10">
        <p className="font-semibold">User ID: {details.userId}</p>

        <pre className="mt-2 text-sm text-white/70 whitespace-pre-wrap">
          {JSON.stringify(details.review, null, 2)}
        </pre>
      </div>
    </div>
  );
}
