import AppShell from "@/components/AppShell";
import { SessionProvider } from "@/context/SessionProvider";

export default function LaffLabLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <AppShell>
            {children}
          </AppShell>
        </SessionProvider>
      </body>
    </html>
  );
}
