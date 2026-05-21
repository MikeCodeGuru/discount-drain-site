import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

// Mockup variations (kept for reference)
import Home from "./pages/Home";
import HomeV2 from "./pages/HomeV2";
import HomeV3 from "./pages/HomeV3";
import HomeV4 from "./pages/HomeV4";
import HomeV5 from "./pages/HomeV5";

// Production site pages
import DiscountDrainHome from "@/pages/dd/DDHome";
import DDAbout from "@/pages/dd/DDAbout";
import DDServices from "@/pages/dd/DDServices";
import DDServiceDetail from "@/pages/dd/DDServiceDetail";
import DDResidential from "@/pages/dd/DDResidential";
import DDCommercial from "@/pages/dd/DDCommercial";
import DDContact from "@/pages/dd/DDContact";
import DDBlog from "@/pages/dd/DDBlog";
import DDBlogPost from "@/pages/dd/DDBlogPost";
import DDQuote from "@/pages/dd/DDQuote";
import DDServiceArea from "@/pages/dd/DDServiceArea";

// Admin CMS

import DDAdmin from "@/pages/dd/DDAdmin";

function Router() {
  return (
    <Switch>
      {/* Production site */}
      <Route path={"/site"} component={DiscountDrainHome} />
      <Route path={"/site/about"} component={DDAbout} />
      <Route path={"/site/services"} component={DDServices} />
      <Route path={"/site/services/:slug"} component={DDServiceDetail} />
      <Route path={"/site/residential"} component={DDResidential} />
      <Route path={"/site/commercial"} component={DDCommercial} />
      <Route path={"/site/contact"} component={DDContact} />
      <Route path={"/site/blog"} component={DDBlog} />
      <Route path={"/site/blog/:slug"} component={DDBlogPost} />
      <Route path={"/site/quote"} component={DDQuote} />
      <Route path={"/site/service-area"} component={DDServiceArea} />

      {/* Admin CMS */}
      <Route path={"/site/admin"} component={DDAdmin} />
      

      {/* Mockup variations */}
      <Route path={"/"} component={Home} />
      <Route path={"/v2"} component={HomeV2} />
      <Route path={"/v3"} component={HomeV3} />
      <Route path={"/v4"} component={HomeV4} />
      <Route path={"/v5"} component={HomeV5} />

      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

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
