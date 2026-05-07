import VerifyScreen from "@components/verify/VerifyScreen";
import ErrorState from "@components/ui/ErrorState";
import { getVerificationContext } from "@lib/server/verify";

export default async function VerifyPage() {
  try {
    const context = await getVerificationContext();

    return (
      <div className="p-4">
        <VerifyScreen context={context} />
      </div>
    );
  } catch {
    return <ErrorState message="Failed to initialize verification." />;
  }
}
