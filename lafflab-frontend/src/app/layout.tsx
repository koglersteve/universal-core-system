import Link from "next/link";
import "./globals.css";
import AnalyticsTracker from "@/components/AnalyticsTracker";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="app-header">
          <nav className="app-nav">
            <Link href="/">Feed</Link>
            <Link href="/history">History</Link>
            <Link href="/creator">Creator</Link>
          </nav>
        </header>

        <AnalyticsTracker />

        <main className="app-main">{children}</main>
      </body>
    </html>
  );
}
