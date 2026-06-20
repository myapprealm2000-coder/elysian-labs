import { CANVAS_PRESETS } from "@/pages/editor/editorConstants";
import {
  AlignHorizontalDistributeCenter,
  AlignVerticalDistributeCenter,
  Check,
  Eraser,
  Grid3x3,
  Maximize2,
  Pipette,
  Sparkles,
  Upload,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Props {
  isOpen: boolean;
  onClose: () => void;
  /** Called when magic resize is applied: scale canvas + all elements */
  onMagicResize?: (width: number, height: number) => void;
  /** Called when color palette is extracted and should be applied */
  onColorMatch?: (palette: string[]) => void;
  /** Called when auto layout should reposition elements */
  onAutoLayout?: (
    mode: "horizontal" | "vertical" | "grid",
    spacing: number,
  ) => void;
  /** Called when AI enhance should be applied (image filter improvement) */
  onAIEnhance?: () => void;
  /** Called when background removal simulation should be applied */
  onRemoveBackground?: () => void;
  /** The currently selected canvas element — used to validate AI tool targets */
  selectedElement?: { id: string; type: string } | null;
  /** Current canvas dimensions needed for proportional preview */
  canvasWidth?: number;
  canvasHeight?: number;
}

// ─── Magic resize presets ────────────────────────────────────────────────────

const RESIZE_PRESETS = [
  { name: "YouTube", dims: "1280×720", icon: "▶", w: 1280, h: 720 },
  { name: "Instagram", dims: "1080×1080", icon: "📷", w: 1080, h: 1080 },
  { name: "TikTok", dims: "1080×1920", icon: "🎵", w: 1080, h: 1920 },
  { name: "Twitter", dims: "1500×500", icon: "🐦", w: 1500, h: 500 },
  { name: "LinkedIn", dims: "1200×628", icon: "💼", w: 1200, h: 628 },
  { name: "Custom", dims: "Custom", icon: "✏️", w: 0, h: 0 },
];

// ─── Color quantization: extract dominant colors from ImageData ───────────────

function extractDominantColors(imageData: ImageData, topN = 5): string[] {
  const counts: Record<string, number> = {};
  const { data } = imageData;
  for (let i = 0; i < data.length; i += 4) {
    const a = data[i + 3];
    if (a < 128) continue;
    const r = Math.round(data[i] / 32) * 32;
    const g = Math.round(data[i + 1] / 32) * 32;
    const b = Math.round(data[i + 2] / 32) * 32;
    if (r < 32 && g < 32 && b < 32) continue;
    if (r > 224 && g > 224 && b > 224) continue;
    const key = `${r},${g},${b}`;
    counts[key] = (counts[key] ?? 0) + 1;
  }
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([key]) => {
      const [r, g, b] = key.split(",").map(Number);
      return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
    });
}

// ─── Small spinner ────────────────────────────────────────────────────────────

