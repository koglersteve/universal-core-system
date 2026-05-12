import "./globals.css";
import SessionProvider from "@/context/SessionProvider";

export default function Component({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
