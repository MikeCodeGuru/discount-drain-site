import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, Router as WouterRouter } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import PageLoader from "@/components/dd/PageLoader";
import ScrollToTop from "@/components/ScrollToTop";

// NotFound stays eagerly loaded — it's tiny and needed for the fallback route
import NotFound from "@/pages/NotFound";

// ─── Lazy-loaded route chunks ────────────────────────────────────────────────
// Each lazy() call creates a separate JS chunk that is only fetched when the
// user navigates to that route, reducing the initial bundle from ~1.2 MB to
// a small shell + the home page chunk.

// Core pages
const DiscountDrainHome = lazy(() => import("@/pages/dd/DDHome"));
const DDAbout           = lazy(() => import("@/pages/dd/DDAbout"));
const DDResidential     = lazy(() => import("@/pages/dd/DDResidential"));
const DDCommercial      = lazy(() => import("@/pages/dd/DDCommercial"));
const DDContact         = lazy(() => import("@/pages/dd/DDContact"));
const DDQuote           = lazy(() => import("@/pages/dd/DDQuote"));

// Services
const DDServices        = lazy(() => import("@/pages/dd/DDServices"));
const DDServiceDetail   = lazy(() => import("@/pages/dd/DDServiceDetail"));

// Blog (heaviest — markdown content + syntax highlighting)
const DDBlog            = lazy(() => import("@/pages/dd/DDBlog"));
const DDBlogPost        = lazy(() => import("@/pages/dd/DDBlogPost"));

// Service area
const DDServiceArea     = lazy(() => import("@/pages/dd/DDServiceArea"));
const DDTownLanding     = lazy(() => import("@/pages/dd/DDTownLanding"));

// ─── Router ──────────────────────────────────────────────────────────────────

// Detect base path for GitHub Pages subdirectory deployments.
// Vite sets import.meta.env.BASE_URL to /discount-drain-site/ when
// GITHUB_PAGES=true is set in the build environment (see vite.config.ts).
// Wouter's base prop strips this prefix from all route matching so that
// <Route path="/"> matches /discount-drain-site/ on GitHub Pages.
const BASE = import.meta.env.BASE_URL?.replace(/\/$/, "") || "";

function Router() {
  return (
    // WouterRouter base strips the /discount-drain-site prefix on GitHub Pages.
    // Suspense wraps the entire Switch so any lazy chunk shows the PageLoader
    // while its JS is being fetched and parsed.
    <WouterRouter base={BASE}>
      <ScrollToTop />
      <Suspense fallback={<PageLoader variant="page" />}>
        <Switch>
          {/* V2 Production site — root paths */}
          <Route path={"/"} component={DiscountDrainHome} />
          <Route path={"/about"} component={DDAbout} />
          <Route path={"/services"} component={DDServices} />
          <Route path={"/services/:slug"} component={DDServiceDetail} />
          <Route path={"/residential"} component={DDResidential} />
          <Route path={"/commercial"} component={DDCommercial} />
          <Route path={"/contact"} component={DDContact} />
          <Route path={"/blog"} component={DDBlog} />
          <Route path={"/blog/:slug"} component={DDBlogPost} />
          <Route path={"/quote"} component={DDQuote} />
          <Route path={"/service-area"} component={DDServiceArea} />
          <Route path={"/service-area/:townSlug"} component={DDTownLanding} />

          {/* Fallback */}
          <Route path={"/404"} component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </WouterRouter>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
