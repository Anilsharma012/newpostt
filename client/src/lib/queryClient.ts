import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    let url: string;
    const parts = queryKey as (string | Record<string, any>)[];

    if (typeof parts[0] === 'string') {
      url = parts[0] as string;
      for (let i = 1; i < parts.length; i++) {
        const part = parts[i];
        if (typeof part === 'string') {
          url += `/${encodeURIComponent(part)}`;
        } else if (part && typeof part === 'object') {
          const params = new URLSearchParams();
          for (const [k, v] of Object.entries(part)) {
            if (v !== undefined && v !== null && v !== '') params.set(k, String(v));
          }
          const qs = params.toString();
          if (qs) url += (url.includes('?') ? '&' : '?') + qs;
        }
      }
    } else {
      url = (queryKey.join('/') as string);
    }

    const res = await fetch(url, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
