export default function PrivacySettings() {
  return (
    <div className="min-h-screen bg-black text-white p-6 space-y-6">
      <h1 className="text-2xl font-bold">Privacy</h1>

      <div className="space-y-4">
        <div className="p-4 bg-neutral-900 rounded-lg">
          <p className="text-lg font-semibold">Profile Visibility</p>
          <p className="text-neutral-400">Control who can see your profile</p>
        </div>

        <div className="p-4 bg-neutral-900 rounded-lg">
          <p className="text-lg font-semibold">Data Sharing</p>
          <p className="text-neutral-400">Manage what data is shared</p>
        </div>
      </div>
    </div>
  );
}
