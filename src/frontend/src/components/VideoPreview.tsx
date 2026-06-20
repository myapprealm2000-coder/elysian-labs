import type { TextOverlay, VideoEditorState } from "@/hooks/useVideoEditor";
import { Upload, Video } from "lucide-react";
import { useCallback, useRef, useState } from "react";

interface VideoPreviewProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  state: VideoEditorState;
  onLoadFile: (file: File) => void;
  onVideoLoaded: () => void;
  onTimeUpdate: () => void;
  onSelectText: (id: string) => void;
  onUpdateText: (id: string, patch: Partial<TextOverlay>) => void;
}

function getFilterStyle(filter: string): React.CSSProperties {
  switch (filter) {
    case "warm":
      return { filter: "sepia(0.3) saturate(1.4) brightness(1.05)" };
    case "cool":
      return { filter: "hue-rotate(30deg) saturate(0.9) brightness(1.05)" };
    case "vintage":
      return { filter: "sepia(0.5) contrast(0.85) brightness(0.9)" };
    case "bw":
      return { filter: "grayscale(1) contrast(1.1)" };
    case "vivid":
      return { filter: "saturate(1.8) contrast(1.1)" };
    default:
      return {};
  }
}

function getOverlayStyle(overlay: TextOverlay): React.CSSProperties {
  const base: React.CSSProperties = {
    fontFamily: overlay.fontFamily,
    fontSize: overlay.fontSize,
    fontWeight: overlay.bold ? 700 : 400,
    fontStyle: overlay.italic ? "italic" : "normal",
    textDecoration: overlay.underline ? "underline" : "none",
    textAlign: overlay.textAlign,
    color: overlay.color,
    backgroundColor:
      overlay.backgroundColor === "transparent"
        ? "transparent"
        : overlay.backgroundColor,
    opacity: overlay.opacity,
    lineHeight: 1.2,
    userSelect: "none" as const,
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    padding: "4px 8px",
    borderRadius: 4,
  };
  if (overlay.preset === "youtube") {
    base.textShadow =
      "3px 3px 0px #000, -3px -3px 0px #000, 3px -3px 0px #000, -3px 3px 0px #000";
  } else if (overlay.preset === "glow") {
    base.filter = "drop-shadow(0 0 12px #50c878) drop-shadow(0 0 24px #50c878)";
  }
  return base;
}

