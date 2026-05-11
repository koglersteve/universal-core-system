export default function AccountSettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Account</h1>

      <div className="space-y-4">
        <div className="p-4 bg-neutral-900 rounded-lg">
          <p className="text-lg font-semibold">Username</p>
          <p className="text-neutral-400">Change your display name</p>
        </div>

        <div className="p-4 bg-neutral-900 rounded-lg">
          <p className="text-lg font-semibold">Email</p>
          <p className="text-neutral-400">Update your email address</p>
        </div>

        <div className="p-4 bg-neutral-900 rounded-lg">
          <p className="text-lg font-semibold">Password</p>
          <p className="text-neutral-400">Reset or change your password</p>
        </div>
      </div>
    </div>
  );
}

