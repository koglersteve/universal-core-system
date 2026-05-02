import "./globals.css";
import { MenuDrawer } from "@/components/MenuDrawer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        {/* Top Bar */}
        <header className="flex items-center justify-between p-4 border-b bg-white">
          <MenuDrawer />
          <h1 className="text-xl font-bold">LAFFLab</h1>
          <div className="w-8" /> {/* Spacer for symmetry */}
        </header>

        {/* Page Content */}
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
