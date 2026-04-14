import { os } from "@/src/lib/backend";

export default async function OSPage() {
  const data = await os("");

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
