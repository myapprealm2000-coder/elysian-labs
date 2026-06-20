import {
  CheckCircle2,
  Download,
  Film,
  Image,
  Instagram,
  Share2,
  X,
  Youtube,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ─── Types ─────────────────────────────────────────────────────────────────────

type VideoFormat = "mp4" | "mov" | "gif" | "png-seq";
type VideoQuality = "720p" | "1080p" | "2K" | "4K";
type VideoFPS = 24 | 30 | 60;
type ExportPhase = "idle" | "exporting" | "done";

interface FormatOption {
  id: VideoFormat;
  label: string;
  description: string;
  popular?: boolean;
}

interface QualityOption {
  id: VideoQuality;
  label: string;
  sublabel: string;
  sizeMB: string;
  renderTime: string;
  recommended?: boolean;
  premium?: boolean;
}

interface FpsOption {
  fps: VideoFPS;
  label: string;
  description: string;
}

export interface ProExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName?: string;
}

// ─── Constants ─────────────────────────────────────────────────────────────────

const FORMAT_OPTIONS: FormatOption[] = [
  { id: "mp4", label: "MP4", description: "Best compatibility", popular: true },
  { id: "mov", label: "MOV", description: "Apple ProRes" },
  { id: "gif", label: "GIF", description: "Animated loops" },
  { id: "png-seq", label: "PNG Seq", description: "Frame sequence" },
];

const QUALITY_OPTIONS: QualityOption[] = [
  {
    id: "720p",
    label: "720p HD",
    sublabel: "1280×720",
    sizeMB: "~28 MB",
    renderTime: "~15s",
  },
  {
    id: "1080p",
    label: "1080p FHD",
    sublabel: "1920×1080",
    sizeMB: "~45 MB",
    renderTime: "~30s",
    recommended: true,
  },
  {
    id: "2K",
    label: "2K QHD",
    sublabel: "2560×1440",
    sizeMB: "~90 MB",
    renderTime: "~60s",
  },
  {
    id: "4K",
    label: "4K UHD",
    sublabel: "3840×2160",
    sizeMB: "~180 MB",
    renderTime: "~2min",
    premium: true,
  },
];

const FPS_OPTIONS: FpsOption[] = [
  { fps: 24, label: "24 fps", description: "Cinematic" },
  { fps: 30, label: "30 fps", description: "Standard" },
  { fps: 60, label: "60 fps", description: "Smooth" },
];

const EXPORT_STEPS = [
  "Rendering video track...",
  "Processing audio...",
  "Applying effects...",
  "Encoding video...",
  "Finalizing export...",
];

// ─── Circular Progress ─────────────────────────────────────────────────────────

