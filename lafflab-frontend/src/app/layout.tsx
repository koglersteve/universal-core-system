import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "LAFFLab",
  description: "AI-powered joke and humor experience",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
