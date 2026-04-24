import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aurelia BuildLab",
  description: "Code Builder & Code Simulator — Aurelia-Q Labs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav className="border-b border-navy-700 bg-navy-800">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <a href="/" className="text-xl font-bold text-teal-400">
              Aurelia BuildLab
            </a>
            <div className="flex gap-6">
              <a href="/builder" className="text-sm font-medium text-slate-300 hover:text-teal-300 transition-colors">
                Code Builder
              </a>
              <a href="/simulator" className="text-sm font-medium text-slate-300 hover:text-teal-300 transition-colors">
                Code Simulator
              </a>
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="border-t border-navy-700 bg-navy-800 mt-auto">
          <div className="mx-auto max-w-7xl px-6 py-6 text-center text-sm text-slate-500">
            © 2026 Aurelia-Q Labs. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
