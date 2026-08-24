/*
 * Style direction: Study Like a Pro — la Home conserva el sitio reconstruido y
 * /prototype presenta el inventario horizontal experimental sin romper rutas existentes.
 */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import CoursePage from "./pages/CoursePage";
import Home from "./pages/Home";
import HotLinks from "./pages/HotLinks";
import NotFound from "./pages/NotFound";
import Prototype from "./pages/Prototype";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/prototype" component={Prototype} />
      <Route path="/hot-links" component={HotLinks} />
      <Route path="/404" component={NotFound} />
      <Route path="/:slug" component={CoursePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
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
