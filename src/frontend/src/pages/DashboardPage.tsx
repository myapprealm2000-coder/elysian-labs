import { CreateProjectModal } from "@/components/CreateProjectModal";
import { ProjectCard } from "@/components/ProjectCard";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { DEMO_PREVIEW_GRADIENTS, SAMPLE_PROJECTS } from "@/data/demoProjects";
import { useDeleteProject, useProjects } from "@/hooks/useProjects";
import type { Project } from "@/types";
import { TemplateType } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  Film,
  FolderPlus,
  Image,
  LayoutTemplate,
  Loader2,
  Plus,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

function ProjectSkeleton() {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "oklch(0.12 0.006 240 / 0.9)",
        border: "1px solid oklch(0.22 0.006 240 / 0.5)",
        backdropFilter: "blur(16px)",
      }}
    >
      <Skeleton className="h-40 w-full rounded-none bg-muted" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-2/3 bg-muted" />
        <Skeleton className="h-3 w-1/3 bg-muted/70" />
        <Skeleton className="h-3 w-1/2 bg-muted/50" />
      </div>
    </div>
  );
}

function editorPath(project: Project): {
  to: string;
  params: { projectId: string };
} {
  const isCanvas =
    project.templateType === TemplateType.thumbnail ||
    project.templateType === TemplateType.ad;
  return isCanvas
    ? { to: "/editor/$projectId/canvas", params: { projectId: project.id } }
    : { to: "/editor/$projectId", params: { projectId: project.id } };
}

