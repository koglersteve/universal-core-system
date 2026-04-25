// src/lib/api/httpClient.ts

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface RequestOptions {
  method?: HttpMethod;
  body?: any;
  headers?: Record<string, string>;
}

async function request<T>(url: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, headers = {} } = options;

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    let message = `Request failed with status ${res.status}`;
    try {
      const errorJson = await res.json();
      if (errorJson?.error) message = errorJson.error;
    } catch {
      // ignore JSON parse errors
    }
    throw new Error(message);
  }

  // Allow endpoints that return no content
  if (res.status === 204) {
    return undefined as T;
  }

  return (await res.json()) as T;
}

export async function httpGet<T>(url: string): Promise<T> {
  return request<T>(url, { method: "GET" });
}

export async function httpPost<T>(url: string, body: any): Promise<T> {
  return request<T>(url, { method: "POST", body });
}
