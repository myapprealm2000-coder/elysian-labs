import { useAdCreatorStore } from "@/store/adCreatorStore";
import type {
  ShapeCanvasElement,
  TextCanvasElement,
} from "@/store/adCreatorStore";
import { Check, RefreshCw, Wand2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const PLATFORMS = [
  "Instagram",
  "TikTok",
  "YouTube",
  "Facebook",
  "LinkedIn",
  "Twitter",
];
const STYLES = ["Luxury", "Modern", "Bold", "Minimal", "Cinematic", "Playful"];

const STAGES = [
  { label: "Analyzing prompt...", pct: 20 },
  { label: "Designing layout...", pct: 40 },
  { label: "Selecting typography...", pct: 60 },
  { label: "Applying styles...", pct: 80 },
  { label: "Generating variations...", pct: 100 },
];

const DESIGN_VARIANTS = [
  {
    id: 1,
    label: "Dark Luxury",
    bg: "linear-gradient(135deg, #0a0010 0%, #1a0030 50%, #0d0020 100%)",
    accent: "#c084fc",
    headline: "Premium Collection",
    sub: "Elevate your aesthetic",
    cta: "Shop Now",
    tag: "Luxury",
    platform: "Instagram",
  },
  {
    id: 2,
    label: "Neon Gaming",
    bg: "linear-gradient(135deg, #050510 0%, #0a0a1a 100%)",
    accent: "#00fff7",
    headline: "LEVEL UP",
    sub: "Your Game. Your Rules.",
    cta: "Play Now",
    tag: "Gaming",
    platform: "TikTok",
  },
  {
    id: 3,
    label: "Minimal Clean",
    bg: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
    accent: "#212529",
    headline: "Less is More",
    sub: "Pure simplicity, maximum impact",
    cta: "Discover",
    tag: "Minimal",
    platform: "LinkedIn",
  },
  {
    id: 4,
    label: "Gradient Bold",
    bg: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #2563eb 100%)",
    accent: "#ffffff",
    headline: "Bold. Brave. Beautiful.",
    sub: "Make your mark today",
    cta: "Get Started",
    tag: "Bold",
    platform: "Facebook",
  },
  {
    id: 5,
    label: "Cinematic",
    bg: "linear-gradient(135deg, #0c0c0c 0%, #1a1a14 50%, #0d0d08 100%)",
    accent: "#d97706",
    headline: "A Story Unfolds",
    sub: "Cinematic storytelling",
    cta: "Watch Now",
    tag: "Cinematic",
    platform: "YouTube",
  },
  {
    id: 6,
    label: "Vibrant Social",
    bg: "linear-gradient(135deg, #f97316 0%, #ef4444 100%)",
    accent: "#ffffff",
    headline: "GO VIRAL TODAY!",
    sub: "The content that converts",
    cta: "Try Free",
    tag: "Viral",
    platform: "TikTok",
  },
  {
    id: 7,
    label: "Tech Modern",
    bg: "linear-gradient(135deg, #020817 0%, #0f172a 100%)",
    accent: "#2563eb",
    headline: "Future Forward",
    sub: "Technology meets creativity",
    cta: "Explore",
    tag: "Modern",
    platform: "Twitter",
  },
  {
    id: 8,
    label: "Warm Lifestyle",
    bg: "linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #fcd34d 100%)",
    accent: "#92400e",
    headline: "Live Your Best Life",
    sub: "Warm moments, big memories",
    cta: "Join Us",
    tag: "Lifestyle",
    platform: "Instagram",
  },
];

export function MagicDesignModal({ open, onClose }: Props) {
  const [step, setStep] = useState<"input" | "loading" | "results">("input");
  const [prompt, setPrompt] = useState("");
  const [platform, setPlatform] = useState("Instagram");
  const [style, setStyle] = useState("Luxury");
  const [stageIdx, setStageIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [selected, setSelected] = useState<number>(1);
  const { addElement, setCanvasSize } = useAdCreatorStore();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mountedRef = useRef(true);

  // Track mounted state
  useEffect(() => {
    mountedRef.current = true;
    if (process.env.NODE_ENV === "development")
      console.log("[MagicDesignModal] mounted");
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
      setStep("input");
      setStageIdx(0);
      setProgress(0);
    }
  }, [open]);

  useEffect(() => {
    if (step !== "loading") return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    setProgress(STAGES[0].pct);
    intervalRef.current = setInterval(() => {
      if (!mountedRef.current) return;
      setStageIdx((prev) => {
        const next = prev + 1;
        if (!mountedRef.current) return prev;
        setProgress(STAGES[Math.min(next, STAGES.length - 1)].pct);
        if (next >= STAGES.length) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          timeoutRef.current = setTimeout(() => {
            if (mountedRef.current) setStep("results");
          }, 300);
          return prev;
        }
        return next;
      });
    }, 500);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [step]);

  function handleGenerate() {
    if (!prompt.trim()) return;
    setStageIdx(0);
    setProgress(0);
    setStep("loading");
  }

  function handleApply() {
    const design = DESIGN_VARIANTS.find((d) => d.id === selected);
    if (!design) return;
    setCanvasSize({
      name:
        design.platform === "YouTube" ? "YouTube Thumbnail" : "Instagram Post",
      width: 1080,
      height: 1080,
    });
    addElement({
      type: "shape",
      name: "AI Background",
      x: 0,
      y: 0,
      width: 1080,
      height: 1080,
      rotation: 0,
      opacity: 1,
      locked: true,
      visible: true,
      shapeType: "rect",
      fill: design.bg,
      gradient: design.bg,
      stroke: "transparent",
      strokeWidth: 0,
      strokeDash: [],
      glow: null,
      shadow: null,
      cornerRadius: 0,
    } as Omit<ShapeCanvasElement, "id">);
    addElement({
      type: "text",
      name: "AI Headline",
      x: 100,
      y: 380,
      width: 880,
      height: 120,
      rotation: 0,
      opacity: 1,
      locked: false,
      visible: true,
      content: design.headline,
      fontFamily: "Inter",
      fontSize: 80,
      fontWeight: "700",
      color: design.accent,
      textAlign: "center",
      lineHeight: 1.1,
      letterSpacing: -2,
      gradient: false,
      gradientColors: [design.accent, design.accent],
      shadow: null,
      glow: null,
      outline: null,
      animation: null,
      blendMode: "normal",
    } as Omit<TextCanvasElement, "id">);
    addElement({
      type: "text",
      name: "AI Subtitle",
      x: 150,
      y: 510,
      width: 780,
      height: 60,
      rotation: 0,
      opacity: 1,
      locked: false,
      visible: true,
      content: design.sub,
      fontFamily: "Inter",
      fontSize: 36,
      fontWeight: "400",
      color: design.accent,
      textAlign: "center",
      lineHeight: 1.4,
      letterSpacing: 0,
      gradient: false,
      gradientColors: [design.accent, design.accent],
      shadow: null,
      glow: null,
      outline: null,
      animation: null,
      blendMode: "normal",
    } as Omit<TextCanvasElement, "id">);
    onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="magic-design-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            background: "oklch(0 0 0 / 0.75)",
            backdropFilter: "blur(8px)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
          data-ocid="magic_design.dialog"
        >
          <motion.div
            className="relative w-full max-w-3xl mx-4 rounded-2xl overflow-hidden shadow-glass-lg"
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
              className="flex items-center justify-between px-6 py-4"
              style={{ borderBottom: "1px solid oklch(0.2 0 0 / 0.4)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                  }}
                >
                  <Wand2 size={16} className="text-white" />
                </div>
                <h2 className="text-white font-semibold text-lg font-editor">
                  Magic Design
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-smooth"
                data-ocid="magic_design.close_button"
              >
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                {step === "input" && (
                  <motion.div
                    key="input"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-5"
                  >
                    <textarea
                      className="w-full h-24 editor-input-glass rounded-xl resize-none p-4 text-sm placeholder-white/30"
                      placeholder="Describe your ad... (e.g., Luxury skincare Instagram ad with gold accents)"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      data-ocid="magic_design.textarea"
                    />
                    <div>
                      <p className="text-xs text-white/40 uppercase tracking-widest mb-2 font-editor">
                        Platform
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {PLATFORMS.map((p) => (
                          <button
                            type="button"
                            key={p}
                            onClick={() => setPlatform(p)}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium font-editor transition-smooth"
                            style={
                              platform === p
                                ? {
                                    background: "#2563eb",
                                    color: "#fff",
                                    boxShadow: "0 0 14px #2563eb66",
                                  }
                                : {
                                    background: "oklch(0.16 0 0 / 0.5)",
                                    color: "oklch(0.7 0 0)",
                                    border: "1px solid oklch(0.22 0 0 / 0.5)",
                                  }
                            }
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-white/40 uppercase tracking-widest mb-2 font-editor">
                        Style
                      </p>
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
                                      "linear-gradient(135deg, #4f46e5, #7c3aed)",
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
                    </div>
                    <button
                      type="button"
                      onClick={handleGenerate}
                      disabled={!prompt.trim()}
                      className="w-full py-3.5 rounded-xl text-white font-semibold font-editor text-sm transition-smooth disabled:opacity-40"
                      style={{
                        background: "linear-gradient(135deg, #2563eb, #4f46e5)",
                        boxShadow: "0 0 24px #2563eb55",
                      }}
                      data-ocid="magic_design.primary_button"
                    >
                      Generate Designs
                    </button>
                  </motion.div>
                )}

                {step === "loading" && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-8 space-y-6"
                    data-ocid="magic_design.loading_state"
                  >
                    <div className="flex flex-col items-center gap-4">
                      <div className="relative w-16 h-16">
                        <div
                          className="absolute inset-0 rounded-full"
                          style={{
                            background:
                              "conic-gradient(#2563eb, #7c3aed, #2563eb)",
                            animation: "spin 2s linear infinite",
                          }}
                        />
                        <div
                          className="absolute inset-1 rounded-full"
                          style={{ background: "oklch(0.11 0.006 240)" }}
                        />
                        <Wand2
                          size={24}
                          className="absolute inset-0 m-auto text-purple-400"
                        />
                      </div>
                      <div className="text-center">
                        <p className="text-white font-medium font-editor">
                          {STAGES[stageIdx]?.label}
                        </p>
                        <p className="text-white/40 text-sm mt-1 font-editor">
                          {STAGES[stageIdx]?.pct}%
                        </p>
                      </div>
                    </div>
                    <div
                      className="w-full h-2 rounded-full"
                      style={{ background: "oklch(0.18 0 0)" }}
                    >
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background:
                            "linear-gradient(90deg, #2563eb, #7c3aed)",
                        }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                      />
                    </div>
                    <div className="grid grid-cols-5 gap-1">
                      {STAGES.map((s, i) => (
                        <div
                          key={s.label}
                          className="flex flex-col items-center gap-1"
                        >
                          <div
                            className="w-2 h-2 rounded-full transition-smooth"
                            style={{
                              background:
                                i <= stageIdx ? "#2563eb" : "oklch(0.25 0 0)",
                            }}
                          />
                          <p
                            className="text-xs text-center font-editor"
                            style={{
                              color:
                                i <= stageIdx ? "#93c5fd" : "oklch(0.4 0 0)",
                            }}
                          >
                            {s.label.split("...")[0]}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === "results" && (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-white/60 font-editor">
                        8 designs generated for{" "}
                        <span className="text-white">{platform}</span> ·{" "}
                        <span className="text-purple-400">{style}</span>
                      </p>
                      <button
                        type="button"
                        onClick={handleGenerate}
                        className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white font-editor transition-smooth"
                        data-ocid="magic_design.secondary_button"
                      >
                        <RefreshCw size={12} /> Regenerate
                      </button>
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                      {DESIGN_VARIANTS.map((d) => (
                        <motion.button
                          type="button"
                          key={d.id}
                          onClick={() => setSelected(d.id)}
                          whileHover={{ scale: 1.04, y: -2 }}
                          whileTap={{ scale: 0.97 }}
                          className="relative rounded-xl overflow-hidden cursor-pointer transition-smooth"
                          style={{
                            aspectRatio: "1",
                            background: d.bg,
                            border:
                              selected === d.id
                                ? "2px solid #2563eb"
                                : "2px solid transparent",
                            boxShadow:
                              selected === d.id ? "0 0 20px #2563eb55" : "none",
                          }}
                          data-ocid={`magic_design.item.${d.id}`}
                        >
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-2 gap-1">
                            <p
                              className="text-center font-bold font-editor leading-tight"
                              style={{ color: d.accent, fontSize: "9px" }}
                            >
                              {d.headline}
                            </p>
                            <p
                              className="text-center font-editor leading-tight opacity-70"
                              style={{ color: d.accent, fontSize: "6px" }}
                            >
                              {d.sub}
                            </p>
                            <div
                              className="mt-1 px-2 py-0.5 rounded-full text-center font-editor font-semibold"
                              style={{
                                background: d.accent,
                                color:
                                  d.bg ===
                                  "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)"
                                    ? "#fff"
                                    : "#0a0a0a",
                                fontSize: "5px",
                              }}
                            >
                              {d.cta}
                            </div>
                          </div>
                          <div className="absolute bottom-1 left-1 right-1 flex items-center justify-between">
                            <span
                              className="text-white/60 font-editor"
                              style={{ fontSize: "5px" }}
                            >
                              {d.platform}
                            </span>
                            <span
                              className="px-1 rounded font-editor"
                              style={{
                                background: "oklch(0 0 0 / 0.5)",
                                color: d.accent,
                                fontSize: "5px",
                              }}
                            >
                              {d.tag}
                            </span>
                          </div>
                          {selected === d.id && (
                            <div
                              className="absolute top-1 right-1 w-4 h-4 rounded-full flex items-center justify-center"
                              style={{ background: "#2563eb" }}
                            >
                              <Check size={10} className="text-white" />
                            </div>
                          )}
                        </motion.button>
                      ))}
                    </div>
                    <p
                      className="text-center text-xs font-editor"
                      style={{ color: "oklch(0.5 0 0)" }}
                    >
                      {DESIGN_VARIANTS.find((d) => d.id === selected)?.label}{" "}
                      selected
                    </p>
                    <button
                      type="button"
                      onClick={handleApply}
                      className="w-full py-3.5 rounded-xl text-white font-semibold font-editor text-sm transition-smooth"
                      style={{
                        background: "linear-gradient(135deg, #2563eb, #4f46e5)",
                        boxShadow: "0 0 24px #2563eb55",
                      }}
                      data-ocid="magic_design.confirm_button"
                    >
                      Apply Design
                    </button>
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
