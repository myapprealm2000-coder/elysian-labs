import { useAdCreatorStore } from "@/store/adCreatorStore";
import type { ImageCanvasElement } from "@/store/adCreatorStore";
import { Download, ImagePlay, Plus, RefreshCw, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

type Style =
  | "Realistic"
  | "Anime"
  | "Cinematic"
  | "3D Render"
  | "Minimalist"
  | "Neon"
  | "Watercolor";
type Ratio = "1:1" | "16:9" | "9:16" | "4:3";

const STYLES: Style[] = [
  "Realistic",
  "Anime",
  "Cinematic",
  "3D Render",
  "Minimalist",
  "Neon",
  "Watercolor",
];
const RATIOS: Ratio[] = ["1:1", "16:9", "9:16", "4:3"];
const RATIO_DIMS: Record<Ratio, [number, number]> = {
  "1:1": [512, 512],
  "16:9": [912, 512],
  "9:16": [512, 912],
  "4:3": [680, 512],
};

const GEN_STAGES = [
  "Analyzing prompt...",
  "Creating composition...",
  "Rendering lighting...",
  "Adding details...",
];

interface GenImage {
  url: string;
  seed: number;
  status: "loading" | "ready" | "error";
}

function buildUrl(
  prompt: string,
  style: Style,
  ratio: Ratio,
  seed: number,
): string {
  const [w, h] = RATIO_DIMS[ratio];
  const styled = `${prompt}, ${style.toLowerCase()} style, high quality, detailed`;
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(styled)}?width=${w}&height=${h}&seed=${seed}&nologo=true&enhance=true`;
}

export function AiImageGenModal({ open, onClose }: Props) {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState<Style>("Cinematic");
  const [ratio, setRatio] = useState<Ratio>("1:1");
  const [phase, setPhase] = useState<"form" | "loading" | "results">("form");
  const [stageIdx, setStageIdx] = useState(0);
  const [images, setImages] = useState<GenImage[]>([]);
  const { addElement, canvasSize } = useAdCreatorStore();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    if (process.env.NODE_ENV === "development")
      console.log("[AiImageGenModal] mounted");
    return () => {
      mountedRef.current = false;
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (!open) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
  }, [open]);

  const generate = useCallback(
    (currentPrompt: string, currentStyle: Style, currentRatio: Ratio) => {
      if (!currentPrompt.trim()) return;
      // Clean up any previous generation
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      const seeds = Array.from({ length: 4 }, () =>
        Math.floor(Math.random() * 999999),
      );
      const newImages: GenImage[] = seeds.map((seed) => ({
        url: buildUrl(currentPrompt, currentStyle, currentRatio, seed),
        seed,
        status: "loading" as const,
      }));
      setImages(newImages);
      setStageIdx(0);
      setPhase("loading");

      let idx = 0;
      intervalRef.current = setInterval(() => {
        if (!mountedRef.current) return;
        idx++;
        setStageIdx(Math.min(idx, GEN_STAGES.length - 1));
        if (idx >= GEN_STAGES.length - 1) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          timeoutRef.current = setTimeout(() => {
            if (mountedRef.current) setPhase("results");
          }, 400);
        }
      }, 600);
    },
    [],
  );

  function regenerateOne(idx: number) {
    const newSeed = Math.floor(Math.random() * 999999);
    const newUrl = buildUrl(prompt, style, ratio, newSeed);
    setImages((prev) =>
      prev.map((img, i) =>
        i === idx ? { url: newUrl, seed: newSeed, status: "loading" } : img,
      ),
    );
  }

  function handleImageLoad(idx: number) {
    setImages((prev) =>
      prev.map((img, i) => (i === idx ? { ...img, status: "ready" } : img)),
    );
  }

  function handleImageError(idx: number) {
    setImages((prev) =>
      prev.map((img, i) => (i === idx ? { ...img, status: "error" } : img)),
    );
  }

  function handleAddToCanvas(img: GenImage) {
    const [w, h] = RATIO_DIMS[ratio];
    const scale = Math.min(
      (canvasSize.width * 0.6) / w,
      (canvasSize.height * 0.6) / h,
    );
    addElement({
      type: "image",
      name: "AI Generated Image",
      src: img.url,
      x: (canvasSize.width - w * scale) / 2,
      y: (canvasSize.height - h * scale) / 2,
      width: w * scale,
      height: h * scale,
      rotation: 0,
      opacity: 1,
      locked: false,
      visible: true,
      filters: {
        brightness: 100,
        contrast: 100,
        saturation: 100,
        blur: 0,
        hue: 0,
      },
      shadow: null,
      backgroundRemoved: false,
      mask: null,
    } as Omit<ImageCanvasElement, "id">);
    onClose();
  }

  function handleDownload(img: GenImage) {
    const a = document.createElement("a");
    a.href = img.url;
    a.download = `ai-image-${img.seed}.jpg`;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.click();
  }

  const [w, h] = RATIO_DIMS[ratio];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="ai-img-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            background: "oklch(0 0 0 / 0.75)",
            backdropFilter: "blur(8px)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
          data-ocid="ai_image_gen.dialog"
        >
          <motion.div
            className="relative w-full max-w-2xl mx-4 rounded-2xl overflow-hidden shadow-glass-lg max-h-[90vh] flex flex-col"
            style={{
              background: "oklch(0.11 0.006 240 / 0.97)",
              border: "1px solid oklch(0.25 0 0 / 0.4)",
            }}
            initial={{ scale: 0.94, y: 24, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.94, y: 24, opacity: 0 }}
            transition={{ type: "spring", damping: 22, stiffness: 280 }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-4 flex-shrink-0"
              style={{ borderBottom: "1px solid oklch(0.2 0 0 / 0.4)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                  }}
                >
                  <ImagePlay size={16} className="text-white" />
                </div>
                <h2 className="text-white font-semibold text-lg font-editor">
                  AI Image Generator
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-smooth"
                data-ocid="ai_image_gen.close_button"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              {/* Prompt always visible */}
              <div className="space-y-4 mb-5">
                <input
                  className="w-full editor-input-glass text-sm"
                  placeholder="Describe the image you want..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && generate(prompt, style, ratio)
                  }
                  data-ocid="ai_image_gen.input"
                />
                <div className="flex flex-wrap gap-2">
                  {STYLES.map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setStyle(s)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium font-editor transition-smooth"
                      style={
                        style === s
                          ? {
                              background:
                                "linear-gradient(135deg, #7c3aed, #a855f7)",
                              color: "#fff",
                            }
                          : {
                              background: "oklch(0.16 0 0 / 0.5)",
                              color: "oklch(0.7 0 0)",
                              border: "1px solid oklch(0.22 0 0 / 0.5)",
                            }
                      }
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2 items-center">
                  <span className="text-xs text-white/40 font-editor">
                    Ratio:
                  </span>
                  {RATIOS.map((r) => (
                    <button
                      type="button"
                      key={r}
                      onClick={() => setRatio(r)}
                      className="px-3 py-1 rounded-lg text-xs font-medium font-editor transition-smooth"
                      style={
                        ratio === r
                          ? {
                              background: "oklch(0.38 0.15 270 / 0.3)",
                              color: "#93c5fd",
                              border: "1px solid #2563eb",
                            }
                          : {
                              background: "oklch(0.14 0 0 / 0.5)",
                              color: "oklch(0.6 0 0)",
                              border: "1px solid oklch(0.22 0 0 / 0.4)",
                            }
                      }
                      data-ocid="ai_image_gen.radio"
                    >
                      {r}
                    </button>
                  ))}
                  <span
                    className="text-xs font-editor ml-auto"
                    style={{ color: "oklch(0.4 0 0)" }}
                  >
                    {w}×{h}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => generate(prompt, style, ratio)}
                  disabled={!prompt.trim()}
                  className="w-full py-3 rounded-xl text-white font-semibold font-editor text-sm transition-smooth disabled:opacity-40"
                  style={{
                    background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                    boxShadow: "0 0 20px #7c3aed44",
                  }}
                  data-ocid="ai_image_gen.primary_button"
                >
                  Generate 4 Images
                </button>
              </div>

              <AnimatePresence mode="wait">
                {phase === "loading" && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                    data-ocid="ai_image_gen.loading_state"
                  >
                    <div className="flex flex-col items-center gap-3 py-4">
                      <div className="flex gap-1.5">
                        {[0, 1, 2, 3].map((i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 rounded-full"
                            style={{ background: "#a855f7" }}
                            animate={{
                              scale: [1, 1.6, 1],
                              opacity: [0.4, 1, 0.4],
                            }}
                            transition={{
                              duration: 1,
                              delay: i * 0.18,
                              repeat: Number.POSITIVE_INFINITY,
                            }}
                          />
                        ))}
                      </div>
                      <p className="text-white/70 font-editor text-sm">
                        {GEN_STAGES[stageIdx]}
                      </p>
                      <div
                        className="w-full h-1 rounded-full"
                        style={{ background: "oklch(0.18 0 0)" }}
                      >
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            background:
                              "linear-gradient(90deg, #7c3aed, #a855f7)",
                          }}
                          animate={{
                            width: `${((stageIdx + 1) / GEN_STAGES.length) * 100}%`,
                          }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {phase === "results" && (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs text-white/50 font-editor">
                        {images.length} images generated
                      </p>
                      <button
                        type="button"
                        onClick={() => generate(prompt, style, ratio)}
                        className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white font-editor transition-smooth"
                        data-ocid="ai_image_gen.secondary_button"
                      >
                        <RefreshCw size={12} /> Regenerate All
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {images.map((img, idx) => (
                        <motion.div
                          key={`${img.seed}-${idx}`}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.08 }}
                          className="relative rounded-xl overflow-hidden group"
                          style={{
                            aspectRatio: `${w}/${h}`,
                            background: "oklch(0.14 0 0)",
                          }}
                          data-ocid={`ai_image_gen.item.${idx + 1}`}
                        >
                          {img.status === "loading" && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div
                                className="w-8 h-8 rounded-full border-2 border-purple-500/30 border-t-purple-500"
                                style={{ animation: "spin 1s linear infinite" }}
                              />
                            </div>
                          )}
                          {img.status === "error" && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                              <p className="text-white/40 text-xs font-editor">
                                Failed to load
                              </p>
                              <button
                                type="button"
                                onClick={() => regenerateOne(idx)}
                                className="text-purple-400 text-xs font-editor hover:underline"
                              >
                                Retry
                              </button>
                            </div>
                          )}
                          <img
                            src={img.url}
                            alt={`Generated ${idx + 1}`}
                            className="w-full h-full object-cover"
                            style={{
                              display:
                                img.status === "loading" ? "none" : "block",
                            }}
                            onLoad={() => handleImageLoad(idx)}
                            onError={() => handleImageError(idx)}
                          />
                          {img.status === "ready" && (
                            <div
                              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-smooth flex flex-col items-center justify-center gap-2"
                              style={{ background: "oklch(0 0 0 / 0.65)" }}
                            >
                              <div className="flex gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleAddToCanvas(img)}
                                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold font-editor transition-smooth"
                                  style={{
                                    background: "#7c3aed",
                                    color: "#fff",
                                  }}
                                  data-ocid="ai_image_gen.button"
                                >
                                  <Plus size={12} /> Add to Canvas
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDownload(img)}
                                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white hover:bg-white/20 transition-smooth"
                                  data-ocid="ai_image_gen.button"
                                >
                                  <Download size={14} />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => regenerateOne(idx)}
                                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white hover:bg-white/20 transition-smooth"
                                  data-ocid="ai_image_gen.button"
                                >
                                  <RefreshCw size={14} />
                                </button>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      ))}
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
