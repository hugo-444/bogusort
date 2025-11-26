const API_BASE = import.meta.env.VITE_API_URL ?? "/api";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  method: HttpMethod = "GET"
): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    method,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {})
    }
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}

