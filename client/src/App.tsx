/*
 * Style direction: Study Like a Pro — la portada es el inventario horizontal
 * experimental; la Home anterior queda disponible en /classic como respaldo de prueba.
 */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import { lazy, Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
const CoursePage = lazy(() => import("./pages/CoursePage"));
const Home = lazy(() => import("./pages/Home"));
const HotLinks = lazy(() => import("./pages/HotLinks"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Prototype = lazy(() => import("./pages/Prototype"));
import Pilot3D from "./pages/Pilot3D";
const FreeResources = lazy(() => import("./pages/FreeResources"));
const Courses = lazy(() => import("./pages/Courses"));
const NinjaCourses = lazy(() => import("./pages/ModeCourses").then(m => ({ default: m.NinjaCourses })));
const StartSmartCourses = lazy(() => import("./pages/ModeCourses").then(m => ({ default: m.StartSmartCourses })));

function Router() {
  return (
    <Switch>
      <Route path="/" component={Pilot3D} />
      <Route path="/classic" component={Home} />
      <Route path="/prototype" component={Prototype} />
      <Route path="/pilot-3d" component={Pilot3D} />
      <Route path="/free-resources" component={FreeResources} />
      <Route path="/courses" component={Courses} />
      <Route path="/cursos-courses" component={Courses} />
      <Route path="/start-smart" component={StartSmartCourses} />
      <Route path="/ninja-mode" component={NinjaCourses} />
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
          <Suspense fallback={<main className="route-loading" role="status">Cargando…</main>}><Router /></Suspense>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
