import RitualScreen from "@/components/ritual/RitualScreen";
import { getRituals } from "@/lib/server/rituals";

export default async function RitualPage() {
  const rituals = await getRituals();

  return (
    <div className="p-4">
      <RitualScreen rituals={rituals} />
    </div>
  );
}

