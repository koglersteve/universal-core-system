import Link from "next/link";

export default function SettingsHome() {
  return (
    <div className="space-y-4">
      <Link href="/settings/account" className="block text-lg">Account</Link>
      <Link href="/settings/notifications" className="block text-lg">Notifications</Link>
      <Link href="/settings/privacy" className="block text-lg">Privacy</Link>
      <Link href="/settings/creator" className="block text-lg">Creator Mode</Link>
      <Link href="/settings/theme" className="block text-lg">Theme</Link>
      <Link href="/settings/storage" className="block text-lg">Data & Storage</Link>
    </div>
  );
}
