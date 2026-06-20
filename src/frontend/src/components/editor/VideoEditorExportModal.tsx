import { useVideoEditor } from "@/hooks/useVideoEditor";
import { useVideoEditorStore } from "@/store/videoEditorStore";
import {
  CheckCircle2,
  Download,
  Film,
  Gift as Gif,
  ImageIcon,
  Loader2,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type ExportFormat = "png" | "mp4" | "gif";
type ExportQuality = "720p" | "1080p" | "2K" | "4K";
type ExportFps = 24 | 30 | 60;

const QUALITY_OPTIONS: {
  id: ExportQuality;
  label: string;
  dims: string;
  sizeMult: number;
}[] = [
  { id: "720p", label: "Low", dims: "1280×720", sizeMult: 1 },
  { id: "1080p", label: "Medium", dims: "1920×1080", sizeMult: 2.25 },
  { id: "2K", label: "High", dims: "2560×1440", sizeMult: 4 },
  { id: "4K", label: "Ultra", dims: "3840×2160", sizeMult: 9 },
];

const FPS_OPTIONS: ExportFps[] = [24, 30, 60];

const FORMAT_CARDS: {
  id: ExportFormat;
  label: string;
  desc: string;
  icon: React.ElementType;
  simulated?: boolean;
}[] = [
  {
    id: "png",
    label: "PNG Frame",
    desc: "Export current frame",
    icon: ImageIcon,
  },
  {
    id: "mp4",
    label: "MP4 Video",
    desc: "Full video export",
    icon: Film,
    simulated: true,
  },
  { id: "gif", label: "GIF", desc: "Animated GIF", icon: Gif, simulated: true },
];

function estimateSizeMB(
  format: ExportFormat,
  quality: ExportQuality,
  duration: number,
): string {
  const q = QUALITY_OPTIONS.find((q) => q.id === quality)!;
  const base = q.sizeMult;
  if (format === "png") return (base * 2.4).toFixed(1);
  if (format === "gif") return (base * 3.2 * Math.max(duration, 1)).toFixed(1);
  return (base * 8.5 * Math.max(duration, 1)).toFixed(1);
}

function estimateTimeSec(
  format: ExportFormat,
  quality: ExportQuality,
  duration: number,
): string {
  const q = QUALITY_OPTIONS.find((q) => q.id === quality)!;
  if (format === "png") return "< 1";
  const secs = Math.ceil(q.sizeMult * Math.max(duration, 1) * 0.8);
  return secs < 60 ? `~${secs}s` : `~${Math.ceil(secs / 60)}m`;
}

export function VideoEditorExportModal() {
  const store = useVideoEditorStore();
  const videoRef = useRef<HTMLVideoElement>(null);
  const editor = useVideoEditor(videoRef);

  const [format, setFormat] = useState<ExportFormat>("mp4");
  const [quality, setQuality] = useState<ExportQuality>("1080p");
  const [fps, setFps] = useState<ExportFps>(30);
  const [localProgress, setLocalProgress] = useState(0);
  const [phase, setPhase] = useState<"idle" | "exporting" | "done">("idle");
  const [exportedFormat, setExportedFormat] = useState<ExportFormat>("mp4");

  const isOpen = store.exportModalOpen;
  const storeProgress = store.exportProgress;
  const duration = store.duration;

  // Sync store progress to local phase/progress
  useEffect(() => {
    if (storeProgress === null) return;
    if (storeProgress === 0 && phase === "idle") return;
    setLocalProgress(storeProgress);
    if (storeProgress >= 100) {
      // Small delay so final 100% is visible
      const t = setTimeout(() => setPhase("done"), 400);
      return () => clearTimeout(t);
    }
  }, [storeProgress, phase]);

  const handleClose = () => {
    if (phase === "exporting") return;
    setPhase("idle");
    setLocalProgress(0);
    store.setExportProgress(null);
    store.setExportModalOpen(false);
  };

  const handleExport = () => {
    setExportedFormat(format);
    if (format === "png") {
      // Real frame export
      editor.exportFrame();
      // Show done immediately
      setPhase("done");
      return;
    }
    // Simulated export
    setPhase("exporting");
    setLocalProgress(0);
    editor.startMockExport(format, quality);
  };

  const handleReset = () => {
    setPhase("idle");
    setLocalProgress(0);
    store.setExportProgress(null);
  };

  const sizeMB = estimateSizeMB(format, quality, duration);
  const timeEst = estimateTimeSec(format, quality, duration);
  const timeRemaining =
    phase === "exporting" && localProgress > 0
      ? estimateTimeSec(format, quality, duration * (1 - localProgress / 100))
      : null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{
            background: "rgba(0,0,0,0.70)",
            backdropFilter: "blur(14px)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
          data-ocid="video-export-overlay"
        >
          <motion.div
            className="w-[480px] rounded-2xl overflow-hidden font-['Inter',sans-serif]"
            style={{
              background: "rgba(15,23,42,0.98)",
              backdropFilter: "blur(32px)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow:
                "0 40px 100px rgba(0,0,0,0.85), 0 0 60px rgba(37,99,235,0.08)",
            }}
            initial={{ scale: 0.94, opacity: 0, y: 14 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 14 }}
            transition={{ type: "spring", damping: 24, stiffness: 300 }}
            data-ocid="video-export-modal"
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 pt-5 pb-4"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div>
                <h2 className="text-[15px] font-bold text-white/90">
                  Export Video
                </h2>
                <p className="text-[11px] text-white/35 mt-0.5">
                  {store.projectName || "Untitled Project"}
                </p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="w-8 h-8 flex items-center justify-center rounded-xl text-white/30 hover:text-white/70 hover:bg-white/10 transition-all"
                data-ocid="video-export.close_button"
                aria-label="Close export modal"
              >
                <X size={16} />
              </button>
            </div>

            {phase === "done" ? (
              // ── Success state
              <motion.div
                className="flex flex-col items-center gap-4 px-6 py-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", damping: 20, stiffness: 280 }}
              >
                <motion.div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    background: "rgba(34,197,94,0.12)",
                    border: "2px solid rgba(34,197,94,0.4)",
                    boxShadow: "0 0 24px rgba(34,197,94,0.2)",
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    damping: 16,
                    stiffness: 260,
                    delay: 0.1,
                  }}
                  data-ocid="video-export.success_state"
                >
                  <CheckCircle2 size={28} className="text-[#22C55E]" />
                </motion.div>
                <div className="text-center">
                  <p className="text-[16px] font-bold text-white/90">
                    Export Complete!
                  </p>
                  <p className="text-[12px] text-white/40 mt-1">
                    {exportedFormat.toUpperCase()} &middot; {quality} &middot;{" "}
                    {fps}fps
                  </p>
                  <p className="text-[11px] text-white/25 mt-0.5">
                    Estimated size: ~{sizeMB} MB
                  </p>
                </div>
                {exportedFormat !== "png" && (
                  <div
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[11px]"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      color: "rgba(255,255,255,0.5)",
                    }}
                  >
                    <Zap size={12} className="text-[#22C55E]" />
                    File saved to Downloads (simulated)
                  </div>
                )}
                <div className="flex gap-2 w-full mt-2">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex-1 h-10 rounded-xl text-[13px] text-white/60 hover:text-white/90 transition-all"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                    data-ocid="video-export.close_button"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex-1 h-10 rounded-xl text-[13px] text-white font-semibold transition-all hover:opacity-90"
                    style={{
                      background: "linear-gradient(135deg, #2563EB, #1d4ed8)",
                      boxShadow: "0 4px 16px rgba(37,99,235,0.35)",
                    }}
                    data-ocid="video-export.export-again"
                  >
                    Export Another
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="px-6 pb-6 space-y-5 pt-5">
                {/* Format */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2">
                    Format
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {FORMAT_CARDS.map((f) => {
                      const Icon = f.icon;
                      const active = format === f.id;
                      return (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => setFormat(f.id)}
                          className="flex flex-col items-center gap-2 py-4 rounded-xl transition-all hover:scale-[1.03]"
                          style={{
                            background: active
                              ? "rgba(37,99,235,0.14)"
                              : "rgba(255,255,255,0.03)",
                            border: `1px solid ${active ? "rgba(37,99,235,0.5)" : "rgba(255,255,255,0.07)"}`,
                          }}
                          data-ocid={`video-export.format-${f.id}`}
                        >
                          <Icon
                            size={20}
                            style={{
                              color: active
                                ? "#2563EB"
                                : "rgba(255,255,255,0.4)",
                            }}
                          />
                          <div className="text-center">
                            <p
                              className="text-[11px] font-bold"
                              style={{
                                color: active
                                  ? "#2563EB"
                                  : "rgba(255,255,255,0.75)",
                              }}
                            >
                              {f.label}
                            </p>
                            <p className="text-[9px] text-white/30 mt-0.5">
                              {f.desc}
                            </p>
                            {f.simulated && (
                              <span
                                className="text-[8px] px-1.5 py-0.5 rounded mt-1 inline-block"
                                style={{
                                  background: "rgba(245,158,11,0.15)",
                                  color: "#f59e0b",
                                }}
                              >
                                simulated
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quality — not relevant for PNG */}
                {format !== "png" && (
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2">
                      Quality
                    </p>
                    <div className="grid grid-cols-4 gap-1.5">
                      {QUALITY_OPTIONS.map((q) => (
                        <button
                          key={q.id}
                          type="button"
                          onClick={() => setQuality(q.id)}
                          className="flex flex-col items-center gap-0.5 py-2.5 rounded-xl transition-all"
                          style={{
                            background:
                              quality === q.id
                                ? "rgba(37,99,235,0.14)"
                                : "rgba(255,255,255,0.03)",
                            border: `1px solid ${quality === q.id ? "rgba(37,99,235,0.5)" : "rgba(255,255,255,0.07)"}`,
                            color:
                              quality === q.id
                                ? "#2563EB"
                                : "rgba(255,255,255,0.55)",
                          }}
                          data-ocid={`video-export.quality-${q.id}`}
                        >
                          <span className="text-[12px] font-bold">
                            {q.label}
                          </span>
                          <span className="text-[9px] opacity-60">
                            {q.dims}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* FPS */}
                {format !== "png" && (
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2">
                      Frame Rate
                    </p>
                    <div className="flex gap-2">
                      {FPS_OPTIONS.map((f) => (
                        <button
                          key={f}
                          type="button"
                          onClick={() => setFps(f)}
                          className="flex-1 py-2 rounded-xl text-[12px] font-semibold transition-all"
                          style={{
                            background:
                              fps === f
                                ? "rgba(37,99,235,0.14)"
                                : "rgba(255,255,255,0.04)",
                            border: `1px solid ${fps === f ? "rgba(37,99,235,0.5)" : "rgba(255,255,255,0.07)"}`,
                            color:
                              fps === f ? "#2563EB" : "rgba(255,255,255,0.55)",
                          }}
                          data-ocid={`video-export.fps-${f}`}
                        >
                          {f} fps
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Estimate info */}
                <div
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div>
                    <p className="text-[11px] text-white/60">
                      ~{sizeMB} MB &middot; {timeEst} render
                    </p>
                    <p className="text-[9px] text-white/25 mt-0.5">
                      {format.toUpperCase()} ·{" "}
                      {format !== "png"
                        ? `${quality} · ${fps}fps`
                        : "current frame"}
                    </p>
                  </div>
                  <Download
                    size={15}
                    style={{ color: "rgba(255,255,255,0.2)" }}
                  />
                </div>

                {/* Progress bar during export */}
                {phase === "exporting" && (
                  <div data-ocid="video-export.loading_state">
                    <div className="flex justify-between text-[11px] text-white/40 mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <Loader2 size={11} className="animate-spin" />
                        Rendering… {localProgress}%
                      </span>
                      {timeRemaining && (
                        <span className="font-mono">{timeRemaining} left</span>
                      )}
                    </div>
                    <div
                      className="h-2 rounded-full overflow-hidden"
                      style={{ background: "rgba(255,255,255,0.07)" }}
                    >
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background:
                            "linear-gradient(90deg, #2563EB, #22C55E)",
                        }}
                        animate={{ width: `${localProgress}%` }}
                        transition={{ duration: 0.25 }}
                      />
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleClose}
                    disabled={phase === "exporting"}
                    className="flex-1 h-11 rounded-xl text-[13px] text-white/60 hover:text-white/90 transition-all disabled:opacity-40"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                    data-ocid="video-export.cancel_button"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleExport}
                    disabled={phase === "exporting"}
                    className="flex-2 flex-1 h-11 rounded-xl text-[13px] text-white font-bold transition-all hover:opacity-90 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                    style={{
                      background: "linear-gradient(135deg, #2563EB, #22C55E)",
                      boxShadow: "0 4px 20px rgba(37,99,235,0.4)",
                    }}
                    data-ocid="video-export.confirm_button"
                  >
                    {phase === "exporting" ? (
                      <>
                        <Loader2 size={15} className="animate-spin" />{" "}
                        Exporting…
                      </>
                    ) : (
                      <>
                        <Download size={15} /> Export {format.toUpperCase()}
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
