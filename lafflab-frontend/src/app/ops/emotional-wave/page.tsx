import EmotionalWavePanel from "@components/ops/EmotionalWavePanel";
import ErrorState from "@components/ui/ErrorState";
import { getEmotionalWave } from "@lib/server/ops";

export default async function EmotionalWavePage() {
  try {
    const wave = await getEmotionalWave();

    return (
      <div className="p-4">
        <EmotionalWavePanel data={wave} />
      </div>
    );
  } catch {
    return <ErrorState message="Failed to load emotional wave data." />;
  }
}
