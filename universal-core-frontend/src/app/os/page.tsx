import { os } from "@/lib/backend";
import OSDashboard from "@/components/OSDashboard";

export default async function OSPage() {
  const res = await os("");

  const data = {
    message: res.message ?? "OS online",
    canonical: res.canonical,
    version: res.version,
    activeUniverse: res.activeUniverse,
    modules: res.modules ?? [],
    _api: res._api ?? null,
  };

  const modules = (data.modules || []).map((m: any) =>
    typeof m === "string" ? m : m.name ?? "unknown"
  );

  return (
    <div className="p-8 space-y-6">
      <OSDashboard
        message={data.message}
        canonical={data.canonical}
        version={data.version}
        activeUniverse={data.activeUniverse}
        modules={modules}
      />

      {/* Debug block */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2">OS Debug</h2>
        <pre className="text-xs bg-black/40 p-4 rounded border border-gray-700 overflow-x-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  );
}

