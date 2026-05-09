"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/ToastProvider";

export default function ExampleForm({ onSubmit }) {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit?.();
      toast("Success!", "success");
    } catch {
      toast("Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <button disabled={loading}>
        {loading ? "Saving…" : "Save"}
      </button>
    </form>
  );
}
