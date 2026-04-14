import { os } from "@/lib/backend";

export default async function OSPage() {
  let data = { message: "OS offline", modules: [] };

  if (process.env.NEXT_PUBLIC_BACKEND_URL) {
    try {
      data = await os("");
    } catch (e) {
      console.error("OS fetch failed during runtime:", e);
    }
  }

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">OS Dashboard</h1>
      <p className="text-gray-400">{data.message}</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {data.modules.map((m: string) => (
          <div
            key={m}
            className="p-4 border border-gray-700 rounded-lg bg-black/30"
          >
            <h2 className="text-xl font-semibold">{m}</h2>
            <p className="text-gray-500 text-sm">Subsystem online</p>
          </div>
        ))}
      </div>
    </div>
  );
}

