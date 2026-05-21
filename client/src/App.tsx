import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

// V2 Production site pages
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

      {/* Admin CMS */}
      <Route path={"/admin"} component={DDAdmin} />

      {/* Fallback */}
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
