/*
 * Style direction: Study Like a Pro — la portada es el inventario horizontal
 * experimental; la Home anterior queda disponible en /classic como respaldo de prueba.
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
import Pilot3D from "./pages/Pilot3D";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Prototype} />
      <Route path="/classic" component={Home} />
      <Route path="/prototype" component={Prototype} />
      <Route path="/pilot-3d" component={Pilot3D} />
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
