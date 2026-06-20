import { useVideoEditor } from "@/hooks/useVideoEditor";
import { useVideoEditorStore } from "@/store/videoEditorStore";
import type { CaptionLayer, TextLayer } from "@/types/videoEditor";
import {
  Maximize2,
  Minimize2,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Upload,
  Volume2,
  VolumeX,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
  type MouseEvent as RMouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

// ─── Constants ───────────────────────────────────────────────────────────────────
const SPEED_OPTIONS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2];

// ─── Props ────────────────────────────────────────────────────────────────────

interface VideoMonitorProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  audioRef?: React.RefObject<HTMLAudioElement | null>;
}

// ─── Text Layer Overlay ──────────────────────────────────────────────────────────

interface TextOverlayProps {
  layer: TextLayer;
  isSelected: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onSelect: (id: string) => void;
  onUpdate: (id: string, patch: Partial<TextLayer>) => void;
}

function TextOverlay({
  layer,
  isSelected,
  containerRef,
  onSelect,
  onUpdate,
}: TextOverlayProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(layer.content);
  const editRef = useRef<HTMLTextAreaElement>(null);
  const dragStart = useRef<{
    mx: number;
    my: number;
    ox: number;
    oy: number;
  } | null>(null);
  const resizeStart = useRef<{
    mx: number;
    my: number;
    ow: number;
    oh: number;
  } | null>(null);

  const s = layer.style;
  const posX = layer.position?.x ?? 50;
  const posY = layer.position?.y ?? 50;
  const width = layer.size?.width ?? 60;
  const height = layer.size?.height ?? 15;
  const rotation = layer.rotation ?? 0;

  const textShadow = s?.textShadow
    ? `${s.textShadow.offsetX}px ${s.textShadow.offsetY}px ${s.textShadow.blur}px ${s.textShadow.color}`
    : s?.glow
      ? `0 0 ${s.glow.spread ?? 12}px ${s.glow.color}, 0 0 ${(s.glow.spread ?? 12) * 2}px ${s.glow.color}40`
      : undefined;

  const gradientStyle: React.CSSProperties = s?.gradient?.enabled
    ? {
        background: `linear-gradient(${s.gradient.direction ?? "to right"}, ${s.gradient.fromColor}, ${s.gradient.toColor})`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }
    : {};

  const onMouseDownDrag = useCallback(
    (e: RMouseEvent) => {
      if (isEditing) return;
      e.stopPropagation();
      onSelect(layer.id);
      dragStart.current = { mx: e.clientX, my: e.clientY, ox: posX, oy: posY };
      const onMove = (me: MouseEvent) => {
        const c = containerRef.current;
        if (!c || !dragStart.current) return;
        const rect = c.getBoundingClientRect();
        const dx = ((me.clientX - dragStart.current.mx) / rect.width) * 100;
        const dy = ((me.clientY - dragStart.current.my) / rect.height) * 100;
        onUpdate(layer.id, {
          position: {
            x: Math.max(2, Math.min(98, dragStart.current.ox + dx)),
            y: Math.max(2, Math.min(98, dragStart.current.oy + dy)),
          },
        });
      };
      const onUp = () => {
        dragStart.current = null;
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [isEditing, posX, posY, layer.id, onSelect, onUpdate, containerRef],
  );

  const onResizeMouseDown = useCallback(
    (e: RMouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      resizeStart.current = {
        mx: e.clientX,
        my: e.clientY,
        ow: width,
        oh: height,
      };
      const onMove = (me: MouseEvent) => {
        const c = containerRef.current;
        if (!c || !resizeStart.current) return;
        const rect = c.getBoundingClientRect();
        const dw = ((me.clientX - resizeStart.current.mx) / rect.width) * 100;
        const dh = ((me.clientY - resizeStart.current.my) / rect.height) * 100;
        onUpdate(layer.id, {
          size: {
            width: Math.max(10, resizeStart.current.ow + dw),
            height: Math.max(5, resizeStart.current.oh + dh),
          },
        });
      };
      const onUp = () => {
        resizeStart.current = null;
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [width, height, layer.id, onUpdate, containerRef],
  );

  const onRotateMouseDown = useCallback(
    (e: RMouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      const c = containerRef.current;
      if (!c) return;
      const rect = c.getBoundingClientRect();
      const cx = rect.left + (posX / 100) * rect.width;
      const cy = rect.top + (posY / 100) * rect.height;
      const onMove = (me: MouseEvent) => {
        const angle =
          Math.atan2(me.clientY - cy, me.clientX - cx) * (180 / Math.PI) + 90;
        onUpdate(layer.id, { rotation: angle });
      };
      const onUp = () => {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [posX, posY, layer.id, onUpdate, containerRef],
  );

  const onDoubleClick = useCallback(
    (e: RMouseEvent) => {
      e.stopPropagation();
      setEditContent(layer.content);
      setIsEditing(true);
      setTimeout(() => editRef.current?.focus(), 20);
    },
    [layer.content],
  );

  const commitEdit = useCallback(() => {
    setIsEditing(false);
    if (editContent !== layer.content)
      onUpdate(layer.id, { content: editContent });
  }, [editContent, layer.id, layer.content, onUpdate]);

  const animClass =
    s?.animation === "fade-in"
      ? "animate-[fadeIn_0.5s_ease-in]"
      : s?.animation === "slide-in"
        ? "animate-[slideInUp_0.5s_ease-out]"
        : s?.animation === "bounce"
          ? "animate-bounce"
          : s?.animation === "zoom"
            ? "animate-[scaleIn_0.3s_ease-out]"
            : "";

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: canvas overlay
    <div
      className={`absolute select-none ${animClass}`}
      style={{
        left: `${posX}%`,
        top: `${posY}%`,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        width: `${width}%`,
        cursor: isEditing ? "text" : "move",
        userSelect: "none",
        zIndex: isSelected ? 20 : 10,
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(layer.id);
      }}
      onDoubleClick={onDoubleClick}
      onMouseDown={onMouseDownDrag}
      data-ocid={`editor-text-overlay.${layer.id}`}
    >
      {isSelected && !isEditing && (
        <div
          className="absolute inset-0 pointer-events-none rounded"
          style={{
            border: "1.5px dashed rgba(37,99,235,0.8)",
            boxShadow: "0 0 0 1px rgba(37,99,235,0.15)",
          }}
        />
      )}
      {isEditing ? (
        <textarea
          ref={editRef}
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          onBlur={commitEdit}
          onKeyDown={(e) => {
            if (e.key === "Escape") commitEdit();
            e.stopPropagation();
          }}
          className="w-full bg-black/40 rounded border border-blue-500/60 text-white resize-none outline-none p-1"
          style={{
            fontFamily: s?.fontFamily ?? "Inter",
            fontSize: `${(s?.fontSize ?? 32) * 0.06}vw`,
            fontWeight: s?.fontWeight ?? "400",
            color: s?.color ?? "#ffffff",
            textAlign: (s?.textAlign ??
              "center") as React.CSSProperties["textAlign"],
            lineHeight: s?.lineHeight ?? 1.2,
            minHeight: "2em",
          }}
        />
      ) : (
        <div
          className="px-1 py-0.5"
          style={{
            fontFamily: s?.fontFamily ?? "Inter",
            fontSize: `${(s?.fontSize ?? 32) * 0.06}vw`,
            fontWeight: s?.fontWeight ?? "400",
            color: s?.color ?? "#ffffff",
            textAlign: (s?.textAlign ??
              "center") as React.CSSProperties["textAlign"],
            opacity: s?.opacity ?? 1,
            textShadow,
            letterSpacing: s?.letterSpacing
              ? `${s.letterSpacing}em`
              : undefined,
            lineHeight: s?.lineHeight ?? 1.2,
            wordBreak: "break-word",
            whiteSpace: "pre-wrap",
            background: s?.background?.enabled
              ? s.background.color
              : "transparent",
            borderRadius: s?.background?.enabled
              ? s.background.borderRadius
              : undefined,
            padding: s?.background?.enabled
              ? `${s.background.padding}px`
              : "2px 4px",
            ...gradientStyle,
          }}
        >
          {layer.content}
        </div>
      )}
      {isSelected && !isEditing && (
        <>
          {/* Rotate handle */}
          <div
            className="absolute w-4 h-4 rounded-full border-2 border-blue-400 bg-[#070B14] cursor-grab"
            style={{ top: "-28px", left: "50%", transform: "translateX(-50%)" }}
            onMouseDown={onRotateMouseDown}
            title="Rotate"
          />
          <div
            className="absolute w-px bg-blue-400/40 pointer-events-none"
            style={{
              height: "20px",
              top: "-22px",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />
          {(
            [
              { top: -4, left: -4 },
              { top: -4, right: -4 },
              { bottom: -4, left: -4 },
              { bottom: -4, right: -4 },
            ] as React.CSSProperties[]
          ).map((hs, i) => (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: static list
              key={i}
              className="absolute w-2.5 h-2.5 rounded-sm border-2 border-blue-400 bg-[#070B14]"
              style={{ ...hs, cursor: i === 3 ? "se-resize" : "pointer" }}
              onMouseDown={i === 3 ? onResizeMouseDown : undefined}
            />
          ))}
        </>
      )}
    </div>
  );
}

// ─── Caption Overlay ──────────────────────────────────────────────────────────

interface CaptionOverlayProps {
  layer: CaptionLayer;
  isSelected: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onSelect: (id: string) => void;
  onUpdate: (id: string, patch: Partial<CaptionLayer>) => void;
}

function CaptionOverlay({
  layer,
  isSelected,
  containerRef,
  onSelect,
  onUpdate,
}: CaptionOverlayProps) {
  const dragStart = useRef<{
    mx: number;
    my: number;
    ox: number;
    oy: number;
  } | null>(null);
  const posX = layer.position?.x ?? 50;
  const posY = layer.position?.y ?? 80;

  const onMouseDown = useCallback(
    (e: RMouseEvent) => {
      e.stopPropagation();
      onSelect(layer.id);
      dragStart.current = { mx: e.clientX, my: e.clientY, ox: posX, oy: posY };
      const onMove = (me: MouseEvent) => {
        const c = containerRef.current;
        if (!c || !dragStart.current) return;
        const rect = c.getBoundingClientRect();
        onUpdate(layer.id, {
          position: {
            x: Math.max(
              2,
              Math.min(
                98,
                dragStart.current.ox +
                  ((me.clientX - dragStart.current.mx) / rect.width) * 100,
              ),
            ),
            y: Math.max(
              2,
              Math.min(
                98,
                dragStart.current.oy +
                  ((me.clientY - dragStart.current.my) / rect.height) * 100,
              ),
            ),
          },
        });
      };
      const onUp = () => {
        dragStart.current = null;
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [posX, posY, layer.id, onSelect, onUpdate, containerRef],
  );

  const presetStyles: Record<string, React.CSSProperties> = {
    tiktok: {
      fontFamily: layer.style.fontFamily ?? "Inter",
      fontSize: `${(layer.style.fontSize ?? 32) * 0.055}vw`,
      fontWeight: "700",
      color: layer.style.color ?? "#ffffff",
      background: layer.style.background?.color ?? "rgba(0,0,0,0.85)",
      borderRadius: `${layer.style.background?.borderRadius ?? 4}px`,
      padding: `${layer.style.background?.padding ?? 8}px ${(layer.style.background?.padding ?? 8) * 2}px`,
      textAlign: "center",
    },
    cinematic: {
      fontFamily: layer.style.fontFamily ?? "Georgia, serif",
      fontSize: `${(layer.style.fontSize ?? 28) * 0.055}vw`,
      fontWeight: "400",
      color: layer.style.color ?? "#f5f0e0",
      textShadow: "0 0 20px rgba(255,255,255,0.4), 0 2px 8px rgba(0,0,0,0.8)",
      fontStyle: "italic",
      letterSpacing: "0.04em",
    },
    minimal: {
      fontFamily: layer.style.fontFamily ?? "Inter",
      fontSize: `${(layer.style.fontSize ?? 24) * 0.055}vw`,
      color: layer.style.color ?? "#ffffff",
      textAlign: "center",
    },
    glow: {
      fontFamily: layer.style.fontFamily ?? "Inter",
      fontSize: `${(layer.style.fontSize ?? 34) * 0.055}vw`,
      fontWeight: "700",
      color: layer.style.color ?? "#00ff88",
      textShadow: `0 0 12px ${layer.style.glow?.color ?? "#00ff88"}, 0 0 24px ${layer.style.glow?.color ?? "#00ff88"}, 0 0 48px ${layer.style.glow?.color ?? "#00ff88"}60`,
    },
    custom: {
      fontFamily: layer.style.fontFamily ?? "Inter",
      fontSize: `${(layer.style.fontSize ?? 28) * 0.055}vw`,
      color: layer.style.color ?? "#ffffff",
    },
  };

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: canvas overlay
    <div
      className="absolute select-none cursor-move"
      style={{
        left: `${posX}%`,
        top: `${posY}%`,
        transform: "translate(-50%, -50%)",
        maxWidth: `${layer.size?.width ?? 80}%`,
        zIndex: isSelected ? 20 : 10,
        ...(presetStyles[layer.preset] ?? presetStyles.minimal),
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(layer.id);
      }}
      onMouseDown={onMouseDown}
      data-ocid={`editor-caption-overlay.${layer.id}`}
    >
      {isSelected && (
        <div
          className="absolute inset-0 pointer-events-none rounded"
          style={{ border: "1.5px dashed rgba(34,197,94,0.7)" }}
        />
      )}
      {layer.content}
    </div>
  );
}

// ─── Main VideoMonitor ────────────────────────────────────────────────────────

export function VideoMonitor({ videoRef, audioRef }: VideoMonitorProps) {
  const editor = useVideoEditor(videoRef, audioRef);
  const store = useVideoEditorStore();

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [showSafeArea, setShowSafeArea] = useState(false);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [previewZoom, setPreviewZoom] = useState<"fit" | "fill" | "100">("fit");
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [transitionClass, setTransitionClass] = useState<string>("");
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const videoSrc = Object.values(store.videoClips)[0]?.src ?? null;

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(true);
  }, []);

  const onDragLeave = useCallback(() => setIsDraggingOver(false), []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDraggingOver(false);
      const file = e.dataTransfer.files[0];
      if (!file) return;
      if (file.type.startsWith("video/")) editor.addVideoFromFile(file);
      else if (file.type.startsWith("audio/")) editor.addAudioFromFile(file);
    },
    [editor],
  );

  const onFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      if (file.type.startsWith("video/")) editor.addVideoFromFile(file);
      else if (file.type.startsWith("audio/")) editor.addAudioFromFile(file);
      e.target.value = "";
    },
    [editor],
  );

  // ─── Transition CSS animation trigger ──────────────────────────────────────────────
  // When the selected clip has a transition and playback is near the clip end,
  // apply the matching CSS animation class to the video element.
  useEffect(() => {
    if (!store.selectedClipId) return;
    const clip = store.videoClips[store.selectedClipId];
    if (!clip?.transition || clip.transition.type === "none") return;
    const clipEnd =
      clip.startTime + clip.duration - (clip.trimIn ?? 0) - (clip.trimOut ?? 0);
    const triggerAt = clipEnd - clip.transition.duration;
    if (
      store.currentTime >= triggerAt &&
      store.currentTime <= clipEnd &&
      store.isPlaying
    ) {
      const cssClass = `tr-anim-${clip.transition.type}`;
      setTransitionClass(cssClass);
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = setTimeout(
        () => {
          setTransitionClass("");
        },
        clip.transition.duration * 1000 + 50,
      );
    }
  }, [
    store.currentTime,
    store.selectedClipId,
    store.videoClips,
    store.isPlaying,
  ]);

  useEffect(
    () => () => {
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    },
    [],
  );

  const onCanvasClick = useCallback(() => {
    store.setSelectedTextId(null);
    store.setSelectedCaptionId(null);
  }, [store]);

  const toggleMute = useCallback(
    () => editor.setMuted(!store.isMuted),
    [editor, store.isMuted],
  );

  const handleVolumeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = Number(e.target.value) / 100;
      editor.setVolume(v);
      if (v > 0 && store.isMuted) editor.setMuted(false);
    },
    [editor, store.isMuted],
  );

  const objectFit: React.CSSProperties["objectFit"] =
    previewZoom === "fill"
      ? "cover"
      : previewZoom === "100"
        ? "none"
        : "contain";

  return (
    <div
      ref={containerRef}
      className="flex-1 min-h-0 flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: "#070B14", fontFamily: "'Inter', sans-serif" }}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      data-ocid="editor-video-monitor"
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Drag-over overlay */}
      <AnimatePresence>
        {isDraggingOver && (
          <motion.div
            key="drag-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
            style={{
              background: "rgba(37,99,235,0.08)",
              border: "2px solid rgba(37,99,235,0.5)",
              backdropFilter: "blur(2px)",
            }}
          >
            <div className="text-center">
              <Upload
                className="w-12 h-12 mx-auto mb-2"
                style={{ color: "#3b82f6" }}
              />
              <p className="text-white font-semibold text-base">
                Drop to add to timeline
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Canvas area */}
      <div className="flex-1 min-h-0 w-full flex items-center justify-center py-3 px-3">
        {videoSrc ? (
          <div className="relative flex items-center justify-center w-full h-full">
            <div
              ref={canvasRef}
              className="relative overflow-hidden rounded-xl flex-shrink-0"
              style={{
                aspectRatio: store.aspectRatio.replace(":", " / "),
                maxHeight: "calc(100vh - 260px)",
                maxWidth: "100%",
                height: "100%",
                boxShadow:
                  "0 0 0 1px rgba(255,255,255,0.05), 0 0 60px rgba(37,99,235,0.1), 0 24px 80px rgba(0,0,0,0.7)",
                background: "#000",
              }}
              onClick={onCanvasClick}
              onKeyDown={(e) => e.key === "Enter" && onCanvasClick()}
            >
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <video
                ref={videoRef}
                src={videoSrc}
                className={`absolute inset-0 w-full h-full ${transitionClass}`}
                style={{ objectFit, display: "block" }}
                onLoadedMetadata={editor.onVideoLoaded}
                onEnded={editor.onVideoEnded}
                preload="metadata"
                playsInline
              >
                <track kind="captions" label="Captions" />
              </video>

              {/* Safe area guides */}
              {showSafeArea && (
                <div className="absolute inset-0 pointer-events-none z-10">
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      inset: "5%",
                      border: "1px dashed rgba(255,255,255,0.15)",
                    }}
                  />
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      inset: "10%",
                      border: "1px dashed rgba(255,255,255,0.08)",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-px h-8 bg-white/10 absolute" />
                    <div className="h-px w-8 bg-white/10 absolute" />
                  </div>
                </div>
              )}

              {/* Text overlays */}
              {editor.visibleTextLayers.map((layer) => (
                <TextOverlay
                  key={layer.id}
                  layer={layer}
                  isSelected={store.selectedTextId === layer.id}
                  containerRef={
                    canvasRef as React.RefObject<HTMLDivElement | null>
                  }
                  onSelect={store.setSelectedTextId}
                  onUpdate={editor.updateTextLayer}
                />
              ))}

              {/* Caption overlays */}
              {editor.visibleCaptionLayers.map((layer) => (
                <CaptionOverlay
                  key={layer.id}
                  layer={layer}
                  isSelected={store.selectedCaptionId === layer.id}
                  containerRef={
                    canvasRef as React.RefObject<HTMLDivElement | null>
                  }
                  onSelect={store.setSelectedCaptionId}
                  onUpdate={editor.updateCaptionLayer}
                />
              ))}

              {/* Corner UI */}
              <div className="absolute top-2 left-2 z-30">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowSafeArea((v) => !v);
                  }}
                  className="text-[10px] font-bold px-2 py-0.5 rounded transition-all"
                  style={{
                    background: showSafeArea
                      ? "rgba(37,99,235,0.25)"
                      : "rgba(0,0,0,0.55)",
                    color: showSafeArea ? "#60a5fa" : "rgba(255,255,255,0.3)",
                    border: `1px solid ${showSafeArea ? "rgba(37,99,235,0.4)" : "rgba(255,255,255,0.08)"}`,
                    backdropFilter: "blur(8px)",
                  }}
                  data-ocid="editor-safe-area-toggle"
                >
                  Safe
                </button>
              </div>
              <div
                className="absolute top-2 right-2 z-30 text-[10px] font-bold px-2 py-0.5 rounded"
                style={{
                  background: "rgba(37,99,235,0.15)",
                  color: "#3b82f6",
                  border: "1px solid rgba(37,99,235,0.25)",
                  backdropFilter: "blur(8px)",
                }}
              >
                {store.aspectRatio}
              </div>
            </div>

            {/* Timecode */}
            <div
              className="absolute bottom-1 left-3 text-[10px] font-mono"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              {editor.currentTimeFormatted}
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col items-center gap-5 text-center"
            style={{ maxWidth: 320 }}
          >
            <div
              className="w-24 h-24 rounded-2xl flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, rgba(37,99,235,0.12), rgba(34,197,94,0.06))",
                border: "1.5px dashed rgba(37,99,235,0.35)",
                boxShadow: "0 0 40px rgba(37,99,235,0.08)",
              }}
            >
              <Upload
                className="w-10 h-10"
                style={{ color: "rgba(37,99,235,0.7)" }}
              />
            </div>
            <div>
              <p
                className="text-[15px] font-semibold mb-1"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                Drop video here to start editing
              </p>
              <p
                className="text-[12px]"
                style={{ color: "rgba(255,255,255,0.25)" }}
              >
                Supports MP4, MOV, WebM and more
              </p>
            </div>
            <label
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[12px] font-semibold cursor-pointer transition-all hover:opacity-90"
              style={{
                background: "rgba(37,99,235,0.15)",
                border: "1px solid rgba(37,99,235,0.35)",
                color: "#60a5fa",
              }}
              data-ocid="editor-upload-button"
            >
              <Play className="w-4 h-4" />
              Browse files
              <input
                type="file"
                accept="video/*,audio/*"
                className="hidden"
                onChange={onFileChange}
              />
            </label>
          </motion.div>
        )}
      </div>

      {/* === PLAYBACK CONTROLS BAR === */}
      {videoSrc && (
        <div className="flex-shrink-0 w-full px-3 pb-3" style={{ zIndex: 30 }}>
          <div
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl"
            style={{
              background: "rgba(15,23,42,0.96)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            }}
          >
            {/* Skip to start */}
            <button
              type="button"
              onClick={editor.rewind}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-white/40 hover:text-white/80 hover:bg-white/5 transition-all"
              aria-label="Skip to start"
              data-ocid="editor-skip-back-btn"
            >
              <SkipBack className="w-3.5 h-3.5" />
            </button>

            {/* Play / Pause */}
            <button
              type="button"
              onClick={editor.togglePlay}
              className="w-9 h-9 flex items-center justify-center rounded-xl transition-all"
              style={{
                background: "linear-gradient(135deg, #2563EB, #1d4ed8)",
                boxShadow: store.isPlaying
                  ? "0 0 16px rgba(37,99,235,0.6)"
                  : "0 0 8px rgba(37,99,235,0.3)",
                color: "white",
              }}
              aria-label={store.isPlaying ? "Pause" : "Play"}
              data-ocid="editor-monitor-play-btn"
            >
              <AnimatePresence mode="wait" initial={false}>
                {store.isPlaying ? (
                  <motion.div
                    key="pause"
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.7, opacity: 0 }}
                    transition={{ duration: 0.1 }}
                  >
                    <Pause className="w-4 h-4" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="play"
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.7, opacity: 0 }}
                    transition={{ duration: 0.1 }}
                  >
                    <Play className="w-4 h-4 ml-0.5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* Skip forward */}
            <button
              type="button"
              onClick={() => editor.stepFrame(30)}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-white/40 hover:text-white/80 hover:bg-white/5 transition-all"
              aria-label="Skip forward"
              data-ocid="editor-skip-forward-btn"
            >
              <SkipForward className="w-3.5 h-3.5" />
            </button>

            <div
              className="w-px h-4 mx-0.5"
              style={{ background: "rgba(255,255,255,0.08)" }}
            />

            {/* Timecode */}
            <div
              className="text-[11px] font-mono tabular-nums"
              style={{ color: "rgba(255,255,255,0.7)", minWidth: 96 }}
            >
              {editor.currentTimeFormatted}
              <span style={{ color: "rgba(255,255,255,0.25)" }}> / </span>
              {editor.videoDurationFormatted}
            </div>

            <div className="flex-1" />

            {/* Volume */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={toggleMute}
                className="w-6 h-6 flex items-center justify-center rounded text-white/40 hover:text-white/70 transition-all"
                aria-label={store.isMuted ? "Unmute" : "Mute"}
                data-ocid="editor-volume-mute-btn"
              >
                {store.isMuted || store.volume === 0 ? (
                  <VolumeX className="w-3.5 h-3.5" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5" />
                )}
              </button>
              <input
                type="range"
                min={0}
                max={100}
                value={store.isMuted ? 0 : Math.round(store.volume * 100)}
                onChange={handleVolumeChange}
                className="w-20 cursor-pointer"
                style={{ accentColor: "#2563EB", height: 3 }}
                aria-label="Volume"
                data-ocid="editor-volume-slider"
              />
            </div>

            <div
              className="w-px h-4 mx-0.5"
              style={{ background: "rgba(255,255,255,0.08)" }}
            />

            {/* Speed selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowSpeedMenu((v) => !v)}
                className="px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all hover:bg-white/5"
                style={{
                  color: "rgba(255,255,255,0.5)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
                data-ocid="editor-speed-btn"
              >
                {store.playbackSpeed}x
              </button>
              <AnimatePresence>
                {showSpeedMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 4, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.95 }}
                    transition={{ duration: 0.12 }}
                    className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 py-1.5 rounded-xl overflow-hidden"
                    style={{
                      background: "#0F172A",
                      border: "1px solid rgba(255,255,255,0.08)",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
                      minWidth: 70,
                      zIndex: 100,
                    }}
                    data-ocid="editor-speed-menu"
                  >
                    {SPEED_OPTIONS.map((spd) => (
                      <button
                        key={spd}
                        type="button"
                        className="w-full px-3 py-1.5 text-[11px] font-semibold text-left transition-colors hover:bg-white/5"
                        style={{
                          color:
                            store.playbackSpeed === spd
                              ? "#3b82f6"
                              : "rgba(255,255,255,0.5)",
                          background:
                            store.playbackSpeed === spd
                              ? "rgba(37,99,235,0.1)"
                              : "transparent",
                        }}
                        onClick={() => {
                          editor.setSpeed(spd);
                          setShowSpeedMenu(false);
                        }}
                        data-ocid={`editor-speed-option-${spd}`}
                      >
                        {spd}x
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Zoom selector */}
            <div
              className="flex items-center gap-0 rounded-lg overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {(["fit", "fill", "100"] as const).map((z) => (
                <button
                  key={z}
                  type="button"
                  onClick={() => setPreviewZoom(z)}
                  className="px-2 py-1 text-[10px] font-bold transition-all"
                  style={{
                    background:
                      previewZoom === z ? "rgba(37,99,235,0.2)" : "transparent",
                    color:
                      previewZoom === z ? "#3b82f6" : "rgba(255,255,255,0.3)",
                  }}
                  data-ocid={`editor-zoom-${z}`}
                >
                  {z === "100"
                    ? "100%"
                    : z.charAt(0).toUpperCase() + z.slice(1)}
                </button>
              ))}
            </div>

            {/* Fullscreen */}
            <button
              type="button"
              onClick={() =>
                editor.toggleFullscreen(
                  containerRef as React.RefObject<HTMLElement | null>,
                )
              }
              className="w-7 h-7 flex items-center justify-center rounded-lg text-white/40 hover:text-white/80 hover:bg-white/5 transition-all"
              aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
              data-ocid="editor-fullscreen-btn"
            >
              {isFullscreen ? (
                <Minimize2 className="w-3.5 h-3.5" />
              ) : (
                <Maximize2 className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="video/*,audio/*"
        className="hidden"
        onChange={onFileChange}
      />
      {/* Audio element (synced by hook) */}
      <audio ref={audioRef} preload="metadata" className="hidden">
        <track kind="captions" label="Audio" />
      </audio>
    </div>
  );
}
