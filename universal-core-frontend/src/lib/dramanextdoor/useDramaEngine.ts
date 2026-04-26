"use client";

import { useState, useCallback } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://universal-core-backend-production.up.railway.app";

export function useDramaEngine() {
  const [scene, setScene] = useState(null);
  const [feed, setFeed] = useState([]);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- Initialize Drama Engine ---
  const initializeDrama = useCallback(async (identity) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_BASE}/dramanextdoor/start`);
      const data = await res.json();

      if (!data?.token) {
        throw new Error("Invalid start response");
      }

      setToken(data.token);

      // Immediately load the first scene
      await loadScene("neutral");
    } catch (err) {
      setError(err.message || "Failed to initialize drama");
    } finally {
      setLoading(false);
    }
  }, []);

  // --- Load a Scene ---
  const loadScene = useCallback(async (mood = "neutral") => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_BASE}/dramanextdoor/scene?mood=${mood}`);
      const data = await res.json();

      if (!data?.scene) {
        throw new Error("Invalid scene response");
      }

      setScene(data.scene);

      // Add to feed
      setFeed((prev) => [
        `Loaded scene: ${data.scene.title}`,
        ...prev,
      ]);
    } catch (err) {
      setError(err.message || "Failed to load scene");
    } finally {
      setLoading(false);
    }
  }, []);

  // --- Move to Next Scene ---
  const nextScene = useCallback(async (tension = 1) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_BASE}/dramanextdoor/next`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tension }),
      });

      const data = await res.json();

      if (!data?.next) {
        throw new Error("Invalid next scene response");
      }

      setScene(data.next);

      // Add to feed
      setFeed((prev) => [
        `Next scene: ${data.next.title}`,
        ...prev,
      ]);
    } catch (err) {
      setError(err.message || "Failed to load next scene");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    scene,
    feed,
    token,
    loading,
    error,
    initializeDrama,
    loadScene,
    nextScene,
  };
}
