"use client";

type OSProps = {
  message: string;
  canonical?: boolean;
  version?: string;
  activeUniverse?: string;
  modules: string[];
};

export default function OSDashboard({
  message,
  canonical,
  version,
  activeUniverse,
  modules,
}: OSProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">OS Dashboard</h1>
        <p className="text-gray-400 mt-1">{message}</p>

        <div className="mt-2 text-sm text-gray-500 space-y-1">
          {canonical !== undefined && (
            <p>Canonical: {canonical ? "true" : "false"}</p>
          )}
          {version && <p>Version: {version}</p>}
          {activeUniverse && <p>Universe: {activeUniverse}</p>}
        </div>
      </div>

      {/* Modules */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Modules</h2>

        {modules.length === 0 ? (
          <p className="text-gray-500 text-sm">No modules reported.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {modules.map((m) => (
              <div
                key={m}
                className="p-4 border border-gray-700 rounded-lg bg-black/30"
              >
                <h3 className="text-lg font-semibold">{m}</h3>
                <p className="text-gray-500 text-sm">Subsystem online</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
