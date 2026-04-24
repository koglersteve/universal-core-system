// universal-core-frontend/src/pages/dramanextdoor/start.tsx

import dynamic from "next/dynamic";

// This disables ALL SSR for this page.
// Next.js will ONLY load the component on the client.
const StartClient = dynamic(() => import("./start.client"), {
  ssr: false,
});

export default function Start() {
  return <StartClient />;
}