export function VideoPreview({
  videoRef,
  state,
  onLoadFile,
  onVideoLoaded,
  onTimeUpdate,
  onSelectText,
  onUpdateText,
}: VideoPreviewProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file?.type.startsWith("video/")) onLoadFile(file);
    },
    [onLoadFile],
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onLoadFile(file);
  };

  const startDragOverlay = useCallback(
    (e: React.MouseEvent, overlay: TextOverlay) => {
      if (editingId === overlay.id) return;
      e.preventDefault();
      e.stopPropagation();
      onSelectText(overlay.id);
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const startMouseX = e.clientX;
      const startMouseY = e.clientY;
      const startX = overlay.x ?? overlay.position?.x ?? 50;
      const startY = overlay.y ?? overlay.position?.y ?? 50;

      const onMove = (me: MouseEvent) => {
        const dx = ((me.clientX - startMouseX) / rect.width) * 100;
        const dy = ((me.clientY - startMouseY) / rect.height) * 100;
        const newX = Math.max(0, Math.min(100, startX + dx));
        const newY = Math.max(0, Math.min(100, startY + dy));
        onUpdateText(overlay.id, { x: newX, y: newY });
      };
      const onUp = () => {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [editingId, onSelectText, onUpdateText],
  );

  const videoClip = (state.clips ?? []).find(
    (c) => c.trackType === "video" || c.type === "video",
  );
  const filterStyle = videoClip ? getFilterStyle(videoClip.filter ?? "") : {};

  const activeOverlays = (state.textOverlays ?? []).filter(
    (t: TextOverlay) =>
      state.currentTime >= t.startTime && state.currentTime <= t.endTime,
  );

  return (
    <div
      className="relative flex-1 flex flex-col overflow-hidden"
      style={{ background: "#1a1a2e" }}
      data-ocid="video-preview-area"
    >
      {state.src ? (
        <div
          ref={containerRef}
          className="flex-1 flex items-center justify-center relative overflow-hidden"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              // Clicked empty canvas — deselect
            }
          }}
          onKeyDown={() => {}}
          role="presentation"
        >
          <div
            className="relative"
            style={{
              aspectRatio: "16/9",
              maxHeight: "100%",
              maxWidth: "100%",
            }}
          >
            <video
              ref={videoRef}
              src={state.src}
              preload="none"
              className="block w-full h-full rounded object-contain"
              style={filterStyle}
              onLoadedMetadata={onVideoLoaded}
              onTimeUpdate={onTimeUpdate}
              data-ocid="video-preview-player"
            >
              <track kind="captions" />
            </video>

            {/* Text overlay layer */}
            <div className="absolute inset-0 overflow-hidden rounded">
              {activeOverlays.map((overlay: TextOverlay) => {
                const isSelected =
                  state.selectedItem?.type === "text" &&
                  state.selectedItem.id === overlay.id;
                const isEditing = editingId === overlay.id;

                return (
                  <div
                    key={overlay.id}
                    className="absolute"
                    style={{
                      left: `${overlay.x}%`,
                      top: `${overlay.y}%`,
                      width: `${overlay.width}%`,
                      transform: "translate(-50%, -50%)",
                      cursor: isEditing ? "text" : "move",
                      outline: isSelected
                        ? "2px solid #0047ab"
                        : "2px solid transparent",
                      boxShadow: isSelected
                        ? "0 0 0 1px #0047ab, 0 0 12px rgba(0,71,171,0.4)"
                        : "none",
                      borderRadius: 4,
                      minWidth: 60,
                    }}
                    onMouseDown={(e) => startDragOverlay(e, overlay)}
                    onDoubleClick={() => {
                      onSelectText(overlay.id);
                      setEditingId(overlay.id);
                    }}
                    data-ocid={`text-overlay-${overlay.id}`}
                  >
                    {isEditing ? (
                      <textarea
                        value={overlay.content}
                        onChange={(e) =>
                          onUpdateText(overlay.id, { content: e.target.value })
                        }
                        onBlur={() => setEditingId(null)}
                        onKeyDown={(e) => {
                          if (e.key === "Escape") setEditingId(null);
                          e.stopPropagation();
                        }}
                        className="bg-transparent resize-none border-none outline-none w-full"
                        style={{
                          ...getOverlayStyle(overlay),
                          width: "100%",
                          minHeight: 40,
                        }}
                        rows={2}
                      />
                    ) : (
                      <div style={getOverlayStyle(overlay)}>
                        {overlay.content}
                      </div>
                    )}

                    {/* Resize handles (corners) */}
                    {isSelected && !isEditing && (
                      <>
                        {/* Width resize — right edge */}
                        <div
                          className="absolute top-1/2 -right-1.5 w-3 h-3 rounded-full border-2 border-white cursor-ew-resize"
                          style={{
                            background: "#0047ab",
                            transform: "translateY(-50%)",
                            zIndex: 10,
                          }}
                          onMouseDown={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            const container = containerRef.current;
                            if (!container) return;
                            const rect = container.getBoundingClientRect();
                            const startX = e.clientX;
                            const startW = overlay.width;
                            const onMove = (me: MouseEvent) => {
                              const dx =
                                ((me.clientX - startX) / rect.width) * 100 * 2;
                              const newW = Math.max(
                                10,
                                Math.min(100, (startW ?? 60) + dx),
                              );
                              onUpdateText(overlay.id, { width: newW });
                            };
                            const onUp = () => {
                              window.removeEventListener("mousemove", onMove);
                              window.removeEventListener("mouseup", onUp);
                            };
                            window.addEventListener("mousemove", onMove);
                            window.addEventListener("mouseup", onUp);
                          }}
                        />
                        {/* Corner handles */}
                        {(["tl", "tr", "bl", "br"] as const).map((corner) => (
                          <div
                            key={corner}
                            className="absolute w-2.5 h-2.5 rounded-sm border-2 border-white"
                            style={{
                              background: "#0047ab",
                              top: corner.startsWith("t") ? "-5px" : "auto",
                              bottom: corner.startsWith("b") ? "-5px" : "auto",
                              left: corner.endsWith("l") ? "-5px" : "auto",
                              right: corner.endsWith("r") ? "-5px" : "auto",
                              cursor:
                                corner === "tl" || corner === "br"
                                  ? "nwse-resize"
                                  : "nesw-resize",
                              zIndex: 10,
                            }}
                          />
                        ))}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <label
          htmlFor="video-file-input"
          className={[
            "flex-1 flex flex-col items-center justify-center gap-5 cursor-pointer group m-6 rounded-2xl border-2 border-dashed transition-smooth",
            isDragging
              ? "border-accent bg-accent/5"
              : "border-border hover:border-accent/60",
          ].join(" ")}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          data-ocid="video-drop-zone"
        >
          <div className="flex flex-col items-center gap-4 pointer-events-none">
            <div
              className="w-24 h-24 rounded-2xl flex items-center justify-center"
              style={{ background: "oklch(0.11 0.006 240)" }}
            >
              <Video
                className={
                  isDragging
                    ? "w-12 h-12 text-accent"
                    : "w-12 h-12 text-muted-foreground group-hover:text-accent transition-smooth"
                }
              />
            </div>
            <div className="text-center space-y-2">
              <p className="font-display text-xl font-bold text-foreground">
                {isDragging ? "Release to drop" : "Drop a video to get started"}
              </p>
              <p className="text-sm text-muted-foreground">
                Elysian Labs · MP4, MOV, WebM supported
              </p>
            </div>
            <span
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.38 0.15 270), oklch(0.65 0.17 150))",
                color: "white",
              }}
            >
              <Upload className="w-4 h-4" />
              Browse files
            </span>
          </div>
        </label>
      )}

      {state.uploadProgress !== null && (
        <div
          className="absolute bottom-0 left-0 right-0 p-4"
          style={{
            background: "linear-gradient(to top, oklch(0.05 0 0), transparent)",
          }}
        >
          <div className="flex items-center gap-3">
            <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${state.uploadProgress}%`,
                  background:
                    "linear-gradient(90deg, oklch(0.38 0.15 270), oklch(0.65 0.17 150))",
                }}
              />
            </div>
            <span className="text-xs font-mono text-muted-foreground w-10 text-right">
              {Math.round(state.uploadProgress ?? 0)}%
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Uploading to cloud storage…
          </p>
        </div>
      )}

      <input
        id="video-file-input"
        type="file"
        accept="video/*"
        className="sr-only"
        onChange={handleFileChange}
        data-ocid="video-file-input"
      />
    </div>
  );
}
