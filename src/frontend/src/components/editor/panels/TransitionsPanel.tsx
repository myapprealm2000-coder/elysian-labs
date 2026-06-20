import { useVideoEditorStore } from "@/store/videoEditorStore";
import type { TransitionType } from "@/types/videoEditor";
import { CheckCircle2, MousePointerClick } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";
import { toast } from "sonner";

// ─── CSS animation keyframes injected once ────────────────────────────────────

const KEYFRAMES = `
@keyframes tr-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes tr-zoom { from { transform: scale(0.75); opacity: 0.3; } to { transform: scale(1); opacity: 1; } }
@keyframes tr-blur { from { filter: blur(18px); opacity: 0; } to { filter: blur(0px); opacity: 1; } }
@keyframes tr-swipe { from { transform: translateX(-100%); } to { transform: translateX(0%); } }
@keyframes tr-flash { 0% { opacity: 1; } 20% { opacity: 1; background: #ffffff; } 40% { opacity: 1; background: #ffffff; } 100% { opacity: 1; background: transparent; } }
@keyframes tr-rotate { from { transform: rotate(90deg) scale(0.8); opacity: 0; } to { transform: rotate(0deg) scale(1); opacity: 1; } }
@keyframes tr-wipe { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0 0% 0 0); } }
@keyframes tr-dissolve { 0% { opacity: 0; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
`;

let _injected = false;
function ensureKeyframes() {
  if (_injected || typeof document === "undefined") return;
  const style = document.createElement("style");
  style.textContent = KEYFRAMES;
  document.head.appendChild(style);
  _injected = true;
}

// ─── Transition definitions ────────────────────────────────────────────────────

interface TransitionDef {
  id: TransitionType;
  label: string;
  icon: string;
  animKey: string;
  previewGradient: string;
}

const TRANSITIONS: TransitionDef[] = [
  {
    id: "none",
    label: "None",
    icon: "\u2715",
    animKey: "",
    previewGradient: "linear-gradient(135deg,#1e293b,#0f172a)",
  },
  {
    id: "fade",
    label: "Fade",
    icon: "\uD83C\uDF00",
    animKey: "tr-fade",
    previewGradient: "linear-gradient(135deg,#1e3a5f,#2563eb40)",
  },
  {
    id: "dissolve",
    label: "Dissolve",
    icon: "\u2728",
    animKey: "tr-dissolve",
    previewGradient: "linear-gradient(135deg,#3730a3,#6d28d9)",
  },
  {
    id: "zoom",
    label: "Zoom",
    icon: "\uD83D\uDD0D",
    animKey: "tr-zoom",
    previewGradient: "linear-gradient(135deg,#065f46,#059669)",
  },
  {
    id: "blur",
    label: "Blur",
    icon: "\uD83C\uDF2B",
    animKey: "tr-blur",
    previewGradient: "linear-gradient(135deg,#1e1b4b,#4338ca)",
  },
  {
    id: "swipe",
    label: "Swipe",
    icon: "\u{1F44A}",
    animKey: "tr-swipe",
    previewGradient: "linear-gradient(135deg,#7c2d12,#ea580c)",
  },
  {
    id: "flash",
    label: "Flash",
    icon: "\u26A1",
    animKey: "tr-flash",
    previewGradient: "linear-gradient(135deg,#78350f,#fbbf24)",
  },
  {
    id: "rotate",
    label: "Rotate",
    icon: "\uD83D\uDD04",
    animKey: "tr-rotate",
    previewGradient: "linear-gradient(135deg,#4a044e,#a21caf)",
  },
  {
    id: "wipe",
    label: "Wipe",
    icon: "\uD83C\uDF1F",
    animKey: "tr-wipe",
    previewGradient: "linear-gradient(135deg,#0c4a6e,#0891b2)",
  },
];

const EASING_OPTIONS = [
  "ease-in",
  "ease-out",
  "ease-in-out",
  "linear",
  "spring",
] as const;
type EasingOption = (typeof EASING_OPTIONS)[number];

// ─── Preview box ──────────────────────────────────────────────────────────────────

interface TransitionPreviewBoxProps {
  transition: TransitionDef | null;
  duration: number;
  easing: EasingOption;
}

