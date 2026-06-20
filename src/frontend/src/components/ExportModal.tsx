import {
  Check,
  CheckCircle2,
  ClipboardCopy,
  Download,
  File,
  FileImage,
  FileText,
  Film,
  Globe,
  Loader2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Canvas Export Modal ─────────────────────────────────────────────────────

type CanvasExportFormat = "png" | "jpg" | "webp" | "pdf" | "mp4";
type ResolutionKey = "720p" | "1080p" | "2k" | "4k";

export interface CanvasExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
  onExport: (
    format: CanvasExportFormat,
    multiplier: number,
    transparent: boolean,
  ) => void;
  canvasWidth: number;
  canvasHeight: number;
}

interface FormatCard {
  id: CanvasExportFormat;
  label: string;
  icon: React.ReactNode;
  desc: string;
  comingSoon?: boolean;
}

const FORMAT_CARDS: FormatCard[] = [
  {
    id: "png",
    label: "PNG",
    icon: <FileImage size={20} />,
    desc: "Transparent support, lossless",
  },
  {
    id: "jpg",
    label: "JPG",
    icon: <File size={20} />,
    desc: "Smaller file, no transparency",
  },
  {
    id: "webp",
    label: "WEBP",
    icon: <Globe size={20} />,
    desc: "Modern format, best compression",
  },
  {
    id: "pdf",
    label: "PDF",
    icon: <FileText size={20} />,
    desc: "Vector, printable",
  },
  {
    id: "mp4",
    label: "MP4",
    icon: <Film size={20} />,
    desc: "Animated export",
    comingSoon: true,
  },
];

const RESOLUTIONS: {
  id: ResolutionKey;
  label: string;
  dims: string;
  multiplier: number;
}[] = [
  { id: "720p", label: "720p", dims: "1280×720", multiplier: 1 },
  { id: "1080p", label: "1080p", dims: "1920×1080", multiplier: 2 },
  { id: "2k", label: "2K", dims: "2560×1440", multiplier: 3 },
  { id: "4k", label: "4K", dims: "3840×2160", multiplier: 4 },
];

type Phase = "idle" | "exporting" | "done";

