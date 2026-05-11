import type { ReactNode } from "react";

export default function LafflabLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
          background:
            "radial-gradient(circle at top left, #ffecd2 0, #fcb69f 25%, #ff9aeb 60%, #8fd3f4 100%)",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            maxWidth: 720,
            margin: "0 auto",
            padding: "24px 16px 64px",
          }}
        >
          <header
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 24,
            }}
          >
            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: 32,
                  fontWeight: 800,
                  letterSpacing: 1,
                  color: "#2b1347",
                  textShadow: "0 3px 0 rgba(255,255,255,0.8)",
                }}
              >
                LAFFLab
              </h1>
              <p
                style={{
                  margin: "4px 0 0",
                  fontSize: 14,
                  color: "#4b2b6a",
                }}
              >
                A colorful lab for testing what makes you laugh.
              </p>
            </div>
          </header>

          {children}
        </div>
      </body>
    </html>
  );
}
