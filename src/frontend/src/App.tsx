import { Layout } from "@/components/Layout";
import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import {
  Component,
  type ComponentType,
  type ErrorInfo,
  type ReactNode,
  Suspense,
  lazy,
  useEffect,
} from "react";

// ─── Global error boundary ────────────────────────────────────────────────────
class ErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: ReactNode; fallback?: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[ErrorBoundary] caught:", error, info);
  }
  override render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div
            style={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "#070B14",
              color: "#fff",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              gap: 16,
              padding: 24,
            }}
          >
            <div style={{ fontSize: 40 }}>⚠️</div>
            <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>
              Something went wrong
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.5)",
                margin: 0,
                textAlign: "center",
                maxWidth: 400,
              }}
            >
              {this.state.error?.message ?? "An unexpected error occurred."}
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              style={{
                marginTop: 8,
                padding: "10px 24px",
                borderRadius: 10,
                border: "1px solid rgba(37,99,235,0.4)",
                background: "rgba(37,99,235,0.15)",
                color: "#60a5fa",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Reload page
            </button>
          </div>
        )
      );
    }
    return this.props.children;
  }
}

// ─── Route-level error boundary fallback ─────────────────────────────────────
function RouteError({ name }: { name: string }) {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "rgba(255,255,255,0.5)",
        gap: 12,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      <span style={{ fontSize: 32 }}>😵</span>
      <p style={{ margin: 0 }}>Failed to load {name} page.</p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        style={{
          padding: "8px 20px",
          borderRadius: 8,
          border: "1px solid rgba(255,255,255,0.15)",
          background: "rgba(255,255,255,0.05)",
          color: "rgba(255,255,255,0.7)",
          cursor: "pointer",
          fontSize: 13,
        }}
      >
        Retry
      </button>
    </div>
  );
}

function withRouteErrorBoundary(name: string, C: ComponentType) {
  return (
    <ErrorBoundary fallback={<RouteError name={name} />}>
      <Suspense fallback={<PageLoader />}>
        <C />
      </Suspense>
    </ErrorBoundary>
  );
}

// ─── Unhandled rejection logger ───────────────────────────────────────────────
function UnhandledRejectionHandler() {
  useEffect(() => {
    const handler = (e: PromiseRejectionEvent) => {
      console.warn("[UnhandledRejection]", e.reason);
      e.preventDefault();
    };
    window.addEventListener("unhandledrejection", handler);
    return () => window.removeEventListener("unhandledrejection", handler);
  }, []);
  return null;
}

// Lazy page imports
const LandingPage = lazy(() =>
  import("@/pages/LandingPage").then((m) => ({ default: m.LandingPage })),
);
const DashboardPage = lazy(() =>
  import("@/pages/DashboardPage").then((m) => ({ default: m.DashboardPage })),
);
const EditorPage = lazy(() =>
  import("@/pages/EditorPage").then((m) => ({ default: m.EditorPage })),
);
const CanvasEditorPage = lazy(() =>
  import("@/pages/CanvasEditorPage").then((m) => ({
    default: m.CanvasEditorPage,
  })),
);
const ServicesPage = lazy(() =>
  import("@/pages/ServicesPage").then((m) => ({ default: m.ServicesPage })),
);
const ProjectsPage = lazy(() =>
  import("@/pages/ProjectsPage").then((m) => ({ default: m.ProjectsPage })),
);
const AboutPage = lazy(() =>
  import("@/pages/AboutPage").then((m) => ({ default: m.AboutPage })),
);
const ContactPage = lazy(() =>
  import("@/pages/ContactPage").then((m) => ({ default: m.ContactPage })),
);
const CoursesPage = lazy(() =>
  import("@/pages/CoursesPage").then((m) => ({ default: m.CoursesPage })),
);
const CourseDetailPage = lazy(() =>
  import("@/pages/CourseDetailPage").then((m) => ({
    default: m.CourseDetailPage,
  })),
);
const ThumbnailStudioPage = lazy(() =>
  import("@/pages/ThumbnailStudioPage").then((m) => ({
    default: m.ThumbnailStudioPage,
  })),
);
const VideoEditorPage = lazy(() =>
  import("@/pages/VideoEditorPage").then((m) => ({
    default: m.VideoEditorPage,
  })),
);
const AdCreatorPage = lazy(() =>
  import("@/pages/AdCreatorPage").then((m) => ({
    default: m.default,
  })),
);
const AiToolsPage = lazy(() =>
  import("@/pages/AiToolsPage").then((m) => ({
    default: m.AiToolsPage,
  })),
);
const TemplatesPage = lazy(() =>
  import("@/pages/TemplatesPage").then((m) => ({
    default: m.TemplatesPage,
  })),
);
const AiImageGeneratorPage = lazy(() =>
  import("@/pages/AiImageGeneratorPage").then((m) => ({
    default: m.AiImageGeneratorPage,
  })),
);

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-8 h-8 rounded-full border-2 border-border border-t-accent animate-spin" />
    </div>
  );
}

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const layoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "layout",
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/",
  component: () => withRouteErrorBoundary("Home", LandingPage),
});

const dashboardRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/dashboard",
  component: () => withRouteErrorBoundary("Dashboard", DashboardPage),
});

const servicesRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/services",
  component: () => withRouteErrorBoundary("Services", ServicesPage),
});

const projectsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/projects",
  component: () => withRouteErrorBoundary("Projects", ProjectsPage),
});

const aboutRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/about",
  component: () => withRouteErrorBoundary("About", AboutPage),
});

const contactRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/contact",
  component: () => withRouteErrorBoundary("Contact", ContactPage),
});

const coursesRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/courses",
  component: () => withRouteErrorBoundary("Courses", CoursesPage),
});

const courseDetailRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/courses/$courseId",
  component: () => withRouteErrorBoundary("Course Detail", CourseDetailPage),
});

const thumbnailStudioRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/thumbnail-studio",
  component: () =>
    withRouteErrorBoundary("Thumbnail Studio", ThumbnailStudioPage),
});

const videoEditorRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/video-editor",
  component: () => withRouteErrorBoundary("Video Editor", VideoEditorPage),
});

const adCreatorRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/ad-creator",
  component: () => withRouteErrorBoundary("Ad Creator", AdCreatorPage),
});

const aiToolsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/ai-tools",
  component: () => withRouteErrorBoundary("AI Tools", AiToolsPage),
});

const templatesRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/templates",
  component: () => withRouteErrorBoundary("Templates", TemplatesPage),
});

const aiImageGeneratorRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/ai-image-generator",
  component: () =>
    withRouteErrorBoundary("AI Image Generator", AiImageGeneratorPage),
});

// Editor routes — bare, no Layout wrapping
const editorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/editor/$projectId",
  component: () => withRouteErrorBoundary("Editor", EditorPage),
});

const canvasEditorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/editor/$projectId/canvas",
  component: () => withRouteErrorBoundary("Canvas Editor", CanvasEditorPage),
});

const routeTree = rootRoute.addChildren([
  layoutRoute.addChildren([
    indexRoute,
    dashboardRoute,
    servicesRoute,
    projectsRoute,
    aboutRoute,
    contactRoute,
    coursesRoute,
    courseDetailRoute,
    thumbnailStudioRoute,
    videoEditorRoute,
    adCreatorRoute,
    aiToolsRoute,
    templatesRoute,
    aiImageGeneratorRoute,
  ]),
  editorRoute,
  canvasEditorRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <UnhandledRejectionHandler />
      <RouterProvider router={router} />
      <Toaster
        theme="dark"
        toastOptions={{
          style: {
            background: "oklch(0.16 0 0)",
            border: "1px solid oklch(0.22 0 0)",
            color: "oklch(0.98 0 0)",
          },
        }}
      />
    </ErrorBoundary>
  );
}
