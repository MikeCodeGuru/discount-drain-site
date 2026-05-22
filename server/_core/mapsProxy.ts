import type { Express, Request, Response } from "express";
import { ENV } from "./env";

/**
 * Server-side Google Maps proxy.
 *
 * The Forge maps proxy validates the request Origin against the project's
 * registered domains. In development the browser's Origin is the Vite dev
 * server URL which is not a registered domain, so the request is rejected.
 *
 * This Express middleware solves that by:
 *   1. Receiving the maps script/tile request from the browser at /api/maps-proxy/*
 *   2. Re-issuing it to forge.manus.ai/v1/maps/proxy/* from the server, which
 *      does not send an Origin header and therefore bypasses the origin check.
 *   3. The server injects its own API key into the upstream URL.
 *   4. Streaming the response back to the browser.
 */
export function registerMapsProxy(app: Express) {
  app.use("/api/maps-proxy", async (req: Request, res: Response) => {
    const forgeBase = (ENV.forgeApiUrl || "https://forge.manus.ai").replace(/\/+$/, "");
    const forgeKey = ENV.forgeApiKey;

    if (!forgeBase || !forgeKey) {
      res.status(500).send("Maps proxy not configured");
      return;
    }

    // Build the upstream URL: strip the /api/maps-proxy prefix and append to forge base.
    // Inject the server-side key as the `key` query param (required by the Forge proxy).
    const parsedUrl = new URL(req.url, "http://localhost");
    parsedUrl.searchParams.set("key", forgeKey);
    const upstreamPath = parsedUrl.pathname + parsedUrl.search;
    const upstreamUrl = `${forgeBase}/v1/maps/proxy${upstreamPath}`;

    try {
      const upstreamResp = await fetch(upstreamUrl, {
        method: req.method,
        headers: {
          Authorization: `Bearer ${forgeKey}`,
          // Forward content-type for POST requests
          ...(req.headers["content-type"]
            ? { "Content-Type": req.headers["content-type"] as string }
            : {}),
        },
        // Forward body for POST requests
        body:
          req.method !== "GET" && req.method !== "HEAD"
            ? JSON.stringify(req.body)
            : undefined,
      });

      // Forward status and headers
      res.status(upstreamResp.status);
      const contentType = upstreamResp.headers.get("content-type");
      if (contentType) {
        res.setHeader("Content-Type", contentType);
      }
      // Allow browser to cache the maps script
      const cacheControl = upstreamResp.headers.get("cache-control");
      if (cacheControl) {
        res.setHeader("Cache-Control", cacheControl);
      }
      // CORS — allow any origin since this is our own proxy
      res.setHeader("Access-Control-Allow-Origin", "*");

      // Stream the response body
      const body = await upstreamResp.arrayBuffer();
      res.end(Buffer.from(body));
    } catch (err) {
      console.error("[MapsProxy] upstream error:", err);
      res.status(502).send("Maps proxy upstream error");
    }
  });
}
