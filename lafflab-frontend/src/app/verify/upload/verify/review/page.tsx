import VerifyReview from "@components/verify/VerifyReview";
import ErrorState from "@components/ui/ErrorState";
import { getVerificationReviewDetails } from "@lib/server/verify";

export default async function VerifyUploadVerifyReviewPage() {
  try {
    const details = await getVerificationReviewDetails();

    return (
      <div className="p-4">
        <VerifyReview details={details} />
      </div>
    );
  } catch {
    return <ErrorState message="Failed to load verification review details." />;
  }
}
