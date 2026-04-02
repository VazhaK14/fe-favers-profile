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
  const clientIp = headers.get("x-forwarded-for") || headers.get("x-real-ip");
  const originalHost =
    headers.get("x-forwarded-host") || headers.get("host") || url.host;
  const originalProto =
    headers.get("x-forwarded-proto") || url.protocol.replace(":", "");

  headers.delete("host");
  headers.delete("x-forwarded-host");
  headers.delete("x-forwarded-proto");
  headers.delete("x-forwarded-for");
  headers.delete("forwarded");
  headers.delete("accept-encoding");

  const keysToDelete: string[] = [];
  for (const key of headers.keys()) {
    if (key.toLowerCase().startsWith("x-vercel-")) {
      keysToDelete.push(key);
    }
  }
  keysToDelete.forEach((key) => headers.delete(key));

  headers.set("host", targetUrl.host);
  if (originalHost) headers.set("x-forwarded-host", originalHost);
  if (originalProto) headers.set("x-forwarded-proto", originalProto);
  if (clientIp) headers.set("x-forwarded-for", clientIp);

  // Mencegah CSRF Error dari Better-Auth karena Origin Frontend tidak terdaftar di backend
  // Kita manipulasi Origin agar seolah-olah request berasal dari Backend itu sendiri
  headers.set("origin", new URL(API_URL).origin);

  const init: RequestInit = {
    method: request.method,
    headers,
  };

  if (request.method !== "GET" && request.method !== "HEAD") {
    init.body = request.body;
    // @ts-ignore - duplex is required for streaming request bodies
    init.duplex = "half";
  }

  const response = await fetch(targetUrl, init);

  const responseHeaders = new Headers(response.headers);
  responseHeaders.delete("content-encoding");
  responseHeaders.delete("content-length");

  const data = await response.arrayBuffer();

  return new Response(data, {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders,
  });
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  return proxyRequest(request, params);
}

export async function action({ request, params }: ActionFunctionArgs) {
  return proxyRequest(request, params);
}
