"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// FINAL, SINGLE SOURCE OF TRUTH
const tabs = [
  { name: "Overview", route: "/founder/console/overview" },
  { name: "Stability", route: "/founder/console/stability" },
  { name: "Heatmaps", route: "/founder/console/heatmaps" },
  { name: "Plugin Health", route: "/founder/console/plugins" },
  { name: "Emotional Physics", route: "/founder/console/physics" },
  { name: "Narrative Analytics", route: "/founder/console/narrative" }
];

export default function FounderConsoleLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="founder-console">
      {/* Sidebar */}
      <aside className="console-sidebar">
        <h2>Founder Console</h2>

        <nav className="console-nav">
          {tabs.map((tab) => {
            const isActive = pathname === tab.route;

            return (
              <Link
                key={tab.route}
                href={tab.route}
                className={`console-tab ${isActive ? "active" : ""}`}
              >
                {tab.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="console-content">
        {children}
      </main>
    </div>
  );
}
