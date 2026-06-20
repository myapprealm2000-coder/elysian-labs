import Timeline from "@/components/Timeline";
import { EditorLeftSidebar } from "@/components/editor/EditorLeftSidebar";
import { EditorRightPanel } from "@/components/editor/EditorRightPanel";
import { EditorTopBar } from "@/components/editor/EditorTopBar";
import { VideoEditorExportModal } from "@/components/editor/VideoEditorExportModal";
import { VideoMonitor } from "@/components/editor/VideoMonitor";
import { useProject } from "@/hooks/useProjects";
import { useVideoEditor } from "@/hooks/useVideoEditor";
import { useVideoEditorStore } from "@/store/videoEditorStore";
import { useParams } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export function EditorPage() {
  const { projectId } = useParams({ from: "/editor/$projectId" });
  const { data: project } = useProject(projectId);

  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const _editor = useVideoEditor(videoRef, audioRef);

  const store = useVideoEditorStore();

  // Load project from localStorage on mount
  useEffect(() => {
    if (projectId && projectId !== "default") {
      store.loadProject(projectId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, store.loadProject]);

  // Sync project name from backend
  useEffect(() => {
    if (project?.name && store.projectName === "Untitled Project") {
      store.setProjectName(project.name);
    }
  }, [project?.name, store.projectName, store]);

  const displayName = store.projectName || project?.name || "Untitled Project";

  const handleSave = () => {
    store.setAutosaveStatus("saving");
    store.saveProject();
    setTimeout(() => store.setAutosaveStatus("saved"), 400);
    setTimeout(() => store.setAutosaveStatus("idle"), 2500);
    toast.success("Project saved", { duration: 2000 });
  };

  return (
    <div
      className="flex flex-col h-screen overflow-hidden select-none font-['Inter',sans-serif]"
      style={{ background: "#070B14" }}
      data-ocid="editor-page"
    >
      {/* === TOP BAR === */}
      <EditorTopBar
        projectName={displayName}
        onProjectNameChange={store.setProjectName}
        onUndo={store.undo}
        onRedo={store.redo}
        canUndo={store.undoStack.length > 0}
        canRedo={store.redoStack.length > 0}
        zoom={store.timelineZoom}
        onSave={handleSave}
        onExport={() => store.setExportModalOpen(true)}
        hasSrc={Object.keys(store.videoClips).length > 0}
      />

      {/* === MAIN WORKSPACE === */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Left icon sidebar */}
        <EditorLeftSidebar />

        {/* CENTER — Video monitor + timeline */}
        <div className="flex flex-col flex-1 min-w-0 min-h-0 overflow-hidden relative">
          {/* Video monitor */}
          <VideoMonitor videoRef={videoRef} audioRef={audioRef} />

          {/* Timeline */}
          <div
            className="flex-shrink-0"
            style={{
              height: 220,
              borderTop: "1px solid rgba(255,255,255,0.05)",
            }}
            data-ocid="editor-timeline-panel"
          >
            <Timeline />
          </div>
        </div>

        {/* Right panel */}
        <EditorRightPanel />
      </div>

      {/* Export modal — store-driven */}
      <VideoEditorExportModal />
    </div>
  );
}