export function DashboardPage() {
  const { data: projects, isLoading, isError, refetch } = useProjects();
  const deleteProject = useDeleteProject();
  const navigate = useNavigate();
  const [showCreate, setShowCreate] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<Project | null>(null);

  const handleCreated = (project: Project) => {
    const path = editorPath(project);
    navigate({ to: path.to as never, params: path.params as never });
  };

  const handleConfirmDelete = async () => {
    if (!pendingDelete) return;
    try {
      await deleteProject.mutateAsync(pendingDelete.id);
      toast.success("Project deleted", { description: pendingDelete.name });
    } catch {
      toast.error("Failed to delete project.");
    } finally {
      setPendingDelete(null);
    }
  };

  const projectCount = projects?.length ?? 0;

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.087 0.008 240)" }}
    >
      {/* Ambient background glow */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-[0.04]"
          style={{
            background:
              "radial-gradient(circle, oklch(0.38 0.15 270) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/2 -right-40 w-[500px] h-[500px] rounded-full opacity-[0.03]"
          style={{
            background:
              "radial-gradient(circle, oklch(0.65 0.17 150) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Sticky Header */}
      <div
        className="sticky top-0 z-20"
        style={{
          background: "oklch(0.10 0.007 240 / 0.92)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid oklch(0.22 0.006 240 / 0.6)",
          boxShadow: "0 4px 24px oklch(0 0 0 / 0.3)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <h1
              className="font-display text-2xl font-bold tracking-tight"
              style={{ color: "oklch(0.98 0 0)" }}
            >
              My Projects
            </h1>
            <p
              className="text-sm font-body mt-0.5"
              style={{ color: "oklch(0.62 0.006 240)" }}
            >
              {isLoading
                ? "Loading your workspace…"
                : isError
                  ? "Could not load projects"
                  : projectCount > 0
                    ? `${projectCount} project${projectCount !== 1 ? "s" : ""} in your workspace`
                    : "Start building something remarkable"}
            </p>
          </div>

          <Button
            onClick={() => setShowCreate(true)}
            className="font-display font-semibold gap-2 shrink-0 transition-all duration-300"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.38 0.15 270) 0%, oklch(0.65 0.17 150) 100%)",
              color: "oklch(0.98 0 0)",
              border: "none",
              boxShadow:
                "0 0 20px oklch(0.38 0.15 270 / 0.35), 0 4px 12px oklch(0 0 0 / 0.3)",
            }}
            data-ocid="create-project-trigger"
          >
            <Plus className="w-4 h-4" />
            Create Project
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 relative">
        {/* Loading State */}
        {isLoading && (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5"
            data-ocid="projects-loading"
          >
            {(["sk1", "sk2", "sk3", "sk4", "sk5", "sk6"] as const).map((id) => (
              <ProjectSkeleton key={id} />
            ))}
          </div>
        )}

        {/* Error State */}
        {!isLoading && isError && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center py-32 text-center"
            data-ocid="error-state"
          >
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
              style={{
                background: "oklch(0.14 0.05 25 / 0.3)",
                border: "1px solid oklch(0.52 0.22 25 / 0.35)",
              }}
            >
              <AlertTriangle
                className="w-9 h-9"
                style={{ color: "oklch(0.7 0.2 25)" }}
              />
            </div>
            <h2
              className="font-display text-xl font-bold mb-2"
              style={{ color: "oklch(0.98 0 0)" }}
            >
              Failed to load projects
            </h2>
            <p
              className="font-body text-sm mb-8 max-w-xs"
              style={{ color: "oklch(0.62 0.006 240)" }}
            >
              There was an error connecting to the backend. Please try again.
            </p>
            <Button
              onClick={() => refetch()}
              variant="outline"
              className="font-display font-semibold gap-2 transition-all duration-200"
              style={{
                border: "1px solid oklch(0.28 0.006 240)",
                color: "oklch(0.78 0.006 240)",
                background: "transparent",
              }}
              data-ocid="retry-btn"
            >
              <RefreshCw className="w-4 h-4" /> Retry
            </Button>
          </motion.div>
        )}

        {/* Empty State + Demo Projects section */}
        {!isLoading && !isError && projectCount === 0 && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col items-center justify-center py-20 text-center"
              data-ocid="empty-state"
            >
              <div className="relative mb-8">
                <div
                  className="w-28 h-28 rounded-3xl flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.14 0.04 270 / 0.6) 0%, oklch(0.12 0.03 150 / 0.4) 100%)",
                    border: "1px solid oklch(0.28 0.08 270 / 0.4)",
                    boxShadow:
                      "0 0 40px oklch(0.38 0.15 270 / 0.12), inset 0 1px 0 oklch(0.98 0 0 / 0.05)",
                  }}
                >
                  <FolderPlus
                    className="w-12 h-12"
                    style={{ color: "oklch(0.55 0.14 270)" }}
                  />
                </div>
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-1.5 -right-1.5 w-7 h-7 rounded-full flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.82 0.17 142) 0%, oklch(0.65 0.17 150) 100%)",
                    boxShadow: "0 0 14px oklch(0.82 0.29 142 / 0.6)",
                  }}
                >
                  <Sparkles
                    className="w-3.5 h-3.5"
                    style={{ color: "oklch(0.08 0 0)" }}
                  />
                </motion.div>
              </div>

              <h2
                className="font-display text-2xl font-bold mb-3"
                style={{ color: "oklch(0.98 0 0)" }}
              >
                No projects yet
              </h2>
              <p
                className="font-body max-w-sm mb-10 leading-relaxed"
                style={{ color: "oklch(0.62 0.006 240)" }}
              >
                Create your first project to get started — build stunning
                thumbnails, design high-converting ads, or edit your next viral
                video.
              </p>

              <Button
                onClick={() => setShowCreate(true)}
                size="lg"
                className="font-display font-semibold gap-2 h-12 px-8 text-base transition-all duration-300 hover:scale-[1.03]"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.38 0.15 270) 0%, oklch(0.65 0.17 150) 100%)",
                  color: "oklch(0.98 0 0)",
                  border: "none",
                  boxShadow:
                    "0 0 28px oklch(0.38 0.15 270 / 0.4), 0 8px 20px oklch(0 0 0 / 0.3)",
                }}
                data-ocid="empty-create-btn"
              >
                <Plus className="w-5 h-5" />
                Create your first project
              </Button>
            </motion.div>

            {/* Example Projects section */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="mt-4"
              data-ocid="demo-projects-section"
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="h-px flex-1"
                  style={{ background: "oklch(0.22 0.006 240 / 0.5)" }}
                />
                <div className="flex items-center gap-2">
                  <Sparkles
                    className="w-3.5 h-3.5"
                    style={{ color: "oklch(0.65 0.17 150)" }}
                  />
                  <span
                    className="font-display text-sm font-semibold"
                    style={{ color: "oklch(0.62 0.006 240)" }}
                  >
                    Example Projects
                  </span>
                </div>
                <div
                  className="h-px flex-1"
                  style={{ background: "oklch(0.22 0.006 240 / 0.5)" }}
                />
              </div>
              <p
                className="text-xs font-body mb-5 text-center"
                style={{ color: "oklch(0.48 0.005 240)" }}
              >
                Here's what your projects could look like. Create yours to get
                started.
              </p>
              <div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5"
                data-ocid="demo-projects-grid"
              >
                {SAMPLE_PROJECTS.map((demo, i) => {
                  const bg = DEMO_PREVIEW_GRADIENTS[demo.templateType];
                  const typeLabel =
                    demo.templateType === "thumbnail"
                      ? "Thumbnail"
                      : demo.templateType === "ad"
                        ? "Ad Creative"
                        : "Video";
                  const TypeIcon =
                    demo.templateType === "thumbnail"
                      ? Image
                      : demo.templateType === "ad"
                        ? Film
                        : LayoutTemplate;
                  return (
                    <motion.div
                      key={demo.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.3 + i * 0.06,
                        duration: 0.35,
                        ease: "easeOut",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          navigate({
                            to: "/editor/$projectId/canvas" as never,
                            params: { projectId: demo.id } as never,
                            search: { demo: "true" } as never,
                          })
                        }
                        className="group relative w-full rounded-2xl overflow-hidden cursor-pointer text-left"
                        style={{
                          background: "oklch(0.12 0.006 240 / 0.9)",
                          border: "1px solid oklch(0.22 0.006 240 / 0.5)",
                          backdropFilter: "blur(16px)",
                          boxShadow: "0 4px 24px oklch(0 0 0 / 0.22)",
                          opacity: 0.88,
                        }}
                        data-ocid={`demo-project-card.${i + 1}`}
                      >
                        {/* Demo badge */}
                        <div
                          className="absolute top-3 right-3 z-10 text-[9px] font-bold px-2 py-0.5 rounded-full"
                          style={{
                            background: "oklch(0.11 0.006 240 / 0.85)",
                            border: "1px solid oklch(0.28 0.006 240 / 0.7)",
                            color: "oklch(0.58 0.006 240)",
                            fontFamily: "Inter, sans-serif",
                            backdropFilter: "blur(8px)",
                          }}
                        >
                          Demo
                        </div>

                        {/* Preview thumbnail */}
                        <div
                          className="relative h-36 flex items-center justify-center overflow-hidden"
                          style={{ background: bg }}
                        >
                          <TypeIcon
                            className="w-16 h-16 opacity-20"
                            style={{ color: "white" }}
                          />
                          {/* Scan lines */}
                          <div
                            className="absolute inset-0"
                            style={{
                              background:
                                "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,255,255,0.015) 3px,rgba(255,255,255,0.015) 6px)",
                            }}
                          />
                        </div>

                        {/* Card body */}
                        <div className="p-4 space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <h3
                              className="font-display text-sm font-bold leading-tight truncate min-w-0"
                              style={{ color: "oklch(0.88 0 0)" }}
                            >
                              {demo.name}
                            </h3>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <TypeIcon
                              className="w-3 h-3"
                              style={{ color: "oklch(0.5 0.006 240)" }}
                            />
                            <span
                              className="text-xs font-body"
                              style={{ color: "oklch(0.5 0.006 240)" }}
                            >
                              {typeLabel}
                            </span>
                          </div>
                          <div
                            className="pt-1 flex items-center justify-between"
                            style={{
                              borderTop: "1px solid oklch(0.2 0.005 240 / 0.4)",
                            }}
                          >
                            <span
                              className="text-[11px] font-body"
                              style={{ color: "oklch(0.38 0.005 240)" }}
                            >
                              Example project
                            </span>
                            <span
                              className="text-[11px] font-display font-semibold"
                              style={{ color: "oklch(0.55 0.12 270)" }}
                            >
                              Open →
                            </span>
                          </div>
                        </div>
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}

        {/* Projects Grid */}
        {!isLoading && !isError && projectCount > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5"
            data-ocid="projects-grid"
          >
            {projects!.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.4, ease: "easeOut" }}
              >
                <ProjectCard
                  project={project}
                  onDelete={(p) => setPendingDelete(p)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Create Modal */}
      <CreateProjectModal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        onCreated={handleCreated}
      />

      {/* Delete Confirmation */}
      <AlertDialog
        open={!!pendingDelete}
        onOpenChange={(v) => !v && setPendingDelete(null)}
      >
        <AlertDialogContent
          className="border"
          style={{
            background: "oklch(0.11 0.006 240)",
            borderColor: "oklch(0.24 0.008 240)",
            boxShadow:
              "0 0 60px oklch(0 0 0 / 0.7), 0 0 0 1px oklch(0.24 0.008 240)",
          }}
          data-ocid="delete-confirm-dialog"
        >
          <AlertDialogHeader>
            <AlertDialogTitle
              className="font-display text-lg"
              style={{ color: "oklch(0.98 0 0)" }}
            >
              Delete Project?
            </AlertDialogTitle>
            <AlertDialogDescription
              className="font-body"
              style={{ color: "oklch(0.62 0.006 240)" }}
            >
              <span
                className="font-semibold"
                style={{ color: "oklch(0.98 0 0)" }}
              >
                "{pendingDelete?.name}"
              </span>{" "}
              will be permanently deleted. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="font-body transition-all duration-200"
              style={{
                background: "transparent",
                border: "1px solid oklch(0.26 0.006 240)",
                color: "oklch(0.78 0.006 240)",
              }}
              data-ocid="delete-cancel-btn"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={deleteProject.isPending}
              className="font-display font-semibold transition-all duration-200"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.52 0.22 25) 0%, oklch(0.44 0.2 20) 100%)",
                color: "oklch(0.98 0 0)",
                border: "none",
                boxShadow: "0 0 16px oklch(0.52 0.22 25 / 0.4)",
              }}
              data-ocid="delete-confirm-btn"
            >
              {deleteProject.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Deleting…
                </>
              ) : (
                "Delete Project"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
