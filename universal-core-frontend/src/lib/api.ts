// src/lib/api.ts

export type HealthResponse = {
  status: string;
  uptime: number;
  responseTime: number;
  timestamp: number;
  version?: string;
};

export async function fetchStatus(apiUrl: string): Promise<HealthResponse> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000); // 5s timeout

  try {
    const res = await fetch(`${apiUrl}/health`, {
      method: "GET",
      signal: controller.signal
    });

    if (!res.ok) {
      throw new Error(`Health check failed: ${res.status}`);
    }

    const data = (await res.json()) as HealthResponse;

    if (process.env.NODE_ENV === "development") {
      console.log("[fetchStatus]", data);
    }

    return data;
  } catch (err) {
    throw new Error(`Unable to fetch health status: ${err}`);
  } finally {
    clearTimeout(timeout);
  }
}
