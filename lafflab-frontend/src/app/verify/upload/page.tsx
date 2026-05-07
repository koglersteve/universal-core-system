import VerifyUpload from "@components/verify/VerifyUpload";
import ErrorState from "@components/ui/ErrorState";
import { getVerificationUploadContext } from "@lib/server/verify";

export default async function VerifyUploadPage() {
  try {
    const context = await getVerificationUploadContext();

    return (
      <div className="p-4">
        <VerifyUpload context={context} />
      </div>
    );
  } catch {
    return <ErrorState message="Failed to load verification upload." />;
  }
}
