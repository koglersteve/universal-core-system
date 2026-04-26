"use client";

import Link from "next/link";
import "./globals.css";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";

function AppShell({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <body
      style={{
        margin: 0,
        padding: 0,
        background: "var(--bg)",
        color: "var(--text)",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 640,
          margin: "0 auto",
          padding: "24px",
        }}
      >
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            marginBottom: "24px",
            borderBottom: "1px solid var(--border-subtle)",
            paddingBottom: "12px",
          }}
        >
          <div style={{ display: "flex", gap: "16px" }}>
            <Link href="/">Home</Link>
            <Link href="/categories">Categories</Link>
            <Link href="/favorites">Favorites</Link>
            <Link href="/history">History</Link>
            <Link href="/ritual">Ritual</Link>
          </div>

          <button
            onClick={toggleTheme}
            style={{
              border: "1px solid var(--border-subtle)",
              background: "var(--bg-card)",
              color: "var(--text)",
              padding: "6px 10px",
              borderRadius: "999px",
              fontSize: "12px",
            }}
          >
            {theme === "light" ? "Dark mode" : "Light mode"}
          </button>
        </nav>

        {children}
      </div>
    </body>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ThemeProvider>
        <AppShell>{children}</AppShell>
      </ThemeProvider>
    </html>
  );
}

