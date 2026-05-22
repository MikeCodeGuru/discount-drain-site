/**
 * usePrefetchRoutes
 *
 * Injects <link rel="prefetch"> tags for the specified routes after the
 * component mounts and the browser is idle. This triggers Vite's lazy chunk
 * download in the background so subsequent navigations feel instant.
 *
 * Uses requestIdleCallback (with setTimeout fallback) so it never competes
 * with the initial page render.
 *
 * Usage:
 *   usePrefetchRoutes(["/services", "/contact"]);
 */

import { useEffect } from "react";

// Vite exposes the module graph via import.meta.glob. We use it to find the
// chunk URL for a given page module path without hard-coding hashed filenames.
const pageModules = import.meta.glob("../pages/dd/*.tsx");

// Map from route path → module specifier
const ROUTE_MODULE_MAP: Record<string, string> = {
  "/services":  "../pages/dd/DDServices.tsx",
  "/contact":   "../pages/dd/DDContact.tsx",
  "/about":     "../pages/dd/DDAbout.tsx",
  "/blog":      "../pages/dd/DDBlog.tsx",
  "/quote":     "../pages/dd/DDQuote.tsx",
};

function prefetchRoute(routePath: string) {
  const moduleKey = ROUTE_MODULE_MAP[routePath];
  if (!moduleKey || !pageModules[moduleKey]) return;

  // Calling the dynamic import triggers Vite to fetch + cache the chunk.
  // The browser will not re-execute it when the user navigates there.
  (pageModules[moduleKey] as () => Promise<unknown>)().catch(() => {
    // Silently ignore prefetch failures — they are non-critical
  });
}

export function usePrefetchRoutes(routes: string[]) {
  useEffect(() => {
    const run = () => routes.forEach(prefetchRoute);

    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(run, { timeout: 3000 });
      return () => cancelIdleCallback(id);
    } else {
      const id = setTimeout(run, 2000);
      return () => clearTimeout(id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
