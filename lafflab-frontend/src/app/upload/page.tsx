"use client";

import { useEffect, useRef, useState } from "react";
import ErrorState from "@/components/ui/ErrorState";
import { EmptyState, EmptyUploadIcon } from "@/components/ui/EmptyState";

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "video/mp4",
  "video/quicktime",
  "audio/mpeg",
  "audio/wav",
];

type QueueStatus = "pending" | "uploading" | "success" | "error" | "canceled";

type QueueItem = {
  id: string;
  file: File;
  previewUrl?: string;
  kind: "image" | "video" | "audio" | "other";
  duration?: number;
  width?: number;
  height?: number;
  status: QueueStatus;
  progress: number;
  error?: string;
};

export default function UploadPage() {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [online, setOnline] = useState<boolean>(true);

  const xhrRefs = useRef<Record<string, XMLHttpRequest>>({});
  const processingRef = useRef(false);

  useEffect(() => {
    setOnline(navigator.onLine);
    const onOnline = () => setOnline(true);
    const onOffline = () => setOnline(false);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  useEffect(() => {
    processQueue();
  }, [queue, online]);

  function classifyFile(file: File): QueueItem["kind"] {
    if (file.type.startsWith("image/")) return "image";
    if (file.type.startsWith("video/")) return "video";
    if (file.type.startsWith("audio/")) return "audio";
    return "other";
  }

  function validateFiles(selected: FileList | null) {
    if (!selected) return;

    const newItems: QueueItem[] = [];
    const invalid: string[] = [];

    Array.from(selected).forEach((file) => {
      if (!ALLOWED_TYPES.includes(file.type)) {
        invalid.push(file.name);
        return;
      }

      const id = `${file.name}-${file.size}-${file.lastModified}`;
      const kind = classifyFile(file);
      const previewUrl =
        kind === "image" || kind === "video" ? URL.createObjectURL(file) : undefined;

      newItems.push({
        id,
        file,
        kind,
        previewUrl,
        status: "pending",
        progress: 0,
      });
    });

    if (invalid.length > 0) {
      setError(`Unsupported file types: ${invalid.join(", ")}`);
    } else {
      setError(null);
    }

    setQueue((prev) => [...prev, ...newItems]);
    newItems.forEach((item) => {
      if (item.kind === "video") loadVideoMetadata(item);
      if (item.kind === "audio") fakeAudioWaveform(item);
    });
  }

  function loadVideoMetadata(item: QueueItem) {
    if (!item.previewUrl) return;
    const video = document.createElement("video");
    video.src = item.previewUrl;
    video.preload = "metadata";
    video.onloadedmetadata = () => {
      const duration = video.duration;
      const width = video.videoWidth;
      const height = video.videoHeight;

      if (duration > 60 || width < 720 || height < 720) {
        setQueue((prev) =>
          prev.map((q) =>
            q.id === item.id
              ? {
                  ...q,
                  status: "error",
                  error:
                    "Video must be ≤ 60s and at least 720p in both width and height.",
                }
              : q
          )
        );
      } else {
        setQueue((prev) =>
          prev.map((q) =>
            q.id === item.id ? { ...q, duration, width, height } : q
          )
        );
      }
    };
  }

  function fakeAudioWaveform(item: QueueItem) {
    setQueue((prev) =>
      prev.map((q) =>
        q.id === item.id ? { ...q, duration: Math.random() * 60 } : q
      )
    );
  }

  function cancelUpload(id: string) {
    const xhr = xhrRefs.current[id];
    if (xhr) {
      xhr.abort();
    }
    setQueue((prev) =>
      prev.map((q) =>
        q.id === id ? { ...q, status: "canceled", progress: 0 } : q
      )
    );
  }

  function retryUpload(id: string) {
    setQueue((prev) =>
      prev.map((q) =>
        q.id === id ? { ...q, status: "pending", progress: 0, error: undefined } : q
      )
    );
  }

  async function processQueue() {
    if (processingRef.current) return;
    if (!online) return;

    const next = queue.find((q) => q.status === "pending");
    if (!next) return;

    processingRef.current = true;
    try {
      await uploadSingle(next);
    } finally {
      processingRef.current = false;
      processQueue();
    }
  }

  function uploadSingle(item: QueueItem): Promise<void> {
    return new Promise((resolve) => {
      if (item.status === "error" || item.status === "canceled") {
        return resolve();
      }

      const form = new FormData();
      form.append("file", item.file);

      const xhr = new XMLHttpRequest();
      xhrRefs.current[item.id] = xhr;

      setQueue((prev) =>
        prev.map((q) =>
          q.id === item.id ? { ...q, status: "uploading", progress: 0 } : q
        )
      );

      xhr.open("POST", `${process.env.NEXT_PUBLIC_API_URL}/posts`);

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const pct = Math.round((e.loaded / e.total) * 100);
          setQueue((prev) =>
            prev.map((q) =>
              q.id === item.id ? { ...q, progress: pct } : q
            )
          );
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          setQueue((prev) =>
            prev.map((q) =>
              q.id === item.id
                ? { ...q, status: "success", progress: 100 }
                : q
            )
          );
        } else {
          setQueue((prev) =>
            prev.map((q) =>
              q.id === item.id
                ? {
                    ...q,
                    status: "error",
                    error: `Upload failed: ${xhr.statusText}`,
                  }
                : q
            )
          );
        }
        resolve();
      };

      xhr.onerror = () => {
        setQueue((prev) =>
          prev.map((q) =>
            q.id === item.id
              ? {
                  ...q,
                  status: "error",
                  error: "Network error during upload.",
                }
              : q
          )
        );
        resolve();
      };

      xhr.onabort = () => {
        setQueue((prev) =>
          prev.map((q) =>
            q.id === item.id
              ? { ...q, status: "canceled", error: "Upload canceled." }
              : q
          )
        );
        resolve();
      };

      xhr.send(form);
    });
  }

  const showEmpty = queue.length === 0;

  return (
    <div className="p-6 space-y-6 text-white page-shell">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Upload</h1>
        {!online && (
          <span className="text-xs px-2 py-1 rounded bg-red-500/20 text-red-300 border border-red-500/40">
            Offline — uploads will resume when you’re back online
          </span>
        )}
      </div>

      <input
        type="file"
        multiple
        onChange={(e) => validateFiles(e.target.files)}
        className="text-white"
      />

      {error && <ErrorState message={error} />}

      {showEmpty ? (
        <EmptyState
          title="No uploads yet"
          subtitle="Select files to begin uploading."
          icon={EmptyUploadIcon}
        />
      ) : (
        <div className="space-y-4 animate-fadeIn">
          {queue.map((item) => (
            <div
              key={item.id}
              className="border border-white/10 rounded p-3 space-y-2 bg-white/5 card-elevated"
            >
              <div className="flex items-center gap-3">
                {item.kind === "image" && item.previewUrl && (
                  <img
                    src={item.previewUrl}
                    alt={item.file.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}

                {item.kind === "video" && item.previewUrl && (
                  <video
                    src={item.previewUrl}
                    className="w-16 h-16 object-cover rounded"
                    muted
                  />
                )}

                {item.kind === "audio" && (
                  <div className="w-16 h-16 flex items-center justify-center rounded bg-white/10 text-xs text-white/70">
                    {item.duration
                      ? `${Math.round(item.duration)}s`
                      : "Audio"}
                  </div>
                )}

                <div className="flex-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{item.file.name}</span>
                    <span className="text-white/60 text-xs uppercase">
                      {item.status}
                    </span>
                  </div>

                  {item.kind === "video" && item.width && item.height && (
                    <div className="text-xs text-white/60">
                      {item.width}×{item.height} ·{" "}
                      {item.duration ? `${Math.round(item.duration)}s` : ""}
                    </div>
                  )}

                  {item.error && (
                    <div className="text-xs text-red-400 mt-1">
                      {item.error}
                    </div>
                  )}

                  <div className="w-full h-2 bg-white/10 rounded overflow-hidden mt-2">
                    <div
                      className="h-full bg-white/40 transition-soft"
                      style={{ width: `${item.progress || 0}%` }}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  {item.status === "uploading" && (
                    <button
                      onClick={() => cancelUpload(item.id)}
                      className="text-xs px-2 py-1 rounded bg-red-500/20 text-red-300 border border-red-500/40 transition-soft"
                    >
                      Cancel
                    </button>
                  )}

                  {item.status === "error" && (
                    <button
                      onClick={() => retryUpload(item.id)}
                      className="text-xs px-2 py-1 rounded bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 transition-soft"
                    >
                      Retry
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