export function CanvasExportModal({
  isOpen,
  onClose,
  projectName,
  onExport,
  canvasWidth,
  canvasHeight,
}: CanvasExportModalProps) {
  const [format, setFormat] = useState<CanvasExportFormat>("png");
  const [resolution, setResolution] = useState<ResolutionKey>("1080p");
  const [transparent, setTransparent] = useState(false);
  const [padding, setPadding] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [progress, setProgress] = useState(0);

  const timestamp = Date.now();
  const filename = projectName
    ? projectName.replace(/\s+/g, "-").toLowerCase()
    : `elysian-design-${timestamp}`;

  const selectedRes = RESOLUTIONS.find((r) => r.id === resolution)!;
  const exportW = Math.round(canvasWidth * selectedRes.multiplier);
  const exportH = Math.round(canvasHeight * selectedRes.multiplier);
  const estimatedMB = (((exportW * exportH * 4) / (1024 * 1024)) * 0.3).toFixed(
    1,
  );
  void padding;

  const handleClose = () => {
    if (phase === "exporting") return;
    setPhase("idle");
    setProgress(0);
    onClose();
  };

  const handleExport = () => {
    if (format === "mp4") {
      toast.info("MP4 export coming soon!");
      return;
    }
    setPhase("exporting");
    setProgress(0);
    let pct = 0;
    const interval = setInterval(() => {
      pct += Math.random() * 22 + 8;
      if (pct >= 100) {
        clearInterval(interval);
        setProgress(100);
        onExport(
          format,
          selectedRes.multiplier,
          transparent && (format === "png" || format === "webp"),
        );
        setTimeout(() => {
          setPhase("done");
        }, 300);
        return;
      }
      setProgress(Math.min(pct, 95));
    }, 180);
  };

  const overlayStyle = {
    background: "rgba(0,0,0,0.75)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
  };

  const modalStyle: React.CSSProperties = {
    background: "rgba(15,23,42,0.98)",
    backdropFilter: "blur(32px)",
    WebkitBackdropFilter: "blur(32px)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow:
      "0 40px 100px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.04), 0 0 60px rgba(37,99,235,0.08)",
    fontFamily: "Inter, sans-serif",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={overlayStyle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
          data-ocid="export-overlay"
        >
          <motion.div
            className="w-[500px] rounded-2xl overflow-hidden"
            style={modalStyle}
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: "spring", damping: 22, stiffness: 300 }}
            data-ocid="export-modal"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-5">
              <div>
                <h2 className="text-[16px] font-semibold text-white/90">
                  Export Your Design
                </h2>
                <p className="text-[12px] text-white/35 mt-0.5">
                  Choose format, quality and download
                </p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="w-8 h-8 flex items-center justify-center rounded-xl text-white/30 hover:text-white/70 hover:bg-white/10 transition-all"
                data-ocid="export-close"
              >
                <X size={16} />
              </button>
            </div>

            {phase === "done" ? (
              <div className="flex flex-col items-center gap-4 px-6 pb-8 pt-2">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    background: "rgba(34,197,94,0.12)",
                    border: "1px solid rgba(34,197,94,0.3)",
                  }}
                >
                  <CheckCircle2 size={28} className="text-[#22C55E]" />
                </div>
                <div className="text-center">
                  <p className="text-[15px] font-semibold text-white/90">
                    Export Complete!
                  </p>
                  <p className="text-[12px] text-white/40 mt-1">
                    Your design has been downloaded.
                  </p>
                </div>
                <div className="flex gap-2 w-full mt-2">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex-1 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white/60 hover:text-white/90 text-sm font-medium transition-all"
                    data-ocid="export-done-close"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPhase("idle");
                      setProgress(0);
                    }}
                    className="flex-1 h-10 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90"
                    style={{
                      background: "linear-gradient(135deg, #2563EB, #1d4ed8)",
                    }}
                    data-ocid="export-again"
                  >
                    Export Again
                  </button>
                </div>
              </div>
            ) : (
              <div className="px-6 pb-6 space-y-5">
                {/* Format cards */}
                <div>
                  <p className="text-[10px] font-medium text-white/30 uppercase tracking-widest mb-2">
                    Format
                  </p>
                  <div className="grid grid-cols-5 gap-2">
                    {FORMAT_CARDS.map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setFormat(f.id)}
                        disabled={!!f.comingSoon}
                        className={`relative flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all ${
                          format === f.id && !f.comingSoon
                            ? "border-[#2563EB] bg-[#2563EB]/10 text-[#2563EB]"
                            : "border-white/[0.07] bg-white/[0.03] text-white/50 hover:border-white/20 hover:text-white/80"
                        } disabled:opacity-40 disabled:cursor-not-allowed`}
                        data-ocid={`export-format-${f.id}`}
                      >
                        {format === f.id && !f.comingSoon && (
                          <div className="absolute top-1.5 right-1.5">
                            <Check size={9} className="text-[#2563EB]" />
                          </div>
                        )}
                        {f.comingSoon && (
                          <span className="absolute top-1 right-1 text-[8px] px-1 rounded bg-[#f59e0b]/20 text-[#f59e0b] font-medium">
                            Soon
                          </span>
                        )}
                        <span
                          className={
                            format === f.id && !f.comingSoon
                              ? "text-[#2563EB]"
                              : "text-white/40"
                          }
                        >
                          {f.icon}
                        </span>
                        <span className="text-[11px] font-semibold">
                          {f.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quality */}
                <div>
                  <p className="text-[10px] font-medium text-white/30 uppercase tracking-widest mb-2">
                    Quality
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {RESOLUTIONS.map((r) => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setResolution(r.id)}
                        className={`flex flex-col items-center gap-0.5 py-2.5 rounded-xl border transition-all ${
                          resolution === r.id
                            ? "border-[#2563EB] bg-[#2563EB]/10 text-[#2563EB]"
                            : "border-white/[0.07] bg-white/[0.03] text-white/50 hover:border-white/20 hover:text-white/80"
                        }`}
                        data-ocid={`export-quality-${r.id}`}
                      >
                        <span className="text-[13px] font-bold">{r.label}</span>
                        <span className="text-[9px] opacity-60">{r.dims}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Settings */}
                <div>
                  <p className="text-[10px] font-medium text-white/30 uppercase tracking-widest mb-2">
                    Settings
                  </p>
                  <div className="space-y-2.5">
                    <div>
                      <p className="text-[11px] text-white/40 mb-1">Filename</p>
                      <input
                        defaultValue={filename}
                        className="w-full h-9 rounded-lg px-3 text-sm font-mono text-white/80 bg-white/[0.06] border border-white/[0.08] focus:border-[#2563EB]/50 outline-none transition-all"
                        data-ocid="export-filename"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[12px] text-white/70">
                          Transparent Background
                        </p>
                        <p className="text-[10px] text-white/30">
                          PNG / WEBP only
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setTransparent((v) => !v)}
                        disabled={format !== "png" && format !== "webp"}
                        className={`relative w-10 rounded-full border transition-all disabled:opacity-30 ${
                          transparent
                            ? "bg-[#2563EB] border-[#2563EB]"
                            : "bg-white/[0.08] border-white/[0.10]"
                        }`}
                        style={{ height: 22 }}
                        data-ocid="export-transparent-toggle"
                      >
                        <span
                          className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${transparent ? "left-[calc(100%-18px)]" : "left-0.5"}`}
                        />
                      </button>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <p className="text-[11px] text-white/40">Padding</p>
                        <span className="text-[11px] text-white/50 font-mono">
                          {padding}px
                        </span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={padding}
                        onChange={(e) => setPadding(Number(e.target.value))}
                        className="w-full h-1.5 rounded-full accent-[#2563EB] cursor-pointer"
                        data-ocid="export-padding"
                      />
                    </div>
                  </div>
                </div>

                {/* Preview */}
                <div
                  className="rounded-xl p-3 flex items-center gap-3"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div
                    className="w-[100px] h-[60px] rounded-lg overflow-hidden shrink-0"
                    style={{
                      background: "#111827",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <div
                        className="w-10 h-6 rounded"
                        style={{
                          background:
                            "linear-gradient(135deg, #2563EB, #22C55E)",
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-semibold text-white/70">
                      {exportW} × {exportH}px
                    </p>
                    <p className="text-[11px] text-white/35 mt-0.5">
                      Estimated size: ~{estimatedMB} MB
                    </p>
                    <p className="text-[10px] text-white/25 mt-0.5">
                      {format.toUpperCase()} · {selectedRes.label}
                    </p>
                  </div>
                </div>

                {/* Progress */}
                {phase === "exporting" && (
                  <div>
                    <div className="flex justify-between text-[11px] text-white/40 mb-1.5">
                      <span>Exporting…</span>
                      <span className="font-mono">{Math.round(progress)}%</span>
                    </div>
                    <div
                      className="h-1.5 rounded-full overflow-hidden"
                      style={{ background: "rgba(255,255,255,0.08)" }}
                    >
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background:
                            "linear-gradient(90deg, #2563EB, #22C55E)",
                        }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.2 }}
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
                    className="flex-1 h-11 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white/60 hover:text-white/90 hover:bg-white/[0.10] text-sm font-medium transition-all disabled:opacity-50"
                    data-ocid="export-cancel"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleExport}
                    disabled={phase === "exporting" || format === "mp4"}
                    className="flex-1 h-11 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                    style={{
                      background: "linear-gradient(135deg, #2563EB, #1d4ed8)",
                      boxShadow: "0 4px 16px rgba(37,99,235,0.4)",
                    }}
                    data-ocid="export-confirm"
                  >
                    {phase === "exporting" ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />{" "}
                        Exporting…
                      </>
                    ) : (
                      <>
                        <Download size={16} /> Export {format.toUpperCase()}
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    title="Copy to clipboard"
                    onClick={() => {
                      const off = document.createElement("canvas");
                      off.width = canvasWidth * selectedRes.multiplier;
                      off.height = canvasHeight * selectedRes.multiplier;
                      const ctx = off.getContext("2d");
                      if (!ctx) return;
                      // Copy existing canvas content via an image snapshot
                      const liveCanvas =
                        document.querySelector<HTMLCanvasElement>(
                          "[data-ocid='editor-canvas']",
                        );
                      if (liveCanvas) {
                        ctx.drawImage(liveCanvas, 0, 0, off.width, off.height);
                      }
                      off.toBlob(async (blob) => {
                        if (!blob) {
                          toast.error("Could not capture canvas");
                          return;
                        }
                        try {
                          await navigator.clipboard.write([
                            new ClipboardItem({ "image/png": blob }),
                          ]);
                          toast.success("Copied to clipboard!");
                        } catch {
                          toast.error(
                            "Clipboard write not supported in this browser",
                          );
                        }
                      }, "image/png");
                    }}
                    className="w-11 h-11 rounded-xl flex items-center justify-center bg-white/[0.06] border border-white/[0.08] text-white/40 hover:text-white/80 hover:bg-white/[0.10] transition-all"
                    data-ocid="export-copy-clipboard"
                  >
                    <ClipboardCopy size={15} />
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

// ─── Legacy Video ExportModal (used by EditorPage.tsx) ─────────────────────────────

type VideoExportFormat = "mp4" | "webm";
type VideoExportQuality = "720p" | "1080p";

interface VideoExportModalProps {
  open: boolean;
  onClose: () => void;
  videoSrc: string | null;
  trimIn: number;
  trimOut: number;
  projectName: string;
}

function sanitizeName(name: string) {
  return name.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-_]/g, "");
}

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

async function exportTrimmedVideo(
  videoSrc: string,
  trimIn: number,
  trimOut: number,
  quality: VideoExportQuality,
  extension: string,
  projectName: string,
  onProgress: (pct: number) => void,
): Promise<void> {
  const mimeType =
    extension === "webm"
      ? "video/webm;codecs=vp9,opus"
      : "video/webm;codecs=vp8,opus";
  const supportedMime = MediaRecorder.isTypeSupported(mimeType)
    ? mimeType
    : MediaRecorder.isTypeSupported("video/webm")
      ? "video/webm"
      : "video/mp4";

  const targetWidth = quality === "1080p" ? 1920 : 1280;
  const targetHeight = quality === "1080p" ? 1080 : 720;
  const trimDuration = trimOut - trimIn;

  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.src = videoSrc;
    video.muted = false;
    video.crossOrigin = "anonymous";

    video.addEventListener("loadedmetadata", () => {
      const vw = video.videoWidth || targetWidth;
      const vh = video.videoHeight || targetHeight;
      const scale = Math.min(targetWidth / vw, targetHeight / vh, 1);
      const canvasW = Math.round(vw * scale);
      const canvasH = Math.round(vh * scale);

      const canvas = document.createElement("canvas");
      canvas.width = canvasW;
      canvas.height = canvasH;
      const ctx = canvas.getContext("2d")!;

      const stream = canvas.captureStream(30);
      const chunks: BlobPart[] = [];
      const recorder = new MediaRecorder(stream, { mimeType: supportedMime });

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: supportedMime });
        const filename = `${sanitizeName(projectName)}.${extension}`;
        triggerDownload(blob, filename);
        resolve();
      };

      recorder.onerror = () => reject(new Error("MediaRecorder error"));

      video.currentTime = trimIn;
      video.addEventListener(
        "seeked",
        () => {
          void video.play();
          recorder.start(100);

          const startWall = performance.now();
          const frameLoop = () => {
            if (video.paused || video.ended) return;
            const elapsed = video.currentTime - trimIn;
            const pct = Math.min(100, (elapsed / trimDuration) * 100);
            onProgress(pct);

            if (video.currentTime >= trimOut) {
              video.pause();
              recorder.stop();
              return;
            }
            ctx.clearRect(0, 0, canvasW, canvasH);
            ctx.drawImage(video, 0, 0, canvasW, canvasH);
            requestAnimationFrame(frameLoop);
          };

          const safetyTimeout = setTimeout(
            () => {
              if (recorder.state === "recording") {
                video.pause();
                recorder.stop();
              }
            },
            (trimDuration + 2) * 1000,
          );

          video.addEventListener("pause", () => {
            clearTimeout(safetyTimeout);
            if (recorder.state === "recording") recorder.stop();
            ctx.drawImage(video, 0, 0, canvasW, canvasH);
          });

          requestAnimationFrame(frameLoop);
          void startWall;
        },
        { once: true },
      );
    });

    video.addEventListener("error", () =>
      reject(new Error("Failed to load video for export")),
    );
    video.load();
  });
}

export function ExportModal({
  open,
  onClose,
  videoSrc,
  trimIn,
  trimOut,
  projectName,
}: VideoExportModalProps) {
  const [selectedFormat, setSelectedFormat] =
    useState<VideoExportFormat>("mp4");
  const [selectedQuality, setSelectedQuality] =
    useState<VideoExportQuality>("1080p");
  const [phase, setPhaseV] = useState<"idle" | "exporting" | "done">("idle");
  const [exportProgress, setExportProgress] = useState(0);

  const handleClose = () => {
    if (phase === "exporting") return;
    setPhaseV("idle");
    setExportProgress(0);
    onClose();
  };

  const handleExport = async () => {
    if (!videoSrc) return;
    setPhaseV("exporting");
    setExportProgress(0);
    try {
      const ext = selectedFormat;
      const trimDuration = trimOut - trimIn;
      const hasTrim = trimIn > 0 || trimOut > 0;
      if (hasTrim && trimDuration > 0) {
        await exportTrimmedVideo(
          videoSrc,
          trimIn,
          trimOut,
          selectedQuality,
          ext,
          projectName,
          (p) => setExportProgress(p),
        );
      } else {
        setExportProgress(30);
        const res = await fetch(videoSrc);
        setExportProgress(70);
        const blob = await res.blob();
        setExportProgress(90);
        triggerDownload(blob, `${sanitizeName(projectName)}.${ext}`);
        setExportProgress(100);
      }
      setPhaseV("done");
    } catch {
      setPhaseV("idle");
      setExportProgress(0);
    }
  };

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.7)" }}
    >
      <div
        className="w-[400px] rounded-2xl p-6 space-y-4"
        style={{
          background: "#0F172A",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-white font-semibold">Export Video</h2>
          <button
            type="button"
            onClick={handleClose}
            className="text-white/40 hover:text-white/80"
          >
            <X size={16} />
          </button>
        </div>
        {phase === "done" ? (
          <div className="text-center py-6">
            <CheckCircle2 size={32} className="mx-auto text-[#22C55E] mb-2" />
            <p className="text-white font-medium">Export complete!</p>
            <button
              type="button"
              onClick={handleClose}
              className="mt-4 px-4 py-2 rounded-lg bg-white/10 text-white text-sm"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="flex gap-2">
              {(["mp4", "webm"] as VideoExportFormat[]).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setSelectedFormat(f)}
                  className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-all ${
                    selectedFormat === f
                      ? "border-[#2563EB] bg-[#2563EB]/10 text-[#2563EB]"
                      : "border-white/10 text-white/50 hover:text-white"
                  }`}
                >
                  {f.toUpperCase()}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              {(["720p", "1080p"] as VideoExportQuality[]).map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => setSelectedQuality(q)}
                  className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-all ${
                    selectedQuality === q
                      ? "border-[#2563EB] bg-[#2563EB]/10 text-[#2563EB]"
                      : "border-white/10 text-white/50 hover:text-white"
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
            {phase === "exporting" && (
              <div className="h-1.5 rounded-full overflow-hidden bg-white/10">
                <div
                  className="h-full rounded-full bg-[#2563EB] transition-all"
                  style={{ width: `${exportProgress}%` }}
                />
              </div>
            )}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleClose}
                disabled={phase === "exporting"}
                className="flex-1 py-2 rounded-lg border border-white/10 text-white/60 text-sm disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  void handleExport();
                }}
                disabled={phase === "exporting" || !videoSrc}
                className="flex-1 py-2 rounded-lg text-white text-sm font-semibold disabled:opacity-50"
                style={{
                  background: "linear-gradient(135deg,#2563EB,#1d4ed8)",
                }}
              >
                {phase === "exporting"
                  ? "Exporting..."
                  : `Export ${selectedFormat.toUpperCase()}`}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