function TransitionPreviewBox({
  transition,
  duration,
  easing,
}: TransitionPreviewBoxProps) {
  const [animKey, setAnimKey] = useState(0);
  const cssEasing =
    easing === "spring" ? "cubic-bezier(0.175,0.885,0.32,1.275)" : easing;

  const replay = useCallback(() => setAnimKey((k) => k + 1), []);

  if (!transition || transition.id === "none") {
    return (
      <div
        className="w-full rounded-xl flex items-center justify-center"
        style={{
          height: 80,
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <span className="text-[11px] text-white/20">
          No transition selected
        </span>
      </div>
    );
  }

  return (
    <button
      type="button"
      className="relative w-full rounded-xl overflow-hidden group"
      style={{
        height: 80,
        background: "rgba(0,0,0,0.4)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
      onClick={replay}
      title="Click to replay"
      data-ocid="transitions.preview_box"
    >
      <div
        // eslint-disable-next-line react/no-array-index-key
        key={animKey}
        className="absolute inset-0"
        style={{
          background: transition.previewGradient,
          animation: transition.animKey
            ? `${transition.animKey} ${duration}s ${cssEasing} forwards`
            : undefined,
        }}
      />
      <div className="absolute inset-0 flex items-end justify-end p-2">
        <span className="text-[9px] text-white/30 group-hover:text-white/50 transition-colors">
          Click to replay
        </span>
      </div>
    </button>
  );
}

// ─── Main TransitionsPanel ─────────────────────────────────────────────────────

export function TransitionsPanel() {
  ensureKeyframes();

  const store = useVideoEditorStore();
  const {
    activeTransition,
    transitionDuration,
    transitionEasing,
    selectedClipId,
    setActiveTransition,
    setTransitionDuration,
    setTransitionEasing,
    updateVideoClip,
  } = store;

  const [hoveredId, setHoveredId] = useState<TransitionType | null>(null);
  const [justApplied, setJustApplied] = useState(false);

  const activeDef = TRANSITIONS.find((t) => t.id === activeTransition) ?? null;
  const hoveredDef = hoveredId
    ? (TRANSITIONS.find((t) => t.id === hoveredId) ?? null)
    : null;
  const previewDef = hoveredDef ?? activeDef;

  const canApply = !!selectedClipId && activeTransition !== "none";

  const handleApply = useCallback(() => {
    if (!selectedClipId) return;
    updateVideoClip(selectedClipId, {
      transition: {
        type: activeTransition,
        duration: transitionDuration,
        easing: transitionEasing,
      },
    });
    setJustApplied(true);
    toast.success(`${activeDef?.label ?? "Transition"} applied`);
    setTimeout(() => setJustApplied(false), 2000);
  }, [
    selectedClipId,
    activeTransition,
    transitionDuration,
    transitionEasing,
    updateVideoClip,
    activeDef,
  ]);

  const easing = transitionEasing as EasingOption;
  const validEasing = EASING_OPTIONS.includes(easing) ? easing : "ease-in-out";

  return (
    <div
      className="flex flex-col gap-4 p-3 overflow-y-auto h-full"
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "rgba(255,255,255,0.08) transparent",
        fontFamily: "Inter, sans-serif",
      }}
      data-ocid="transitions_panel"
    >
      {/* Live preview */}
      <div>
        <p className="text-[9px] font-bold uppercase tracking-widest text-white/30 mb-2">
          Preview
        </p>
        <TransitionPreviewBox
          transition={previewDef}
          duration={transitionDuration}
          easing={validEasing}
        />
      </div>

      {/* Transition grid */}
      <div>
        <p className="text-[9px] font-bold uppercase tracking-widest text-white/30 mb-2">
          Select Transition
        </p>
        <div className="grid grid-cols-3 gap-1.5">
          {TRANSITIONS.map((tr) => {
            const isActive = activeTransition === tr.id;
            const isHovered = hoveredId === tr.id;
            return (
              <motion.button
                key={tr.id}
                type="button"
                whileTap={{ scale: 0.94 }}
                onClick={() => setActiveTransition(tr.id)}
                onHoverStart={() => setHoveredId(tr.id)}
                onHoverEnd={() => setHoveredId(null)}
                className="relative flex flex-col items-center gap-1.5 p-2.5 rounded-xl transition-all"
                style={{
                  background: isActive
                    ? "rgba(37,99,235,0.18)"
                    : isHovered
                      ? "rgba(255,255,255,0.06)"
                      : "rgba(255,255,255,0.03)",
                  border: isActive
                    ? "1px solid #2563EB"
                    : "1px solid rgba(255,255,255,0.06)",
                  boxShadow: isActive
                    ? "0 0 12px rgba(37,99,235,0.35)"
                    : "none",
                }}
                data-ocid={`transitions.card.${tr.id}`}
              >
                {/* Mini animated preview swatch */}
                <div
                  className="w-full rounded-lg overflow-hidden"
                  style={{ height: 28, background: "rgba(255,255,255,0.04)" }}
                >
                  {isHovered && tr.id !== "none" && (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        background: tr.previewGradient,
                        animation: tr.animKey
                          ? `${tr.animKey} 0.7s ease-out forwards`
                          : undefined,
                      }}
                    />
                  )}
                  {tr.id === "none" && (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-[14px] text-white/25">
                        {tr.icon}
                      </span>
                    </div>
                  )}
                </div>

                <span
                  className="text-[9px] font-semibold text-center leading-tight"
                  style={{
                    color: isActive ? "#93c5fd" : "rgba(255,255,255,0.45)",
                  }}
                >
                  {tr.label}
                </span>

                {isActive && (
                  <div
                    className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full flex items-center justify-center"
                    style={{ background: "#2563EB" }}
                  >
                    <span className="text-[7px] text-white font-bold">
                      \u2713
                    </span>
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Duration */}
      <div
        className="p-3 rounded-xl"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] font-semibold text-white/70">
            Duration
          </span>
          <span
            className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded"
            style={{ background: "rgba(37,99,235,0.2)", color: "#93c5fd" }}
          >
            {transitionDuration.toFixed(1)}s
          </span>
        </div>
        <div
          className="relative h-1.5 rounded-full mb-2"
          style={{ background: "rgba(255,255,255,0.08)" }}
        >
          <div
            className="absolute h-full rounded-full"
            style={{
              width: `${((transitionDuration - 0.1) / 1.9) * 100}%`,
              background:
                "linear-gradient(90deg, rgba(37,99,235,0.6), #2563EB)",
            }}
          />
          <input
            type="range"
            min={0.1}
            max={2.0}
            step={0.1}
            value={transitionDuration}
            onChange={(e) => setTransitionDuration(Number(e.target.value))}
            className="absolute inset-0 w-full opacity-0 cursor-pointer"
            style={{ height: "100%" }}
            data-ocid="transitions.duration_slider"
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full pointer-events-none"
            style={{
              left: `calc(${((transitionDuration - 0.1) / 1.9) * 100}% - 6px)`,
              background: "radial-gradient(circle, #2563EB 40%, #1a1a2e 100%)",
              boxShadow: "0 0 6px 2px rgba(37,99,235,0.5)",
            }}
          />
        </div>
        <div className="flex justify-between text-[9px] text-white/25">
          <span>0.1s</span>
          <span>2.0s</span>
        </div>
      </div>

      {/* Easing */}
      <div
        className="p-3 rounded-xl"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <p className="text-[10px] font-semibold text-white/70 mb-2">Easing</p>
        <div className="grid grid-cols-3 gap-1">
          {EASING_OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setTransitionEasing(opt)}
              className="py-1.5 rounded-lg text-[9px] font-semibold transition-all"
              style={{
                background:
                  validEasing === opt
                    ? "rgba(37,99,235,0.2)"
                    : "rgba(255,255,255,0.04)",
                border:
                  validEasing === opt
                    ? "1px solid rgba(37,99,235,0.5)"
                    : "1px solid transparent",
                color:
                  validEasing === opt ? "#93c5fd" : "rgba(255,255,255,0.4)",
              }}
              data-ocid={`transitions.easing.${opt}`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Apply section */}
      <div>
        <AnimatePresence mode="wait">
          {justApplied ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl"
              style={{
                background: "rgba(34,197,94,0.12)",
                border: "1px solid rgba(34,197,94,0.35)",
              }}
              data-ocid="transitions.success_state"
            >
              <CheckCircle2 className="w-4 h-4" style={{ color: "#22c55e" }} />
              <span
                className="text-[11px] font-semibold"
                style={{ color: "#4ade80" }}
              >
                Transition applied
              </span>
            </motion.div>
          ) : (
            <motion.button
              key="apply"
              type="button"
              whileTap={{ scale: canApply ? 0.97 : 1 }}
              onClick={handleApply}
              disabled={!canApply}
              className="w-full py-2.5 rounded-xl text-[12px] font-semibold transition-all flex items-center justify-center gap-2"
              style={{
                background: canApply
                  ? "linear-gradient(135deg, #2563EB, #1d4ed8)"
                  : "rgba(255,255,255,0.05)",
                color: canApply ? "#fff" : "rgba(255,255,255,0.25)",
                cursor: canApply ? "pointer" : "not-allowed",
                boxShadow: canApply ? "0 4px 16px rgba(37,99,235,0.3)" : "none",
                border: canApply ? "none" : "1px solid rgba(255,255,255,0.06)",
              }}
              data-ocid="transitions.apply_button"
            >
              {canApply ? (
                <>
                  <MousePointerClick className="w-3.5 h-3.5" />
                  Apply to Selected Clip
                </>
              ) : (
                "Select a clip first"
              )}
            </motion.button>
          )}
        </AnimatePresence>

        {selectedClipId && activeTransition !== "none" && (
          <p className="text-[9px] text-white/25 text-center mt-1.5">
            Will apply {activeDef?.label} · {transitionDuration.toFixed(1)}s ·{" "}
            {validEasing}
          </p>
        )}
      </div>
    </div>
  );
}
