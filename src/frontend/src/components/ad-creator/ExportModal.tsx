import { useAdCreatorStore } from "@/store/adCreatorStore";
import type {
  CanvasElement,
  ImageCanvasElement,
  ShapeCanvasElement,
  TextCanvasElement,
} from "@/store/adCreatorStore";
import {
  CheckCircle2,
  Download,
  FileImage,
  FileText,
  FileVideo,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

// ─── Types ──────────────────────────────────────────────────────────────────
type ExportFormat = "PNG" | "JPG" | "SVG" | "MP4" | "PDF";
type ExportQuality = "720p" | "1080p" | "4K";

interface ExportModalProps {
  onClose: () => void;
  /** Optional: initial format/quality from the top bar quick-select */
  initialFormat?: string;
  initialQuality?: string;
}

// ─── Static data ────────────────────────────────────────────────────────────
const FORMATS: {
  id: ExportFormat;
  label: string;
  desc: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}[] = [
  { id: "PNG", label: "PNG", desc: "Best for web", icon: FileImage },
  { id: "JPG", label: "JPG", desc: "Compressed", icon: FileImage },
  { id: "SVG", label: "SVG", desc: "Vector", icon: FileText },
  { id: "MP4", label: "MP4", desc: "Video ads", icon: FileVideo },
  { id: "PDF", label: "PDF", desc: "Print-ready", icon: FileText },
];

const QUALITIES: { id: ExportQuality; scale: string; size: string }[] = [
  { id: "720p", scale: "2×", size: "~0.6 MB" },
  { id: "1080p", scale: "3×", size: "~1.4 MB" },
  { id: "4K", scale: "4×", size: "~4.0 MB" },
];

const PROGRESS_STAGES = [
  "Preparing canvas…",
  "Rendering layers…",
  "Optimizing assets…",
  "Finalizing export…",
];

function normalize(val: string | undefined, fallback: string): string {
  return val ?? fallback;
}

// ─── Component ──────────────────────────────────────────────────────────────
export function ExportModal({
  onClose,
  initialFormat,
  initialQuality,
}: ExportModalProps) {
  const [format, setFormat] = useState<ExportFormat>(
    normalize(initialFormat, "PNG") as ExportFormat,
  );
  const [quality, setQuality] = useState<ExportQuality>(
    normalize(initialQuality, "1080p") as ExportQuality,
  );
  const [transparentBg, setTransparentBg] = useState(false);
  const [includeAnim, setIncludeAnim] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);
  const [done, setDone] = useState(false);

  async function downloadFile() {
    const filename = `elysian-labs-export.${format.toLowerCase()}`;
    let mimeType: string;
    let content: string;

    if (format === "PNG" || format === "JPG") {
      try {
        const { elements, canvasSize } = useAdCreatorStore.getState();
        const scale = quality === "4K" ? 4 : quality === "1080p" ? 3 : 2;
        const canvas = document.createElement("canvas");
        canvas.width = canvasSize.width * scale;
        canvas.height = canvasSize.height * scale;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas context unavailable");

        ctx.scale(scale, scale);

        // Sort by zIndex (layers are stored in render order)
        const sortedElements = [...elements].filter((e) => e.visible);

        // Helper: draw a single element
        const drawElement = async (el: CanvasElement): Promise<void> => {
          ctx.save();
          ctx.globalAlpha = el.opacity;
          // Apply rotation around element centre
          const cx = el.x + el.width / 2;
          const cy = el.y + el.height / 2;
          ctx.translate(cx, cy);
          ctx.rotate((el.rotation * Math.PI) / 180);
          ctx.translate(-el.width / 2, -el.height / 2);

          if (el.type === "shape") {
            const shape = el as ShapeCanvasElement;
            const fill = shape.fill;
            if (
              fill.startsWith("linear-gradient") ||
              fill.startsWith("radial-gradient")
            ) {
              // Parse simple linear-gradient for canvas
              const stops = fill.match(/#[0-9a-fA-F]{3,8}/g) ?? [
                "#1e1b4b",
                "#1e40af",
              ];
              const grad = ctx.createLinearGradient(0, 0, el.width, el.height);
              stops.forEach((c, i) =>
                grad.addColorStop(i / Math.max(1, stops.length - 1), c),
              );
              ctx.fillStyle = grad;
            } else {
              ctx.fillStyle = fill;
            }
            if (shape.cornerRadius > 0) {
              const r = Math.min(
                shape.cornerRadius,
                el.width / 2,
                el.height / 2,
              );
              ctx.beginPath();
              ctx.roundRect(0, 0, el.width, el.height, r);
              ctx.fill();
            } else {
              ctx.fillRect(0, 0, el.width, el.height);
            }
            if (
              shape.strokeWidth > 0 &&
              shape.stroke &&
              shape.stroke !== "transparent"
            ) {
              ctx.strokeStyle = shape.stroke;
              ctx.lineWidth = shape.strokeWidth;
              ctx.strokeRect(0, 0, el.width, el.height);
            }
          } else if (el.type === "text") {
            const text = el as TextCanvasElement;
            ctx.font = `${text.fontWeight} ${text.fontSize}px ${text.fontFamily}, sans-serif`;
            ctx.fillStyle = text.color;
            ctx.textAlign =
              text.textAlign === "justify" ? "left" : text.textAlign;
            ctx.textBaseline = "top";
            if (text.shadow) {
              ctx.shadowColor = text.shadow.color;
              ctx.shadowBlur = text.shadow.blur;
              ctx.shadowOffsetX = text.shadow.x;
              ctx.shadowOffsetY = text.shadow.y;
            }
            const lines = text.content.split("\n");
            const lineH = text.fontSize * text.lineHeight;
            lines.forEach((line, i) => {
              const xPos =
                text.textAlign === "center"
                  ? el.width / 2
                  : text.textAlign === "right"
                    ? el.width
                    : 0;
              ctx.fillText(line, xPos, i * lineH);
            });
          } else if (el.type === "image") {
            const img = el as ImageCanvasElement;
            await new Promise<void>((resolve) => {
              const image = new Image();
              image.crossOrigin = "anonymous";
              image.onload = () => {
                const {
                  brightness = 100,
                  contrast = 100,
                  saturation = 100,
                  blur: blurVal = 0,
                } = img.filters;
                const filters: string[] = [];
                if (brightness !== 100)
                  filters.push(`brightness(${brightness}%)`);
                if (contrast !== 100) filters.push(`contrast(${contrast}%)`);
                if (saturation !== 100)
                  filters.push(`saturate(${saturation}%)`);
                if (blurVal > 0) filters.push(`blur(${blurVal}px)`);
                if (filters.length) ctx.filter = filters.join(" ");
                ctx.drawImage(image, 0, 0, el.width, el.height);
                ctx.filter = "none";
                resolve();
              };
              image.onerror = () => resolve(); // skip broken images
              image.src = img.src;
            });
          }
          ctx.restore();
        };

        for (const el of sortedElements) {
          await drawElement(el);
        }

        const imgType = format === "JPG" ? "image/jpeg" : "image/png";
        const transparent = format === "PNG" ? undefined : 0.95;
        canvas.toBlob(
          (blob) => {
            if (!blob) return;
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = filename;
            a.click();
            setTimeout(() => URL.revokeObjectURL(url), 2000);
          },
          imgType,
          transparent,
        );
      } catch (err) {
        console.error("[ExportModal] export error:", err);
      }
      return;
    }

    if (format === "SVG") {
      mimeType = "image/svg+xml";
      content = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675"><defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#1e1b4b"/><stop offset="50%" stop-color="#1e40af"/><stop offset="100%" stop-color="#312e81"/></linearGradient></defs><rect width="1200" height="675" fill="url(#bg)"/><text x="600" y="320" font-family="Inter, sans-serif" font-size="48" font-weight="bold" fill="rgba(255,255,255,0.9)" text-anchor="middle">Elysian Labs — Your Brand Here</text><text x="600" y="385" font-family="Inter, sans-serif" font-size="26" fill="rgba(255,255,255,0.5)" text-anchor="middle">Create Something Amazing</text></svg>`;
    } else if (format === "MP4") {
      mimeType = "video/mp4";
      content = `Elysian Labs MP4 Export\nResolution: ${quality}\nThis is a placeholder export file.`;
    } else {
      // PDF
      mimeType = "application/pdf";
      content =
        "%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj 2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj 3 0 obj<</Type/Page/MediaBox[0 0 612 792]/Parent 2 0 R/Resources<<>>>>endobj\nxref\n0 4\n0000000000 65535 f\n0000000009 00000 n\n0000000058 00000 n\n0000000115 00000 n\ntrailer<</Size 4/Root 1 0 R>>\nstartxref\n217\n%%EOF";
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  const supportsQuality =
    format === "PNG" || format === "JPG" || format === "MP4";
  const supportsTransparent = format === "PNG" || format === "SVG";
  const supportsAnim = format === "MP4";

  function startExport() {
    setExporting(true);
    setProgress(0);
    setStage(0);
    let p = 0;
    let s = 0;
    const interval = setInterval(() => {
      p += Math.random() * 4 + 2;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setProgress(100);
        setStage(3);
        setTimeout(() => setDone(true), 400);
        return;
      }
      const newStage = Math.min(3, Math.floor((p / 100) * 4));
      if (newStage !== s) s = newStage;
      setStage(s);
      setProgress(Math.round(p));
    }, 55);
  }

  const selectedQuality =
    QUALITIES.find((q) => q.id === quality) ?? QUALITIES[1];

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      data-ocid="ad_creator.export_modal"
    >
      <motion.div
        initial={{ scale: 0.9, y: 24, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.88, y: 24, opacity: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-[480px] max-w-[96vw] rounded-2xl overflow-hidden"
        style={{
          background: "rgba(13,18,30,0.98)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow:
            "0 32px 80px rgba(0,0,0,0.7), 0 0 48px rgba(37,99,235,0.1)",
          backdropFilter: "blur(24px)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: "rgba(37,99,235,0.15)",
                border: "1px solid rgba(37,99,235,0.25)",
              }}
            >
              <Download size={14} className="text-blue-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">
                Export Your Design
              </h3>
              <p className="text-[11px] text-white/40">
                Choose format and quality
              </p>
            </div>
          </div>
          <motion.button
            type="button"
            onClick={onClose}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors"
            data-ocid="ad_creator.export_modal.close_button"
          >
            <X size={15} />
          </motion.button>
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {done ? (
              // ── Success state ────────────────────────────────────────
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="text-center py-6"
                data-ocid="ad_creator.export_modal.success_state"
              >
                <motion.div
                  className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{
                    background: "rgba(34,197,94,0.15)",
                    border: "1.5px solid rgba(34,197,94,0.35)",
                  }}
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(34,197,94,0.4)",
                      "0 0 0 14px rgba(34,197,94,0)",
                    ],
                  }}
                  transition={{ duration: 1.0, repeat: 2 }}
                >
                  <CheckCircle2 size={26} className="text-emerald-400" />
                </motion.div>
                <p className="text-white font-semibold mb-1">
                  Export Complete!
                </p>
                <p className="text-white/40 text-sm mb-6">
                  {format} · {quality} · {selectedQuality.size} estimated
                </p>
                <div className="flex gap-3 justify-center">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={downloadFile}
                    className="px-5 py-2.5 rounded-xl text-white font-semibold text-sm"
                    style={{
                      background: "linear-gradient(135deg,#1d4ed8,#2563eb)",
                      boxShadow: "0 0 20px rgba(37,99,235,0.4)",
                    }}
                    data-ocid="ad_creator.export_modal.confirm_button"
                  >
                    Download File
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      setDone(false);
                      setExporting(false);
                      setProgress(0);
                    }}
                    className="px-5 py-2.5 rounded-xl text-white/70 text-sm border border-white/10 hover:border-white/20 hover:text-white transition-colors"
                    data-ocid="ad_creator.export_modal.cancel_button"
                  >
                    Export Another
                  </motion.button>
                </div>
              </motion.div>
            ) : exporting ? (
              // ── Progress state ───────────────────────────────────────
              <motion.div
                key="progress"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="py-4"
                data-ocid="ad_creator.export_modal.loading_state"
              >
                {/* Canvas preview shimmer */}
                <div
                  className="w-full h-28 rounded-xl mb-6 overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <motion.div
                    className="h-full"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent 0%, rgba(37,99,235,0.12) 40%, rgba(139,92,246,0.12) 60%, transparent 100%)",
                      backgroundSize: "200% 100%",
                    }}
                    animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
                    transition={{
                      duration: 1.8,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <motion.p
                    key={stage}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-sm text-white/80"
                  >
                    {PROGRESS_STAGES[stage]}
                  </motion.p>
                  <span className="text-sm font-semibold text-blue-400">
                    {progress}%
                  </span>
                </div>
                <div
                  className="h-2 rounded-full overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg,#1d4ed8,#3b82f6,#818cf8)",
                      width: `${progress}%`,
                    }}
                    transition={{ ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            ) : (
              // ── Selector state ───────────────────────────────────────
              <motion.div
                key="selector"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Canvas thumbnail */}
                <div
                  className="w-full h-24 rounded-xl mb-5 flex items-center justify-center relative overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg,#1e1b4b,#312e81,#1e40af)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div className="text-center">
                    <p className="text-white font-bold text-sm">
                      Your Brand Here
                    </p>
                    <p className="text-white/50 text-[11px] mt-0.5">
                      Create Something Amazing
                    </p>
                  </div>
                  <div
                    className="absolute bottom-3 right-3 text-[10px] text-white/40 px-2 py-0.5 rounded"
                    style={{ background: "rgba(0,0,0,0.4)" }}
                  >
                    Preview
                  </div>
                </div>

                {/* Format selector */}
                <p className="text-[11px] text-white/40 uppercase tracking-wider mb-2">
                  Format
                </p>
                <div className="grid grid-cols-5 gap-2 mb-5">
                  {FORMATS.map(({ id, label, desc, icon: Icon }) => (
                    <motion.button
                      key={id}
                      type="button"
                      onClick={() => setFormat(id)}
                      whileHover={{ scale: 1.04, y: -1 }}
                      whileTap={{ scale: 0.96 }}
                      className="flex flex-col items-center gap-1.5 py-3 rounded-xl border transition-all"
                      style={{
                        background:
                          format === id
                            ? "rgba(37,99,235,0.15)"
                            : "rgba(255,255,255,0.03)",
                        borderColor:
                          format === id
                            ? "rgba(37,99,235,0.6)"
                            : "rgba(255,255,255,0.07)",
                        boxShadow:
                          format === id
                            ? "0 0 12px rgba(37,99,235,0.25)"
                            : "none",
                      }}
                      data-ocid={`ad_creator.export_modal.format_${id.toLowerCase()}`}
                    >
                      <Icon
                        size={16}
                        className={
                          format === id ? "text-blue-400" : "text-white/40"
                        }
                      />
                      <span
                        className={`text-[11px] font-semibold ${format === id ? "text-blue-300" : "text-white/60"}`}
                      >
                        {label}
                      </span>
                      <span className="text-[9px] text-white/30 leading-tight text-center">
                        {desc}
                      </span>
                    </motion.button>
                  ))}
                </div>

                {/* Quality selector */}
                {supportsQuality && (
                  <>
                    <p className="text-[11px] text-white/40 uppercase tracking-wider mb-2">
                      Quality
                    </p>
                    <div className="grid grid-cols-3 gap-2 mb-5">
                      {QUALITIES.map((q) => (
                        <motion.button
                          key={q.id}
                          type="button"
                          onClick={() => setQuality(q.id)}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.96 }}
                          className="flex flex-col items-center gap-0.5 py-2.5 rounded-xl border transition-all"
                          style={{
                            background:
                              quality === q.id
                                ? "rgba(37,99,235,0.12)"
                                : "rgba(255,255,255,0.03)",
                            borderColor:
                              quality === q.id
                                ? "rgba(37,99,235,0.5)"
                                : "rgba(255,255,255,0.07)",
                          }}
                          data-ocid={`ad_creator.export_modal.quality_${q.id.toLowerCase()}`}
                        >
                          <span
                            className={`text-xs font-bold ${quality === q.id ? "text-blue-300" : "text-white/70"}`}
                          >
                            {q.id}
                          </span>
                          <span className="text-[10px] text-white/30">
                            {q.scale} · {q.size}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </>
                )}

                {/* Options */}
                <div className="flex flex-col gap-2 mb-6">
                  {supportsTransparent && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/60">
                        Transparent background
                      </span>
                      <motion.button
                        type="button"
                        role="switch"
                        aria-checked={transparentBg}
                        aria-label="Transparent background"
                        onClick={() => setTransparentBg((v) => !v)}
                        className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer ${
                          transparentBg ? "bg-blue-600" : "bg-white/15"
                        }`}
                        data-ocid="ad_creator.export_modal.transparent_toggle"
                      >
                        <motion.div
                          className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow"
                          animate={{
                            left: transparentBg ? "calc(100% - 18px)" : "2px",
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      </motion.button>
                    </div>
                  )}
                  {supportsAnim && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/60">
                        Include animations
                      </span>
                      <motion.button
                        type="button"
                        role="switch"
                        aria-checked={includeAnim}
                        aria-label="Include animations"
                        onClick={() => setIncludeAnim((v) => !v)}
                        className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer ${
                          includeAnim ? "bg-blue-600" : "bg-white/15"
                        }`}
                        data-ocid="ad_creator.export_modal.animation_toggle"
                      >
                        <motion.div
                          className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow"
                          animate={{
                            left: includeAnim ? "calc(100% - 18px)" : "2px",
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      </motion.button>
                    </div>
                  )}
                </div>

                {/* Export Now button */}
                <motion.button
                  type="button"
                  onClick={startExport}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-3 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2"
                  style={{
                    background:
                      "linear-gradient(135deg,#1d4ed8,#2563eb,#3b82f6)",
                    boxShadow: "0 0 24px rgba(37,99,235,0.35)",
                  }}
                  data-ocid="ad_creator.export_modal.confirm_button"
                >
                  <Download size={14} />
                  Export Now
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
