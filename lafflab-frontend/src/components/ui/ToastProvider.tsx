"use client";

import { createContext, useContext, useState } from "react";

const ToastContext = createContext<any>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);
  const [type, setType] = useState<"success" | "error" | null>(null);

  function toast(msg: string, t: "success" | "error") {
    setMessage(msg);
    setType(t);
    setTimeout(() => {
      setMessage(null);
      setType(null);
    }, 3000);
  }

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {message && (
        <div className="fixed bottom-4 right-4 px-4 py-2 rounded bg-black text-white">
          {message}
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
