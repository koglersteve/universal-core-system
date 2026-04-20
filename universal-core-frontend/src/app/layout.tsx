// app/layout.tsx (SERVER COMPONENT)

import "./global.css";

export const metadata = {
  title: "Emotional OS",
  description: "A constellation of emotional apps stitched into one intentional system."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}


