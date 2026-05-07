import RitualScreen from "@components/ritual/RitualScreen";
import ErrorState from "@components/ui/ErrorState";
import { getDailyRitual } from "@lib/server/rituals";

export default async function RitualPage() {
  try {
    const ritual = await getDailyRitual();

    return (
      <div className="p-4">
        <RitualScreen ritual={ritual} />
      </div>
    );
  } catch {
    return <ErrorState message="Failed to load ritual." />;
  }
}

