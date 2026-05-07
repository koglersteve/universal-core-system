import UploadScreen from "@components/upload/UploadScreen";
import ErrorState from "@components/ui/ErrorState";
import { getUploadSession } from "@lib/server/upload";

export default async function UploadPage() {
  try {
    const session = await getUploadSession();

    return (
      <div className="p-4">
        <UploadScreen session={session} />
      </div>
    );
  } catch {
    return <ErrorState message="Failed to initialize upload session." />;
  }
}

