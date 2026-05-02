import "./globals.css";
import { MenuDrawer } from "@/components/MenuDrawer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-b from-brand-dark via-black to-brand-purple text-white">
        
        {/* Top Bar */}
        <header className="flex items-center justify-between p-4 bg-black/40 backdrop-blur border-b border-white/10">
          <MenuDrawer />
          <h1 className="text-xl font-extrabold tracking-tight">LAFFLab</h1>
          <div className="w-8" /> {/* Spacer for symmetry */}
        </header>

        {/* Page Content */}
        <main className="p-4 max-w-xl mx-auto space-y-6">
          {children}
        </main>

      </body>
    </html>
  );
}
