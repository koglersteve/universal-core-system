export const config = {
  runtime: "experimental-edge",
  unstable_runtimeJS: false,
};

import dynamic from "next/dynamic";

const StartClient = dynamic(() => import("./start.client"), {
  ssr: false,
});

export default function Start() {
  return <StartClient />;
}

