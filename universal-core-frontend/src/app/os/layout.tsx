// SERVER-ONLY LAYOUT FOR /os
// This isolates the OS page from the global client layout.

export default function OSLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
