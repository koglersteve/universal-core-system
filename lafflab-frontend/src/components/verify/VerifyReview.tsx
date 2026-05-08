import React from "react";

export type VerifyReviewProps = {
  details: {
    userId: string;
    review: Record<string, any>;
  };
};

export default function VerifyReview({ details }: VerifyReviewProps) {
  return (
    <div className="space-y-4">
      <div className="text-lg font-semibold">Review Details</div>

      <div className="p-4 border rounded-md bg-gray-50">
        <p><strong>User ID:</strong> {details.userId}</p>
        <pre className="mt-2 text-sm whitespace-pre-wrap">
          {JSON.stringify(details.review, null, 2)}
        </pre>
      </div>
    </div>
  );
}
