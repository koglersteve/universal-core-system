export function connectReactionStream(onEvent: (event: any) => void) {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/core/reactions/stream`;

  const source = new EventSource(url, { withCredentials: false });

  source.onmessage = (msg) => {
    try {
      const data = JSON.parse(msg.data);
      onEvent(data);
    } catch (err) {
      console.error("Stream parse error:", err);
    }
  };

  source.onerror = (err) => {
    console.error("Reaction stream error:", err);
  };

  return () => source.close();
}