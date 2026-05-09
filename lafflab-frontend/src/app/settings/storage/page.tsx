export default function StorageSettings() {
  return (
    <div className="min-h-screen bg-black text-white p-6 space-y-6">
      <h1 className="text-2xl font-bold">Data & Storage</h1>

      <div className="space-y-4">
        <div className="p-4 bg-neutral-900 rounded-lg">
          <p className="text-lg font-semibold">Cache</p>
          <p className="text-neutral-400">Clear cached images and data</p>
        </div>

        <div className="p-4 bg-neutral-900 rounded-lg">
          <p className="text-lg font-semibold">Downloads</p>
          <p className="text-neutral-400">Manage downloaded media</p>
        </div>
      </div>
    </div>
  );
}
