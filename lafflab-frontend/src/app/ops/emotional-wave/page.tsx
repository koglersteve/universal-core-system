import EmotionalWavePanel from "@/components/ops/EmotionalWavePanel";
import { getEmotionalWave } from "@/lib/server/ops";

export default async function EmotionalWavePage() {
  const data = await getEmotionalWave();

  return (
    <div className="p-4">
      <EmotionalWavePanel data={data} />
    </div>
  );
}
