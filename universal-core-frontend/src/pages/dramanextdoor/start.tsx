export const config = {
  runtime: "edge",
  unstable_runtimeJS: false,
};

import dynamic from "next/dynamic";

// Load the client-only component
const StartClient = dynamic(() => import("./start.client"), {
  ssr: false,
});

export default function Start() {
  return <StartClient />;
}

