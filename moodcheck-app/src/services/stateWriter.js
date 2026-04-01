import { createMoodPacket } from "../os/osPacket";
import { sendToUniversalCore } from "../os/osBridge";

export function writeMoodState({ mood, memeReference }) {
  const packet = createMoodPacket({ mood, memeReference });
  sendToUniversalCore(packet);
  return packet;
}
