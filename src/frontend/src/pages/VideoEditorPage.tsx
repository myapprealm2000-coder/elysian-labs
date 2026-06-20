import { EditorLeftSidebar } from "@/components/editor/EditorLeftSidebar";
import { EditorRightPanel } from "@/components/editor/EditorRightPanel";
import { EditorTopBar } from "@/components/editor/EditorTopBar";
import { ProExportModal } from "@/components/editor/ProExportModal";
import { ProTimeline } from "@/components/editor/ProTimeline";
import { VideoMonitor } from "@/components/editor/VideoMonitor";
import { useVideoEditor } from "@/hooks/useVideoEditor";
import { useVideoEditorStore } from "@/store/videoEditorStore";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Video } from "lucide-react";
import { Component, type ErrorInfo, type ReactNode, useRef } from "react";

// ─── Error Boundary ─────────────────────────────────────────────────────────────
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class VideoEditorErrorBoundary extends Component<
  { children: ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[VideoEditor] Error boundary caught:", error, info);
  }

  override render() {
    if (this.state.hasError) {
      return (
        <div
          className="flex flex-col items-center justify-center gap-4 p-8"
          style={{
            height: "calc(100vh - 64px)",
            background: "#070B14",
            color: "#fff",
          }}
        >
          <div
            className="w-12 h-12 flex items-center justify-center rounded-2xl"
            style={{
              background: "rgba(239,68,68,0.15)",
              border: "1px solid rgba(239,68,68,0.3)",
            }}
          >
            <Video size={22} style={{ color: "#ef4444" }} />
          </div>
          <div className="text-center">
            <h2 className="text-base font-semibold text-white/80 mb-1">
              Video Editor encountered an error
            </h2>
            <p className="text-xs text-white/40 mb-4 max-w-xs">
              {this.state.error?.message ?? "Unknown error"}
            </p>
            <button
              type="button"
              onClick={() => this.setState({ hasError: false, error: null })}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #2563EB, #22C55E)",
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ─── Inner editor (uses hooks) ─────────────────────────────────────────────────────
function VideoEditorInner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const editor = useVideoEditor(videoRef, audioRef);
  const store = useVideoEditorStore();

  const {
    projectName,
    setProjectName,
    currentTime,
    duration,
    selectedClipId,
    selectedTextId,
    timelineZoom,
    setTimelineZoom,
    aspectRatio,
    setAspectRatio,
    videoClips,
    audioClips,
    textLayers,
    undoStack,
    redoStack,
    exportModalOpen,
    setExportModalOpen,
    undo,
    redo,
    takeSnapshot,
    updateVideoClip,
    removeVideoClip,
    setSelectedClipId,
    setSelectedTextId,
    setSelectedCaptionId,
    saveProject,
  } = store;

  // Flatten clips for ProTimeline (legacy Clip[] format)
  const allClips = [
    ...Object.values(videoClips ?? {}).map((c) => ({
      ...c,
      trackType: "video" as const,
      endTime: c.startTime + c.duration - (c.trimIn ?? 0) - (c.trimOut ?? 0),
    })),
    ...Object.values(audioClips ?? {}).map((c) => ({
      id: c.id,
      type: "video" as const,
      trackId: c.trackId,
      trackType: "audio" as const,
      src: c.src,
      name: c.name,
      startTime: c.startTime,
      duration: c.duration,
      trimIn: c.trimIn,
      trimOut: c.trimOut,
      speed: 1,
      volume: c.volume,
      muted: c.muted,
      locked: c.locked,
      hidden: c.hidden,
      filters: {} as import("@/types/videoEditor").ColorGradingSettings,
      transform: {
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        flipH: false,
        flipV: false,
      },
      aspectRatio: "16:9" as import("@/types/videoEditor").AspectRatio,
      reversed: false,
      opacity: 1,
      endTime: c.startTime + c.duration - (c.trimIn ?? 0) - (c.trimOut ?? 0),
    })),
  ];

  const textOverlays = Object.values(textLayers ?? {});

  const handleUpdateClip = (
    id: string,
    patch: Partial<(typeof allClips)[number]>,
  ) => {
    if (videoClips?.[id])
      updateVideoClip(
        id,
        patch as Partial<import("@/types/videoEditor").VideoClip>,
      );
  };

  const handleSplitClip = (id: string) => {
    const clip = videoClips?.[id];
    if (!clip) return;
    const splitAt = currentTime - clip.startTime;
    if (
      splitAt <= 0 ||
      splitAt >= clip.duration - (clip.trimIn ?? 0) - (clip.trimOut ?? 0)
    )
      return;
    takeSnapshot();
    const newId = `vclip-${Date.now()}`;
    updateVideoClip(id, {
      trimOut: clip.duration - (clip.trimIn ?? 0) - splitAt,
    });
    store.addVideoClip({
      ...clip,
      id: newId,
      startTime: clip.startTime + splitAt,
      trimIn: (clip.trimIn ?? 0) + splitAt,
      trimOut: clip.trimOut ?? clip.duration,
    });
  };

  const hasSrc = Object.keys(videoClips ?? {}).length > 0;

  return (
    <div
      className="flex flex-col"
      style={{ height: "calc(100vh - 64px)", background: "#070B14" }}
      data-ocid="video_editor.page"
    >
      {/* Top bar */}
      <EditorTopBar
        projectName={projectName}
        onProjectNameChange={setProjectName}
        onUndo={undo}
        onRedo={redo}
        canUndo={(undoStack?.length ?? 0) > 0}
        canRedo={(redoStack?.length ?? 0) > 0}
        zoom={timelineZoom}
        onSave={saveProject}
        onExport={() => setExportModalOpen(true)}
        hasSrc={hasSrc}
      />

      {/* 3-panel main area */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Left icon sidebar */}
        <EditorLeftSidebar />

        {/* Center: monitor + timeline */}
        <div className="flex flex-col flex-1 min-w-0 min-h-0 overflow-hidden">
          <VideoMonitor videoRef={videoRef} audioRef={audioRef} />
          <ProTimeline
            duration={duration ?? 0}
            currentTime={currentTime ?? 0}
            clips={allClips}
            textOverlays={textOverlays}
            selectedId={selectedClipId ?? selectedTextId ?? null}
            zoom={timelineZoom ?? 2}
            aspectRatio={aspectRatio ?? "16:9"}
            onSeek={editor.seekTo}
            onZoom={setTimelineZoom}
            onSelectClip={(id) => {
              setSelectedClipId(id);
              setSelectedTextId(null);
              setSelectedCaptionId(null);
            }}
            onSelectText={(id) => {
              setSelectedTextId(id);
              setSelectedClipId(null);
              setSelectedCaptionId(null);
            }}
            onUpdateClip={
              handleUpdateClip as (
                id: string,
                patch: Partial<import("@/types/videoEditor").VideoClip>,
              ) => void
            }
            onRemoveClip={(id) => {
              takeSnapshot();
              removeVideoClip(id);
            }}
            onDuplicateClip={(id) => {
              const clip = videoClips?.[id];
              if (!clip) return;
              takeSnapshot();
              store.addVideoClip({
                ...clip,
                id: `vclip-${Date.now()}`,
                startTime: clip.startTime + 0.5,
              });
            }}
            onSplitClip={handleSplitClip}
            onUndo={undo}
            onSetAspectRatio={setAspectRatio}
          />
        </div>

        {/* Right properties panel */}
        <EditorRightPanel />
      </div>

      {/* Export modal */}
      <ProExportModal
        isOpen={exportModalOpen ?? false}
        onClose={() => setExportModalOpen(false)}
        projectName={projectName}
      />

      {/* Hidden audio element */}
      <audio ref={audioRef} style={{ display: "none" }}>
        <track kind="captions" />
      </audio>
    </div>
  );
}

// ─── Exported page (wrapped in error boundary) ───────────────────────────────────
export function VideoEditorPage() {
  return (
    <VideoEditorErrorBoundary>
      <VideoEditorInner />
    </VideoEditorErrorBoundary>
  );
}

export default VideoEditorPage;
