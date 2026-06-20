import { useAdCreatorStore } from "@/store/adCreatorStore";
import type { TextCanvasElement } from "@/store/adCreatorStore";
import { Copy, MessageSquare, Plus, RefreshCw, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

type Tone =
  | "Viral"
  | "Luxury"
  | "Minimal"
  | "Aggressive"
  | "Professional"
  | "Cinematic";
type ContentType =
  | "headline"
  | "tagline"
  | "cta"
  | "description"
  | "hook"
  | "adcopy";

const TONES: Tone[] = [
  "Viral",
  "Luxury",
  "Minimal",
  "Aggressive",
  "Professional",
  "Cinematic",
];
const CONTENT_TYPES: { id: ContentType; label: string }[] = [
  { id: "headline", label: "Headline" },
  { id: "tagline", label: "Tagline" },
  { id: "cta", label: "CTA Button" },
  { id: "description", label: "Description" },
  { id: "hook", label: "Hook" },
  { id: "adcopy", label: "Ad Copy" },
];

const COPY_BANK: Record<Tone, Record<ContentType, string[]>> = {
  Viral: {
    headline: [
      "You WON'T Believe This!",
      "EVERYONE Is Talking About This",
      "This Changes EVERYTHING 🔥",
    ],
    tagline: ["Go viral or go home", "The internet can't stop sharing this"],
    cta: ["GET IT NOW!", "CLAIM YOURS!", "DON'T MISS OUT!"],
    description: [
      "The thing people are losing their minds over is finally here. Don't be the last one to know about it.",
    ],
    hook: [
      "🔥 I tried this for 7 days and here's what happened...",
      "🔥 Nobody told me this worked THAT fast",
    ],
    adcopy: [
      "STOP scrolling! This limited offer expires TONIGHT. Click the link before it's gone FOREVER.",
    ],
  },
  Luxury: {
    headline: [
      "Crafted for the Discerning Few",
      "The Art of Effortless Excellence",
      "Where Refinement Meets Vision",
    ],
    tagline: ["Luxury redefined", "Timeless elegance, curated for you"],
    cta: ["Explore Collection", "Request Access", "Discover More"],
    description: [
      "An experience reserved for those who appreciate the finest things. Meticulously curated, impeccably delivered.",
    ],
    hook: [
      "🔥 The world's most sought-after brands choose this",
      "🔥 What the ultra-wealthy already know",
    ],
    adcopy: [
      "For those who settle for nothing less than extraordinary. Join an exclusive circle of connoisseurs.",
    ],
  },
  Minimal: {
    headline: ["Less. Better.", "Simply Perfect", "The One Thing You Need"],
    tagline: ["Pure simplicity", "Nothing extra, everything essential"],
    cta: ["Learn more", "Start now", "See it"],
    description: [
      "Stripped of the unnecessary. Built for clarity and purpose.",
    ],
    hook: ["🔥 One product. Infinite impact.", "🔥 The quiet revolution"],
    adcopy: ["No gimmicks. No noise. Just results."],
  },
  Aggressive: {
    headline: [
      "Dominate Your Market",
      "Crush the Competition",
      "Win or Go Home",
    ],
    tagline: ["Built for champions", "No excuses, only results"],
    cta: ["Start Winning", "Take Control", "Dominate Now"],
    description: [
      "While others hesitate, you act. While they talk, you execute. This is for those who refuse to lose.",
    ],
    hook: [
      "🔥 Your competitors don't want you to see this",
      "🔥 Warning: this will make your rivals nervous",
    ],
    adcopy: [
      "Stop waiting for permission. Take what's yours. The market rewards the bold.",
    ],
  },
  Professional: {
    headline: [
      "Trusted by Industry Leaders",
      "Enterprise-Grade Performance",
      "Proven Results at Scale",
    ],
    tagline: ["Delivering measurable ROI", "The professional's choice"],
    cta: ["Schedule a Demo", "Get Quote", "Contact Sales"],
    description: [
      "Designed for professionals who demand reliability, precision, and results you can report to stakeholders.",
    ],
    hook: [
      "🔥 How top-performing teams achieve 3× output",
      "🔥 The workflow Fortune 500 companies swear by",
    ],
    adcopy: [
      "Join thousands of leading organizations who rely on our platform for mission-critical workflows.",
    ],
  },
  Cinematic: {
    headline: [
      "A Story Worth Telling",
      "Scenes That Stay With You",
      "The Frame That Changes Everything",
    ],
    tagline: ["Where vision becomes reality", "Every frame, a masterpiece"],
    cta: ["Begin Your Story", "Enter the World", "See the Vision"],
    description: [
      "Some moments are too powerful for ordinary tools. This is where your most ambitious creative vision takes form.",
    ],
    hook: [
      "🔥 The cinematic toolkit used by award-winning creators",
      "🔥 Scenes this powerful deserve the right tools",
    ],
    adcopy: [
      "Your story deserves to be told in the most powerful way possible. Let's create something unforgettable.",
    ],
  },
};

export function AiCopywriterModal({ open, onClose }: Props) {
  const [product, setProduct] = useState("");
  const [tone, setTone] = useState<Tone>("Professional");
  const [types, setTypes] = useState<Set<ContentType>>(
    new Set(["headline", "cta", "hook"]),
  );
  const [phase, setPhase] = useState<"form" | "loading" | "results">("form");
  const [revealIdx, setRevealIdx] = useState(0);
  const [copied, setCopied] = useState<string | null>(null);
  const { addElement, canvasSize } = useAdCreatorStore();
  const loadingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const revealIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    if (process.env.NODE_ENV === "development")
      console.log("[AiCopywriterModal] mounted");
    return () => {
      mountedRef.current = false;
      if (loadingTimerRef.current) clearTimeout(loadingTimerRef.current);
      if (revealIntervalRef.current) clearInterval(revealIntervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (!open) {
      if (loadingTimerRef.current) {
        clearTimeout(loadingTimerRef.current);
        loadingTimerRef.current = null;
      }
      if (revealIntervalRef.current) {
        clearInterval(revealIntervalRef.current);
        revealIntervalRef.current = null;
      }
      setPhase("form");
      setRevealIdx(0);
    }
  }, [open]);

  useEffect(() => {
    if (phase !== "loading") return;
    if (loadingTimerRef.current) clearTimeout(loadingTimerRef.current);
    loadingTimerRef.current = setTimeout(() => {
      if (mountedRef.current) setPhase("results");
    }, 1500);
    return () => {
      if (loadingTimerRef.current) {
        clearTimeout(loadingTimerRef.current);
        loadingTimerRef.current = null;
      }
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "results") return;
    if (revealIntervalRef.current) clearInterval(revealIntervalRef.current);
    let i = 0;
    revealIntervalRef.current = setInterval(() => {
      if (!mountedRef.current) return;
      i++;
      setRevealIdx(i);
      if (i > 20) {
        if (revealIntervalRef.current) {
          clearInterval(revealIntervalRef.current);
          revealIntervalRef.current = null;
        }
      }
    }, 80);
    return () => {
      if (revealIntervalRef.current) {
        clearInterval(revealIntervalRef.current);
        revealIntervalRef.current = null;
      }
    };
  }, [phase]);

  function toggleType(t: ContentType) {
    setTypes((prev) => {
      const n = new Set(prev);
      n.has(t) ? n.delete(t) : n.add(t);
      return n;
    });
  }

  function handleCopy(text: string) {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(text);
    setTimeout(() => setCopied(null), 1800);
  }

  function handleInsert(text: string, type: ContentType) {
    const isHeadline = type === "headline";
    addElement({
      type: "text",
      name: type.charAt(0).toUpperCase() + type.slice(1),
      x: 60,
      y: isHeadline ? 300 : 420,
      width: canvasSize.width - 120,
      height: isHeadline ? 120 : 60,
      rotation: 0,
      opacity: 1,
      locked: false,
      visible: true,
      content: text,
      fontFamily: "Inter",
      fontSize: isHeadline ? 64 : 32,
      fontWeight: isHeadline ? "700" : "400",
      color: "#ffffff",
      textAlign: "center",
      lineHeight: 1.2,
      letterSpacing: isHeadline ? -1 : 0,
      gradient: false,
      gradientColors: ["#ffffff", "#94a3b8"],
      shadow: null,
      glow: null,
      outline: null,
      animation: null,
      blendMode: "normal",
    } as Omit<TextCanvasElement, "id">);
    onClose();
  }

  const bank = COPY_BANK[tone];
  const activeTypes = CONTENT_TYPES.filter((ct) => types.has(ct.id));

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="ai-copy-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            background: "oklch(0 0 0 / 0.75)",
            backdropFilter: "blur(8px)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
          data-ocid="ai_copywriter.dialog"
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
                    background: "linear-gradient(135deg, #059669, #10b981)",
                  }}
                >
                  <MessageSquare size={16} className="text-white" />
                </div>
                <h2 className="text-white font-semibold text-lg font-editor">
                  AI Copywriter
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-smooth"
                data-ocid="ai_copywriter.close_button"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 space-y-5">
              <AnimatePresence mode="wait">
                {phase === "form" && (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-5"
                  >
                    <div>
                      <p className="block text-xs text-white/40 uppercase tracking-widest font-editor mb-2">
                        What are you promoting?
                      </p>
                      <input
                        className="w-full editor-input-glass"
                        placeholder="e.g. Gaming headset, skincare brand, SaaS startup..."
                        value={product}
                        onChange={(e) => setProduct(e.target.value)}
                        data-ocid="ai_copywriter.input"
                      />
                    </div>
                    <div>
                      <p className="text-xs text-white/40 uppercase tracking-widest font-editor mb-2">
                        Tone
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {TONES.map((t) => (
                          <button
                            type="button"
                            key={t}
                            onClick={() => setTone(t)}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium font-editor transition-smooth"
                            style={
                              tone === t
                                ? {
                                    background:
                                      "linear-gradient(135deg, #059669, #10b981)",
                                    color: "#fff",
                                  }
                                : {
                                    background: "oklch(0.16 0 0 / 0.5)",
                                    color: "oklch(0.7 0 0)",
                                    border: "1px solid oklch(0.22 0 0 / 0.5)",
                                  }
                            }
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-white/40 uppercase tracking-widest font-editor mb-2">
                        Content Types
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {CONTENT_TYPES.map((ct) => (
                          <button
                            type="button"
                            key={ct.id}
                            onClick={() => toggleType(ct.id)}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-editor transition-smooth"
                            style={
                              types.has(ct.id)
                                ? {
                                    background: "oklch(0.38 0.15 270 / 0.2)",
                                    color: "#93c5fd",
                                    border: "1px solid #2563eb",
                                  }
                                : {
                                    background: "oklch(0.14 0 0 / 0.5)",
                                    color: "oklch(0.6 0 0)",
                                    border: "1px solid oklch(0.22 0 0 / 0.4)",
                                  }
                            }
                            data-ocid="ai_copywriter.checkbox"
                          >
                            <div
                              className="w-3.5 h-3.5 rounded flex items-center justify-center flex-shrink-0"
                              style={{
                                background: types.has(ct.id)
                                  ? "#2563eb"
                                  : "oklch(0.2 0 0)",
                              }}
                            >
                              {types.has(ct.id) && (
                                <span
                                  style={{ fontSize: "9px" }}
                                  className="text-white"
                                >
                                  ✓
                                </span>
                              )}
                            </div>
                            {ct.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPhase("loading")}
                      disabled={types.size === 0}
                      className="w-full py-3.5 rounded-xl text-white font-semibold font-editor text-sm transition-smooth disabled:opacity-40"
                      style={{
                        background: "linear-gradient(135deg, #059669, #10b981)",
                        boxShadow: "0 0 24px #05966944",
                      }}
                      data-ocid="ai_copywriter.submit_button"
                    >
                      Generate Copy
                    </button>
                  </motion.div>
                )}

                {phase === "loading" && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center gap-4 py-12"
                    data-ocid="ai_copywriter.loading_state"
                  >
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ background: "#10b981" }}
                          animate={{ y: [0, -10, 0] }}
                          transition={{
                            duration: 0.7,
                            delay: i * 0.15,
                            repeat: Number.POSITIVE_INFINITY,
                          }}
                        />
                      ))}
                    </div>
                    <p className="text-white/60 font-editor text-sm">
                      Writing your copy...
                    </p>
                  </motion.div>
                )}

                {phase === "results" && (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-white/60 font-editor">
                        <span className="text-white">{tone}</span> tone
                        {product && (
                          <>
                            {" "}
                            for{" "}
                            <span className="text-emerald-400">{product}</span>
                          </>
                        )}
                      </p>
                      <button
                        type="button"
                        onClick={() => setPhase("loading")}
                        className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white font-editor transition-smooth"
                        data-ocid="ai_copywriter.secondary_button"
                      >
                        <RefreshCw size={12} /> Regenerate
                      </button>
                    </div>

                    {activeTypes.map((ct, ctIdx) => {
                      const copies = bank[ct.id] ?? [];
                      return (
                        <div key={ct.id}>
                          <p className="text-xs text-white/40 uppercase tracking-widest font-editor mb-2">
                            {ct.label}
                          </p>
                          <div className="space-y-2">
                            {copies.map((text, idx) => {
                              const globalIdx = ctIdx * 5 + idx;
                              const shown = revealIdx > globalIdx;
                              return (
                                <motion.div
                                  key={`${ct.id}-${text.slice(0, 12)}`}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={shown ? { opacity: 1, x: 0 } : {}}
                                  className="flex items-start gap-3 p-3 rounded-xl group"
                                  style={{
                                    background: "oklch(0.14 0 0 / 0.6)",
                                    border: "1px solid oklch(0.22 0 0 / 0.4)",
                                  }}
                                  data-ocid={`ai_copywriter.item.${globalIdx + 1}`}
                                >
                                  {ct.id === "cta" ? (
                                    <div className="flex-1 flex">
                                      <span
                                        className="px-4 py-1.5 rounded-full text-sm font-semibold font-editor"
                                        style={{
                                          background: "#2563eb",
                                          color: "#fff",
                                        }}
                                      >
                                        {text}
                                      </span>
                                    </div>
                                  ) : ct.id === "headline" ? (
                                    <p className="flex-1 font-bold text-white font-editor text-base">
                                      {text}
                                    </p>
                                  ) : ct.id === "tagline" ? (
                                    <p className="flex-1 text-white/80 font-editor italic">
                                      {text}
                                    </p>
                                  ) : (
                                    <p className="flex-1 text-white/70 font-editor text-sm leading-relaxed">
                                      {text}
                                    </p>
                                  )}
                                  <div className="flex gap-1.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-smooth">
                                    <button
                                      type="button"
                                      onClick={() => handleCopy(text)}
                                      className="w-7 h-7 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-smooth"
                                      data-ocid="ai_copywriter.button"
                                    >
                                      {copied === text ? (
                                        <span style={{ fontSize: "10px" }}>
                                          ✓
                                        </span>
                                      ) : (
                                        <Copy size={12} />
                                      )}
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleInsert(text, ct.id)}
                                      className="w-7 h-7 rounded-lg flex items-center justify-center text-emerald-400 hover:bg-emerald-400/10 transition-smooth"
                                      data-ocid="ai_copywriter.button"
                                    >
                                      <Plus size={12} />
                                    </button>
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
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
