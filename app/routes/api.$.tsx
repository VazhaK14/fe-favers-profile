import type { LoaderFunctionArgs, ActionFunctionArgs } from "react-router";

async function proxyRequest(
  request: Request,
  params: Record<string, string | undefined>,
) {
  const API_URL = process.env.API_URL || "http://localhost:3001";
  if (!API_URL) {
    return new Response("API_URL is not defined", { status: 500 });
  }

  const splat = params["*"] || "";
  const url = new URL(request.url);
  const targetUrl = new URL(`/api/${splat}${url.search}`, API_URL);

  const headers = new Headers(request.headers);
  
  // Hapus header yang bisa memicu 508 Loop Detected di Vercel (Vercel ke Vercel proxy)
  headers.delete("host");
  headers.delete("x-forwarded-host");
  headers.delete("x-forwarded-proto");
  headers.delete("x-forwarded-for");
  headers.delete("forwarded");
  
  // Hapus semua header spesifik Vercel bawaan dari request awal
  const keysToDelete: string[] = [];
  for (const key of headers.keys()) {
    if (key.toLowerCase().startsWith("x-vercel-")) {
      keysToDelete.push(key);
    }
  }
  keysToDelete.forEach(key => headers.delete(key));

  const init: RequestInit = {
    method: request.method,
    headers,
  };

  if (request.method !== "GET" && request.method !== "HEAD") {
    init.body = request.body;
    (init as any).duplex = "half";
  }

  return fetch(targetUrl, init);
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  return proxyRequest(request, params);
}

export async function action({ request, params }: ActionFunctionArgs) {
  return proxyRequest(request, params);
}
