import VerifyReview from "@components/verify/VerifyReview";
import ErrorState from "@components/ui/ErrorState";
import { getVerificationRetryReviewDetails } from "@lib/server/verify";

export default async function VerifyUploadVerifyReviewRetryReviewPage() {
  try {
    const details = await getVerificationRetryReviewDetails();

    return (
      <div className="p-4">
        <VerifyReview details={details} />
      </div>
    );
  } catch {
    return <ErrorState message="Failed to load retry review details." />;
  }
}
