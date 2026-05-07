import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "LAFFLab",
  description: "Comedy feed, reactions, creators, and more.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}