function Spinner() {
  return (
    <svg
      className="animate-spin"
      width={14}
      height={14}
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="7"
        cy="7"
        r="5"
        stroke="currentColor"
        strokeWidth="2"
        strokeOpacity="0.25"
      />
      <path
        d="M12 7a5 5 0 0 0-5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Divider() {
  return (
    <div
      className="mx-4 my-4"
      style={{ height: 1, background: "rgba(255,255,255,0.06)" }}
    />
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function AIAssistantPanel({
  isOpen,
  onClose,
  onMagicResize,
  onColorMatch,
  onAutoLayout,
  onAIEnhance,
  onRemoveBackground,
  selectedElement,
}: Props) {
  const [layoutMode, setLayoutMode] = useState<
    "horizontal" | "vertical" | "grid"
  >("horizontal");
  const [spacing, setSpacing] = useState(20);
  const [resizeApplied, setResizeApplied] = useState<string | null>(null);

  // Color match
  const [extractedPalette, setExtractedPalette] = useState<string[]>([]);
  const [colorMatchProcessing, setColorMatchProcessing] = useState(false);
  const [colorMatchApplied, setColorMatchApplied] = useState(false);
  const colorFileRef = useRef<HTMLInputElement>(null);

  // AI enhance
  const [enhanceProcessing, setEnhanceProcessing] = useState(false);
  const [enhanceApplied, setEnhanceApplied] = useState(false);
  const [enhanceProgress, setEnhanceProgress] = useState(0);

  // Remove background
  const [removeBgProcessing, setRemoveBgProcessing] = useState(false);
  const [removeBgApplied, setRemoveBgApplied] = useState(false);
  const [removeBgProgress, setRemoveBgProgress] = useState(0);

  // Auto layout
  const [layoutApplied, setLayoutApplied] = useState(false);

  // ── Magic Resize ──
  const handleResize = (preset: (typeof RESIZE_PRESETS)[number]) => {
    if (preset.w === 0) return;
    onMagicResize?.(preset.w, preset.h);
    setResizeApplied(preset.name);
    setTimeout(() => setResizeApplied(null), 2000);
  };

  // ── Color Match ──
  const handleColorFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setColorMatchProcessing(true);
    setExtractedPalette([]);
    setColorMatchApplied(false);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const off = document.createElement("canvas");
        const sz = 120;
        off.width = sz;
        off.height = sz;
        const ctx = off.getContext("2d");
        if (!ctx) {
          setColorMatchProcessing(false);
          return;
        }
        ctx.drawImage(img, 0, 0, sz, sz);
        const imgData = ctx.getImageData(0, 0, sz, sz);
        const palette = extractDominantColors(imgData, 5);
        const final =
          palette.length >= 3
            ? palette
            : ["#2563EB", "#22C55E", "#f59e0b", "#ec4899", "#a855f7"];
        setExtractedPalette(final);
        setColorMatchProcessing(false);
      };
      img.onerror = () => setColorMatchProcessing(false);
      img.src = ev.target?.result as string;
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleApplyColorMatch = () => {
    if (extractedPalette.length === 0) return;
    onColorMatch?.(extractedPalette);
    setColorMatchApplied(true);
    setTimeout(() => setColorMatchApplied(false), 2000);
  };

  // ── Auto Layout ──
  const handleApplyLayout = () => {
    onAutoLayout?.(layoutMode, spacing);
    setLayoutApplied(true);
    setTimeout(() => setLayoutApplied(false), 2000);
  };

  // ── AI Enhance ──
  const handleAIEnhance = () => {
    if (enhanceProcessing) return;
    // Validate: only apply to a selected image element
    if (!selectedElement || selectedElement.type !== "image") {
      toast("Please select an image first.", { icon: "🖼️" });
      return;
    }
    setEnhanceProcessing(true);
    setEnhanceApplied(false);
    setEnhanceProgress(0);
    const interval = setInterval(() => {
      setEnhanceProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + Math.random() * 18 + 6;
      });
    }, 80);
    setTimeout(() => {
      clearInterval(interval);
      setEnhanceProgress(100);
      setEnhanceProcessing(false);
      setEnhanceApplied(true);
      onAIEnhance?.();
      setTimeout(() => setEnhanceApplied(false), 2500);
    }, 1500);
  };

  // ── Remove Background ──
  const handleRemoveBackground = () => {
    if (removeBgProcessing) return;
    // Validate: only apply to a selected image element
    if (!selectedElement || selectedElement.type !== "image") {
      toast("Please select an image first.", { icon: "🖼️" });
      return;
    }
    setRemoveBgProcessing(true);
    setRemoveBgApplied(false);
    setRemoveBgProgress(0);
    const interval = setInterval(() => {
      setRemoveBgProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + Math.random() * 10 + 4;
      });
    }, 80);
    setTimeout(() => {
      clearInterval(interval);
      setRemoveBgProgress(100);
      setRemoveBgProcessing(false);
      setRemoveBgApplied(true);
      onRemoveBackground?.();
      setTimeout(() => setRemoveBgApplied(false), 2500);
    }, 2000);
  };

  return (
    <>
      <input
        ref={colorFileRef}
        type="file"
        accept="image/*"
        onChange={handleColorFileChange}
        style={{ display: "none" }}
        tabIndex={-1}
      />
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            className="fixed right-0 top-0 h-full z-40 overflow-y-auto flex flex-col"
            style={{
              width: 320,
              background: "#0F172A",
              borderLeft: "1px solid rgba(255,255,255,0.06)",
              fontFamily: "Inter, sans-serif",
            }}
            initial={{ x: 320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 320, opacity: 0 }}
            transition={{ type: "spring", damping: 26, stiffness: 280 }}
            data-ocid="ai-assistant-panel"
          >
            {/* Header */}
            <div
              className="flex items-center gap-2.5 px-5 py-4 border-b"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #2563EB22, #22C55E22)",
                  border: "1px solid rgba(37,99,235,0.3)",
                }}
              >
                <Sparkles size={15} className="text-[#2563EB]" />
              </div>
              <span className="text-[14px] font-semibold text-white/90 flex-1">
                AI Design Assistant
              </span>
              <button
                type="button"
                onClick={onClose}
                className="w-7 h-7 flex items-center justify-center rounded-lg text-white/30 hover:text-white/70 hover:bg-white/10 transition-all"
                data-ocid="ai-panel-close"
              >
                <X size={14} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-none">
              {/* Magic Resize */}
              <div className="px-4 pt-5 pb-2">
                <div className="flex items-center gap-2 mb-2">
                  <Maximize2 size={13} className="text-[#22C55E]" />
                  <p className="text-[11px] font-semibold text-white/50 uppercase tracking-widest">
                    Magic Resize
                  </p>
                </div>
                <p className="text-[11px] text-white/35 mb-3 leading-relaxed">
                  Select a platform to instantly resize the canvas and scale all
                  elements proportionally.
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {RESIZE_PRESETS.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => handleResize(preset)}
                      className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border transition-all ${resizeApplied === preset.name ? "bg-[#22C55E]/10 border-[#22C55E]/40 text-[#22C55E]" : "bg-white/[0.03] border-white/[0.06] hover:border-[#2563EB]/40 hover:bg-[#2563EB]/5 text-white/60 hover:text-white/90"}`}
                      data-ocid={`magic-resize-${preset.name.toLowerCase()}`}
                    >
                      <span className="text-lg leading-none">
                        {preset.icon}
                      </span>
                      <span className="text-[11px] font-semibold">
                        {preset.name}
                      </span>
                      <span className="text-[9px] text-white/30">
                        {preset.dims}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <Divider />

              {/* Color Match */}
              <div className="px-4 pb-2">
                <div className="flex items-center gap-2 mb-2">
                  <Pipette size={13} className="text-[#f59e0b]" />
                  <p className="text-[11px] font-semibold text-white/50 uppercase tracking-widest">
                    Color Match
                  </p>
                </div>
                <p className="text-[11px] text-white/35 mb-3 leading-relaxed">
                  Upload an image to extract its dominant palette and apply
                  colors to canvas elements.
                </p>
                <button
                  type="button"
                  onClick={() => colorFileRef.current?.click()}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-white/[0.12] text-white/40 hover:text-white/70 hover:border-[#f59e0b]/40 hover:bg-[#f59e0b]/5 transition-all text-[12px] mb-3"
                  data-ocid="color-match-upload"
                >
                  {colorMatchProcessing ? (
                    <>
                      <Spinner />
                      <span>Analyzing…</span>
                    </>
                  ) : (
                    <>
                      <Upload size={13} />
                      <span>Upload image to extract colors</span>
                    </>
                  )}
                </button>
                {extractedPalette.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-3"
                  >
                    <p className="text-[10px] text-white/30 uppercase tracking-widest mb-2">
                      Extracted Palette
                    </p>
                    <div className="flex gap-2 mb-1">
                      {extractedPalette.map((c) => (
                        <div
                          key={c}
                          className="flex-1 rounded-lg border border-white/[0.08]"
                          style={{ background: c, height: 32 }}
                          title={c}
                        />
                      ))}
                    </div>
                    <div className="flex gap-1">
                      {extractedPalette.map((c) => (
                        <span
                          key={c}
                          className="flex-1 text-center text-[8px] text-white/30 font-mono truncate"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
                <button
                  type="button"
                  onClick={handleApplyColorMatch}
                  disabled={extractedPalette.length === 0 || colorMatchApplied}
                  className={`w-full h-9 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                    colorMatchApplied
                      ? "bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30"
                      : extractedPalette.length === 0
                        ? "bg-white/[0.04] text-white/20 border border-white/[0.06] cursor-not-allowed"
                        : "bg-[#f59e0b]/90 text-black hover:bg-[#f59e0b] active:scale-95"
                  }`}
                  data-ocid="color-match-apply"
                >
                  {colorMatchApplied ? (
                    <>
                      <Check size={12} /> Applied!
                    </>
                  ) : (
                    "Apply Palette"
                  )}
                </button>
              </div>

              <Divider />

              {/* Auto Layout */}
              <div className="px-4 pb-2">
                <div className="flex items-center gap-2 mb-2">
                  <Grid3x3 size={13} className="text-[#2563EB]" />
                  <p className="text-[11px] font-semibold text-white/50 uppercase tracking-widest">
                    Auto Layout
                  </p>
                </div>
                <p className="text-[11px] text-white/35 mb-3 leading-relaxed">
                  Reposition elements with intelligent alignment and even
                  distribution.
                </p>
                <div className="flex gap-1 mb-4">
                  {[
                    {
                      id: "horizontal" as const,
                      icon: <AlignHorizontalDistributeCenter size={14} />,
                      label: "Horiz",
                    },
                    {
                      id: "vertical" as const,
                      icon: <AlignVerticalDistributeCenter size={14} />,
                      label: "Vert",
                    },
                    {
                      id: "grid" as const,
                      icon: <Grid3x3 size={14} />,
                      label: "Grid",
                    },
                  ].map(({ id, icon, label }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setLayoutMode(id)}
                      className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-xl border transition-all text-[11px] ${
                        layoutMode === id
                          ? "bg-[#2563EB]/15 border-[#2563EB]/40 text-[#2563EB]"
                          : "bg-white/[0.03] border-white/[0.06] text-white/40 hover:text-white/70 hover:bg-white/[0.06]"
                      }`}
                      data-ocid={`auto-layout-${id}`}
                    >
                      {icon}
                      <span>{label}</span>
                    </button>
                  ))}
                </div>
                <div className="mb-4">
                  <div className="flex justify-between mb-1.5">
                    <p className="text-[10px] text-white/30 uppercase tracking-widest">
                      Spacing
                    </p>
                    <span className="text-[10px] text-white/50 font-mono">
                      {spacing}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={spacing}
                    onChange={(e) => setSpacing(Number(e.target.value))}
                    className="w-full h-1.5 rounded-full accent-[#2563EB] cursor-pointer"
                    data-ocid="auto-layout-spacing"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleApplyLayout}
                  className={`w-full h-10 rounded-xl text-white text-sm font-semibold transition-all active:scale-95 flex items-center justify-center gap-2 ${layoutApplied ? "bg-[#22C55E]/80" : "hover:opacity-90"}`}
                  style={
                    layoutApplied
                      ? {}
                      : {
                          background:
                            "linear-gradient(135deg, #2563EB, #1d4ed8)",
                          boxShadow: "0 4px 14px rgba(37,99,235,0.35)",
                        }
                  }
                  data-ocid="auto-layout-apply"
                >
                  {layoutApplied ? (
                    <>
                      <Check size={13} /> Layout Applied!
                    </>
                  ) : (
                    "Apply Layout"
                  )}
                </button>
              </div>

              <Divider />

              {/* AI Enhance */}
              <div className="px-4 pb-2">
                <div className="flex items-center gap-2 mb-2">
                  <Zap size={13} className="text-[#a855f7]" />
                  <p className="text-[11px] font-semibold text-white/50 uppercase tracking-widest">
                    AI Enhance
                  </p>
                </div>
                <p className="text-[11px] text-white/35 mb-3 leading-relaxed">
                  Visibly sharpen, boost contrast, and improve clarity on image
                  elements.
                </p>
                {enhanceProcessing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-3"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] text-[#a855f7] flex items-center gap-1.5">
                        <Spinner /> Processing…
                      </span>
                      <span className="text-[11px] text-white/40 font-mono">
                        {Math.min(100, Math.round(enhanceProgress))}%
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background:
                            "linear-gradient(90deg, #a855f7, #ec4899)",
                        }}
                        animate={{
                          width: `${Math.min(100, enhanceProgress)}%`,
                        }}
                        transition={{ duration: 0.1 }}
                      />
                    </div>
                  </motion.div>
                )}
                <button
                  type="button"
                  onClick={handleAIEnhance}
                  disabled={enhanceProcessing}
                  className={`w-full h-10 rounded-xl text-sm font-semibold transition-all active:scale-95 flex items-center justify-center gap-2 ${
                    enhanceApplied
                      ? "bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30"
                      : enhanceProcessing
                        ? "bg-[#a855f7]/20 text-[#a855f7] border border-[#a855f7]/20 cursor-wait"
                        : "text-white hover:opacity-90"
                  }`}
                  style={
                    enhanceApplied || enhanceProcessing
                      ? {}
                      : {
                          background:
                            "linear-gradient(135deg, #a855f7, #7c3aed)",
                          boxShadow: "0 4px 14px rgba(168,85,247,0.35)",
                        }
                  }
                  data-ocid="ai-enhance-apply"
                >
                  {enhanceApplied ? (
                    <>
                      <Check size={13} /> Enhanced!
                    </>
                  ) : enhanceProcessing ? (
                    <>
                      <Spinner /> Enhancing…
                    </>
                  ) : (
                    <>
                      <Zap size={13} /> AI Enhance
                    </>
                  )}
                </button>
              </div>

              <Divider />

              {/* Remove Background */}
              <div className="px-4 pb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Eraser size={13} className="text-[#ec4899]" />
                  <p className="text-[11px] font-semibold text-white/50 uppercase tracking-widest">
                    Remove Background
                  </p>
                </div>
                <p className="text-[11px] text-white/35 mb-3 leading-relaxed">
                  Isolate the foreground subject and visually remove the
                  background from selected images.
                </p>
                {removeBgProcessing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-3"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] text-[#ec4899] flex items-center gap-1.5">
                        <Spinner /> AI processing…
                      </span>
                      <span className="text-[11px] text-white/40 font-mono">
                        {Math.min(100, Math.round(removeBgProgress))}%
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background:
                            "linear-gradient(90deg, #ec4899, #f43f5e)",
                        }}
                        animate={{
                          width: `${Math.min(100, removeBgProgress)}%`,
                        }}
                        transition={{ duration: 0.1 }}
                      />
                    </div>
                    <div
                      className="mt-2 rounded-lg overflow-hidden"
                      style={{
                        height: 24,
                        background: `linear-gradient(90deg, rgba(236,72,153,0.15) ${removeBgProgress}%, rgba(255,255,255,0.03) ${removeBgProgress}%)`,
                        border: "1px solid rgba(236,72,153,0.2)",
                        transition: "background 0.1s",
                      }}
                    />
                  </motion.div>
                )}
                <button
                  type="button"
                  onClick={handleRemoveBackground}
                  disabled={removeBgProcessing}
                  className={`w-full h-10 rounded-xl text-sm font-semibold transition-all active:scale-95 flex items-center justify-center gap-2 ${
                    removeBgApplied
                      ? "bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30"
                      : removeBgProcessing
                        ? "bg-[#ec4899]/20 text-[#ec4899] border border-[#ec4899]/20 cursor-wait"
                        : "text-white hover:opacity-90"
                  }`}
                  style={
                    removeBgApplied || removeBgProcessing
                      ? {}
                      : {
                          background:
                            "linear-gradient(135deg, #ec4899, #be185d)",
                          boxShadow: "0 4px 14px rgba(236,72,153,0.35)",
                        }
                  }
                  data-ocid="remove-bg-apply"
                >
                  {removeBgApplied ? (
                    <>
                      <Check size={13} /> Background Removed!
                    </>
                  ) : removeBgProcessing ? (
                    <>
                      <Spinner /> Removing…
                    </>
                  ) : (
                    <>
                      <Eraser size={13} /> Remove Background
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

// Keep CANVAS_PRESETS re-export for any consumers
export { CANVAS_PRESETS };
