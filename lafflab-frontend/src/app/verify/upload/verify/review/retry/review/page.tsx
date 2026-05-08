import React from "react";
import VerifyReview from "@/components/verify/VerifyReview";
import { getUserIdentity } from "@/lib/server/user";

export default async function VerifyRetryReviewPage() {
  try {
    const user = await getUserIdentity();

    const details = {
      userId: user.id,
      review: {}, // required by VerifyReviewProps
    };

    return (
      <div className="p-4">
        <VerifyReview details={details} />
      </div>
    );
  } catch {
    return (
      <div className="p-4 text-red-500 font-semibold">
        Unable to load retry review screen.
      </div>
    );
  }
}
