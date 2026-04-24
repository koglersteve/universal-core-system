import "@/app/global.css";
import { EmotionalProvider } from "@/lib/emotionalOS/EmotionalContext";

export default function App({ Component, pageProps }) {
  return (
    <EmotionalProvider>
      <Component {...pageProps} />
    </EmotionalProvider>
  );
}
