import "./globals.css";
import AppShell from "@/components/AppShell";

export const metadata = {
  title: "LAFFlab",
  description: "LAFFlab App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
