export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface HttpClientConfig {
  baseUrl: string;
  timeoutMs?: number;
}

export class HttpClient {
  private baseUrl: string;
  private timeoutMs: number;

  constructor(config: HttpClientConfig) {
    this.baseUrl = config.baseUrl.replace(/\/$/, "");
    this.timeoutMs = config.timeoutMs ?? 8000;
  }

  private withTimeout<T>(promise: Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error("Request timed out")), this.timeoutMs);
      promise
        .then(value => {
          clearTimeout(timer);
          resolve(value);
        })
        .catch(err => {
          clearTimeout(timer);
          reject(err);
        });
    });
  }

  async request<T>(path: string, method: HttpMethod = "GET", body?: unknown): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const init: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (body !== undefined) {
      init.body = JSON.stringify(body);
    }

    const response = await this.withTimeout(fetch(url, init));

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} for ${url}`);
    }

    return (await response.json()) as T;
  }

  get<T>(path: string) {
    return this.request<T>(path, "GET");
  }

  post<T>(path: string, body?: unknown) {
    return this.request<T>(path, "POST", body);
  }
}

export const laffLabHttpClient = new HttpClient({
  baseUrl: "/api/lafflab",
});