function CircularProgress({ value }: { value: number }) {
  const r = 54;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  return (
    <svg
      width="132"
      height="132"
      viewBox="0 0 132 132"
      role="img"
      aria-label="Export progress"
    >
      {/* Track */}
      <circle
        cx="66"
        cy="66"
        r={r}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="6"
      />
      {/* Progress */}
      <motion.circle
        cx="66"
        cy="66"
        r={r}
        fill="none"
        stroke="url(#export-grad)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={circ}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        transform="rotate(-90 66 66)"
        style={{ filter: "drop-shadow(0 0 8px rgba(37,99,235,0.6))" }}
      />
      <defs>
        <linearGradient id="export-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#22C55E" />
        </linearGradient>
      </defs>
      {/* Percentage */}
      <text
        x="66"
        y="62"
        textAnchor="middle"
        fill="white"
        fontSize="20"
        fontWeight="700"
        fontFamily="Inter, sans-serif"
      >
        {Math.round(value)}
      </text>
      <text
        x="66"
        y="78"
        textAnchor="middle"
        fill="rgba(255,255,255,0.4)"
        fontSize="10"
        fontFamily="Inter, sans-serif"
      >
        %
      </text>
    </svg>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────────

export function ProExportModal({
  isOpen,
  onClose,
  projectName = "Elysian Project",
}: ProExportModalProps) {
  const [format, setFormat] = useState<VideoFormat>("mp4");
  const [quality, setQuality] = useState<VideoQuality>("1080p");
  const [fps, setFps] = useState<VideoFPS>(30);
  const [hwAccel, setHwAccel] = useState(true);
  const [audioBitrate, setAudioBitrate] = useState("192 kbps");
  const [colorSpace, setColorSpace] = useState("Rec.709");
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [phase, setPhase] = useState<ExportPhase>("idle");
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(8);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const selectedQualityOption = QUALITY_OPTIONS.find((q) => q.id === quality)!;

  const startExport = () => {
    setPhase("exporting");
    setProgress(0);
    setStepIndex(0);
    setTimeRemaining(8);

    let pct = 0;
    intervalRef.current = setInterval(() => {
      pct += Math.random() * 2.5 + 0.8;
      const clamped = Math.min(100, pct);
      setProgress(clamped);
      setStepIndex(
        Math.min(
          EXPORT_STEPS.length - 1,
          Math.floor((clamped / 100) * EXPORT_STEPS.length),
        ),
      );
      setTimeRemaining((prev) => Math.max(0, prev - 0.15));
      if (clamped >= 100) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setTimeout(() => setPhase("done"), 500);
      }
    }, 120);
  };

  const cancelExport = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setPhase("idle");
    setProgress(0);
  };

  const handleClose = () => {
    if (phase === "exporting") return;
    cancelExport();
    setPhase("idle");
    onClose();
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setPhase("idle");
      setProgress(0);
    }
  }, [isOpen]);

  const overlayStyle: React.CSSProperties = {
    background: "rgba(0,0,0,0.82)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
  };

  const modalStyle: React.CSSProperties = {
    background: "rgba(10,14,26,0.98)",
    backdropFilter: "blur(40px)",
    WebkitBackdropFilter: "blur(40px)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow:
      "0 50px 120px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.04), 0 0 80px rgba(37,99,235,0.08)",
    fontFamily: "Inter, sans-serif",
  };

  const sectionLabelStyle: React.CSSProperties = {
    fontSize: 9,
    fontWeight: 600,
    color: "rgba(255,255,255,0.28)",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    marginBottom: 8,
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
          style={overlayStyle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
          data-ocid="pro-export.overlay"
        >
          <motion.div
            className="w-full sm:w-[580px] rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col max-h-[90vh]"
            style={modalStyle}
            initial={{ y: 60, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 60, opacity: 0, scale: 0.97 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            data-ocid="pro-export.modal"
          >
            {/* Moving gradient bg strip */}
            <div
              className="h-0.5 w-full"
              style={{
                background: "linear-gradient(90deg, #2563EB, #22C55E, #2563EB)",
                backgroundSize: "200% 100%",
              }}
            />

            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-5 pb-4 shrink-0">
              <div>
                <h2 className="text-[15px] font-semibold text-white/90">
                  Export Video
                </h2>
                <p className="text-[11px] text-white/35 mt-0.5">
                  {projectName}
                </p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                disabled={phase === "exporting"}
                className="w-8 h-8 flex items-center justify-center rounded-xl text-white/30 hover:text-white/70 hover:bg-white/[0.08] transition-all disabled:opacity-30"
                data-ocid="pro-export.close_button"
              >
                <X size={16} />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="overflow-y-auto flex-1">
              <AnimatePresence mode="wait">
                {phase === "done" ? (
                  // ── Success state
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center px-6 pb-8 pt-2 gap-5"
                    data-ocid="pro-export.success_state"
                  >
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        type: "spring",
                        damping: 14,
                        stiffness: 280,
                        delay: 0.1,
                      }}
                      className="w-20 h-20 rounded-full flex items-center justify-center"
                      style={{
                        background: "rgba(34,197,94,0.12)",
                        border: "2px solid rgba(34,197,94,0.4)",
                        boxShadow: "0 0 40px rgba(34,197,94,0.2)",
                      }}
                    >
                      <CheckCircle2 size={36} style={{ color: "#22C55E" }} />
                    </motion.div>
                    <div className="text-center">
                      <h3 className="text-[18px] font-bold text-white/90">
                        Export Complete!
                      </h3>
                      <p className="text-[12px] text-white/40 mt-1">
                        {projectName}.{format === "png-seq" ? "zip" : format}
                      </p>
                    </div>
                    <div
                      className="w-full rounded-2xl p-4 space-y-2"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      {[
                        ["Format", format.toUpperCase()],
                        ["Quality", selectedQualityOption.sublabel],
                        ["Frame Rate", `${fps} fps`],
                        ["File Size", selectedQualityOption.sizeMB],
                      ].map(([k, v]) => (
                        <div key={k} className="flex justify-between">
                          <span className="text-[11px] text-white/35">{k}</span>
                          <span className="text-[11px] text-white/70 font-medium">
                            {v}
                          </span>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      className="w-full h-12 rounded-2xl text-white text-[13px] font-bold flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.98]"
                      style={{
                        background: "linear-gradient(135deg, #2563EB, #22C55E)",
                        boxShadow: "0 6px 24px rgba(37,99,235,0.4)",
                      }}
                      data-ocid="pro-export.download_button"
                    >
                      <Download size={16} /> Download File
                    </button>
                    <div className="flex gap-2 w-full">
                      <button
                        type="button"
                        onClick={() => setPhase("idle")}
                        className="flex-1 h-10 rounded-xl text-white/50 hover:text-white/80 text-[12px] font-medium transition-all hover:bg-white/[0.06]"
                        style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                        data-ocid="pro-export.export_again"
                      >
                        Export Again
                      </button>
                    </div>
                    <div className="flex items-center gap-3 pt-1">
                      <span className="text-[10px] text-white/30">
                        Share to
                      </span>
                      {[
                        { Icon: Youtube, color: "#FF0000", label: "YouTube" },
                        {
                          Icon: Instagram,
                          color: "#E1306C",
                          label: "Instagram",
                        },
                        { Icon: Share2, color: "#2563EB", label: "TikTok" },
                      ].map(({ Icon, color, label }) => (
                        <button
                          key={label}
                          type="button"
                          title={`Share to ${label}`}
                          className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                          style={{
                            background: `${color}18`,
                            border: `1px solid ${color}40`,
                            color,
                          }}
                          data-ocid={`pro-export.share-${label.toLowerCase()}`}
                        >
                          <Icon size={15} />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ) : phase === "exporting" ? (
                  // ── Export progress
                  <motion.div
                    key="exporting"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center px-6 pb-8 pt-4 gap-5"
                    data-ocid="pro-export.loading_state"
                  >
                    {/* Animated gradient background strip */}
                    <div
                      className="absolute inset-x-0 top-0 h-40 pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(37,99,235,0.12) 0%, transparent 100%)",
                      }}
                    />
                    <CircularProgress value={progress} />
                    <div className="text-center space-y-1">
                      <motion.p
                        key={stepIndex}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[13px] font-medium text-white/80"
                      >
                        {EXPORT_STEPS[stepIndex]}
                      </motion.p>
                      <p className="text-[11px] text-white/30">
                        Est. {Math.max(0, Math.round(timeRemaining))}s remaining
                      </p>
                    </div>
                    {/* Step indicators */}
                    <div className="flex gap-1.5">
                      {EXPORT_STEPS.map((_, i) => (
                        <div
                          // biome-ignore lint/suspicious/noArrayIndexKey: stable ordered steps
                          key={i}
                          className="h-1 rounded-full transition-all duration-500"
                          style={{
                            width: i === stepIndex ? 24 : 6,
                            background:
                              i <= stepIndex
                                ? "#2563EB"
                                : "rgba(255,255,255,0.1)",
                          }}
                        />
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={cancelExport}
                      className="h-10 px-6 rounded-xl text-white/40 hover:text-white/70 text-[12px] font-medium transition-all hover:bg-white/[0.06]"
                      style={{ border: "1px solid rgba(255,255,255,0.07)" }}
                      data-ocid="pro-export.cancel_button"
                    >
                      Cancel Export
                    </button>
                  </motion.div>
                ) : (
                  // ── Idle: configuration
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="px-6 pb-6 space-y-5"
                  >
                    {/* Format */}
                    <div>
                      <p style={sectionLabelStyle}>Format</p>
                      <div className="grid grid-cols-4 gap-2">
                        {FORMAT_OPTIONS.map((f) => (
                          <button
                            key={f.id}
                            type="button"
                            onClick={() => setFormat(f.id)}
                            className="relative flex flex-col items-center gap-1.5 py-3 rounded-xl border transition-all hover:scale-[1.02]"
                            style={{
                              background:
                                format === f.id
                                  ? "rgba(37,99,235,0.12)"
                                  : "rgba(255,255,255,0.03)",
                              border: `1px solid ${format === f.id ? "#2563EB" : "rgba(255,255,255,0.08)"}`,
                              boxShadow:
                                format === f.id
                                  ? "0 0 16px rgba(37,99,235,0.25)"
                                  : undefined,
                            }}
                            data-ocid={`pro-export.format-${f.id}`}
                          >
                            {f.popular && (
                              <span
                                className="absolute -top-2 left-1/2 -translate-x-1/2 text-[8px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap"
                                style={{
                                  background:
                                    "linear-gradient(90deg,#2563EB,#22C55E)",
                                  color: "#fff",
                                }}
                              >
                                Popular
                              </span>
                            )}
                            {f.id === "mp4" || f.id === "mov" ? (
                              <Film
                                size={18}
                                style={{
                                  color:
                                    format === f.id
                                      ? "#2563EB"
                                      : "rgba(255,255,255,0.4)",
                                }}
                              />
                            ) : (
                              <Image
                                size={18}
                                style={{
                                  color:
                                    format === f.id
                                      ? "#2563EB"
                                      : "rgba(255,255,255,0.4)",
                                }}
                              />
                            )}
                            <span
                              className="text-[11px] font-bold"
                              style={{
                                color:
                                  format === f.id
                                    ? "#2563EB"
                                    : "rgba(255,255,255,0.7)",
                              }}
                            >
                              {f.label}
                            </span>
                            <span
                              className="text-[9px]"
                              style={{ color: "rgba(255,255,255,0.3)" }}
                            >
                              {f.description}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quality */}
                    <div>
                      <p style={sectionLabelStyle}>Quality</p>
                      <div className="grid grid-cols-2 gap-2">
                        {QUALITY_OPTIONS.map((q) => (
                          <button
                            key={q.id}
                            type="button"
                            onClick={() => setQuality(q.id)}
                            className="relative flex flex-col gap-1 px-3 py-3 rounded-xl border transition-all hover:scale-[1.02] text-left"
                            style={{
                              background:
                                quality === q.id
                                  ? "rgba(37,99,235,0.12)"
                                  : "rgba(255,255,255,0.03)",
                              border: `1px solid ${quality === q.id ? "#2563EB" : "rgba(255,255,255,0.08)"}`,
                              boxShadow:
                                quality === q.id
                                  ? "0 0 16px rgba(37,99,235,0.2)"
                                  : undefined,
                            }}
                            data-ocid={`pro-export.quality-${q.id.toLowerCase()}`}
                          >
                            {q.recommended && (
                              <span
                                className="absolute top-2 right-2 text-[7px] font-bold px-1.5 py-0.5 rounded-full"
                                style={{
                                  background: "rgba(34,197,94,0.2)",
                                  color: "#22C55E",
                                  border: "1px solid rgba(34,197,94,0.3)",
                                }}
                              >
                                Recommended
                              </span>
                            )}
                            {q.premium && (
                              <span
                                className="absolute top-2 right-2 text-[7px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5"
                                style={{
                                  background: "rgba(245,158,11,0.2)",
                                  color: "#f59e0b",
                                  border: "1px solid rgba(245,158,11,0.3)",
                                }}
                              >
                                <Zap size={7} /> Premium
                              </span>
                            )}
                            <span
                              className="text-[13px] font-bold"
                              style={{
                                color:
                                  quality === q.id
                                    ? "#2563EB"
                                    : "rgba(255,255,255,0.8)",
                              }}
                            >
                              {q.label}
                            </span>
                            <span
                              className="text-[10px]"
                              style={{ color: "rgba(255,255,255,0.4)" }}
                            >
                              {q.sublabel}
                            </span>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span
                                className="text-[9px]"
                                style={{ color: "rgba(255,255,255,0.3)" }}
                              >
                                {q.sizeMB} / 1 min
                              </span>
                              <span
                                className="text-[9px]"
                                style={{ color: "rgba(255,255,255,0.2)" }}
                              >
                                ·
                              </span>
                              <span
                                className="text-[9px]"
                                style={{ color: "rgba(255,255,255,0.3)" }}
                              >
                                {q.renderTime}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* FPS */}
                    <div>
                      <p style={sectionLabelStyle}>Frame Rate</p>
                      <div className="grid grid-cols-3 gap-2">
                        {FPS_OPTIONS.map((f) => (
                          <button
                            key={f.fps}
                            type="button"
                            onClick={() => setFps(f.fps)}
                            className="flex flex-col items-center gap-0.5 py-3 rounded-xl border transition-all hover:scale-[1.02]"
                            style={{
                              background:
                                fps === f.fps
                                  ? "rgba(37,99,235,0.12)"
                                  : "rgba(255,255,255,0.03)",
                              border: `1px solid ${fps === f.fps ? "#2563EB" : "rgba(255,255,255,0.08)"}`,
                            }}
                            data-ocid={`pro-export.fps-${f.fps}`}
                          >
                            <span
                              className="text-[14px] font-bold"
                              style={{
                                color:
                                  fps === f.fps
                                    ? "#2563EB"
                                    : "rgba(255,255,255,0.8)",
                              }}
                            >
                              {f.label}
                            </span>
                            <span
                              className="text-[9px]"
                              style={{ color: "rgba(255,255,255,0.35)" }}
                            >
                              {f.description}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Advanced Options */}
                    <div
                      className="rounded-xl overflow-hidden"
                      style={{ border: "1px solid rgba(255,255,255,0.06)" }}
                    >
                      <button
                        type="button"
                        onClick={() => setAdvancedOpen((v) => !v)}
                        className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/[0.04] transition-colors"
                        data-ocid="pro-export.advanced_toggle"
                      >
                        <span className="text-[10px] font-semibold text-white/40 uppercase tracking-widest">
                          Advanced Options
                        </span>
                        <motion.div
                          animate={{ rotate: advancedOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            role="img"
                            aria-label="Toggle"
                          >
                            <path
                              d="M2 4l4 4 4-4"
                              stroke="rgba(255,255,255,0.3)"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                          </svg>
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {advancedOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div
                              className="px-4 pb-4 space-y-4"
                              style={{
                                borderTop: "1px solid rgba(255,255,255,0.06)",
                              }}
                            >
                              <div className="pt-3 flex items-center justify-between">
                                <div>
                                  <p className="text-[12px] text-white/70 font-medium">
                                    Hardware Acceleration
                                  </p>
                                  <p className="text-[10px] text-white/30 mt-0.5">
                                    Use GPU for faster encoding
                                  </p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => setHwAccel((v) => !v)}
                                  className="relative w-10 rounded-full transition-all"
                                  style={{
                                    height: 22,
                                    background: hwAccel
                                      ? "#2563EB"
                                      : "rgba(255,255,255,0.1)",
                                    border: `1px solid ${hwAccel ? "#2563EB" : "rgba(255,255,255,0.12)"}`,
                                  }}
                                  data-ocid="pro-export.hw-accel-toggle"
                                >
                                  <span
                                    className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all"
                                    style={{
                                      left: hwAccel ? "calc(100% - 18px)" : 2,
                                    }}
                                  />
                                </button>
                              </div>
                              <div>
                                <p className="text-[11px] text-white/40 mb-2">
                                  Audio Bitrate
                                </p>
                                <div className="flex gap-2">
                                  {["128 kbps", "192 kbps", "320 kbps"].map(
                                    (b) => (
                                      <button
                                        key={b}
                                        type="button"
                                        onClick={() => setAudioBitrate(b)}
                                        className="flex-1 py-1.5 rounded-lg text-[10px] font-medium transition-all"
                                        style={{
                                          background:
                                            audioBitrate === b
                                              ? "rgba(37,99,235,0.15)"
                                              : "rgba(255,255,255,0.04)",
                                          border: `1px solid ${audioBitrate === b ? "#2563EB" : "rgba(255,255,255,0.08)"}`,
                                          color:
                                            audioBitrate === b
                                              ? "#2563EB"
                                              : "rgba(255,255,255,0.5)",
                                        }}
                                        data-ocid={`pro-export.audio-bitrate-${b.replace(/\s+/g, "-").toLowerCase()}`}
                                      >
                                        {b}
                                      </button>
                                    ),
                                  )}
                                </div>
                              </div>
                              <div>
                                <p className="text-[11px] text-white/40 mb-2">
                                  Color Space
                                </p>
                                <div className="flex gap-2">
                                  {["sRGB", "Rec.709", "Rec.2020"].map((cs) => (
                                    <button
                                      key={cs}
                                      type="button"
                                      onClick={() => setColorSpace(cs)}
                                      className="flex-1 py-1.5 rounded-lg text-[10px] font-medium transition-all"
                                      style={{
                                        background:
                                          colorSpace === cs
                                            ? "rgba(37,99,235,0.15)"
                                            : "rgba(255,255,255,0.04)",
                                        border: `1px solid ${colorSpace === cs ? "#2563EB" : "rgba(255,255,255,0.08)"}`,
                                        color:
                                          colorSpace === cs
                                            ? "#2563EB"
                                            : "rgba(255,255,255,0.5)",
                                      }}
                                      data-ocid={`pro-export.color-space-${cs.toLowerCase().replace(/\./g, "")}`}
                                    >
                                      {cs}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Export button area */}
                    <div className="space-y-3">
                      <div
                        className="flex items-center justify-between px-4 py-2.5 rounded-xl"
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        <span className="text-[11px] text-white/40">
                          Export settings
                        </span>
                        <span
                          className="text-[11px] font-semibold"
                          style={{ color: "rgba(255,255,255,0.65)" }}
                        >
                          {format.toUpperCase()} · {quality} · {fps}fps
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={startExport}
                        className="w-full h-13 rounded-2xl text-white text-[14px] font-bold flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.98]"
                        style={{
                          height: 52,
                          background:
                            "linear-gradient(135deg, #2563EB 0%, #22C55E 100%)",
                          boxShadow:
                            "0 8px 32px rgba(37,99,235,0.4), 0 0 0 1px rgba(255,255,255,0.06)",
                        }}
                        data-ocid="pro-export.export_button"
                      >
                        <Download size={17} />
                        Export {format.toUpperCase()}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
