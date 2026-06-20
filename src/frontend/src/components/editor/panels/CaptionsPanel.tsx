import { useVideoEditor } from "@/hooks/useVideoEditor";
import { useVideoEditorStore } from "@/store/videoEditorStore";
import type { CaptionLayer, CaptionPreset } from "@/types/videoEditor";
import { Plus, Trash2, Type } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef } from "react";

const ACCENT = "#2563EB";
const GREEN = "#22C55E";
const BORDER = "rgba(255,255,255,0.06)";
const MUTED = "rgba(255,255,255,0.4)";

interface PresetCard {
  id: CaptionPreset;
  label: string;
  previewStyle: React.CSSProperties;
}

const PRESET_CARDS: PresetCard[] = [
  {
    id: "tiktok",
    label: "TikTok",
    previewStyle: {
      background: "rgba(0,0,0,0.85)",
      color: "#fff",
      fontFamily: "Inter",
      fontWeight: 700,
      fontSize: 11,
      padding: "3px 7px",
      borderRadius: 4,
    },
  },
  {
    id: "cinematic",
    label: "Cinematic",
    previewStyle: {
      color: "#f5f0e0",
      fontFamily: "Georgia, serif",
      fontStyle: "italic",
      fontSize: 10,
      letterSpacing: "0.06em",
    },
  },
  {
    id: "minimal",
    label: "Minimal",
    previewStyle: {
      color: "rgba(255,255,255,0.88)",
      fontFamily: "Inter",
      fontSize: 10,
    },
  },
  {
    id: "glow",
    label: "Glow",
    previewStyle: {
      color: GREEN,
      fontFamily: "Inter",
      fontWeight: 700,
      fontSize: 11,
      textShadow: `0 0 10px ${GREEN}`,
    },
  },
];

const PRESET_DEFAULTS: Record<CaptionPreset, Partial<CaptionLayer["style"]>> = {
  tiktok: {
    fontFamily: "Inter",
    fontSize: 22,
    color: "#ffffff",
    background: { color: "rgba(0,0,0,0.80)", borderRadius: 4, padding: 8 },
  },
  cinematic: { fontFamily: "Georgia, serif", fontSize: 16, color: "#f5f0e0" },
  minimal: {
    fontFamily: "Inter",
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
  },
  glow: {
    fontFamily: "Inter",
    fontSize: 20,
    color: "#ffffff",
    glow: { color: GREEN, intensity: 80 },
  },
  custom: { fontFamily: "Inter", fontSize: 18, color: "#ffffff" },
};

function fmtTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = (s % 60).toFixed(1);
  return `${String(m).padStart(2, "0")}:${sec.padStart(4, "0")}`;
}

export function CaptionsPanel() {
  const store = useVideoEditorStore();
  const videoRef = useRef<HTMLVideoElement>(null);
  const editor = useVideoEditor(videoRef);

  const captionList = Object.values(store.captionLayers).sort(
    (a, b) => a.startTime - b.startTime,
  );
  const selected = store.selectedCaptionId
    ? store.captionLayers[store.selectedCaptionId]
    : null;

  const handleAdd = () => editor.addCaptionLayer("tiktok");

  const handleDelete = (id: string) => editor.deleteCaptionLayer(id);

  const handleSelect = (id: string) =>
    store.setSelectedCaptionId(store.selectedCaptionId === id ? null : id);

  const update = (id: string, patch: Partial<CaptionLayer>) =>
    store.updateCaptionLayer(id, patch);

  const updateStyle = (
    id: string,
    stylePatch: Partial<CaptionLayer["style"]>,
  ) => {
    const cap = store.captionLayers[id];
    if (!cap) return;
    store.updateCaptionLayer(id, { style: { ...cap.style, ...stylePatch } });
  };

  const applyPreset = (id: string, preset: CaptionPreset) => {
    update(id, {
      preset,
      style: {
        fontFamily: "Inter",
        fontSize: 18,
        color: "#ffffff",
        ...PRESET_DEFAULTS[preset],
      },
    });
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 10,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: MUTED,
    marginBottom: 8,
  };

  return (
    <div
      className="flex flex-col gap-3 p-3 overflow-y-auto h-full font-['Inter',sans-serif]"
      style={{ scrollbarWidth: "none" }}
      data-ocid="captions_panel"
    >
      {/* Header + Add button */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold text-white/60">
          {captionList.length} caption{captionList.length !== 1 ? "s" : ""}
        </span>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold text-white transition-all hover:brightness-110 active:scale-95"
          style={{ background: ACCENT }}
          data-ocid="captions.add_button"
        >
          <Plus size={12} />
          Add Caption
        </button>
      </div>

      {/* Caption list */}
      <AnimatePresence initial={false}>
        {captionList.map((cap, i) => {
          const isSelected = store.selectedCaptionId === cap.id;
          return (
            <motion.div
              key={cap.id}
              layout
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6, scale: 0.96 }}
              transition={{ duration: 0.15 }}
              className="rounded-xl cursor-pointer transition-all"
              style={{
                background: isSelected
                  ? "rgba(37,99,235,0.08)"
                  : "rgba(255,255,255,0.025)",
                border: `1px solid ${isSelected ? "rgba(37,99,235,0.4)" : BORDER}`,
              }}
              data-ocid={`captions.item.${i + 1}`}
            >
              <button
                type="button"
                className="flex items-center gap-2 px-3 py-2.5 w-full text-left"
                onClick={() => handleSelect(cap.id)}
              >
                <Type
                  size={12}
                  style={{
                    color: isSelected ? ACCENT : "rgba(255,255,255,0.3)",
                  }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-medium text-white/80 truncate">
                    {cap.content || "(empty)"}
                  </p>
                  <p className="text-[9px] font-mono" style={{ color: MUTED }}>
                    {fmtTime(cap.startTime)} → {fmtTime(cap.endTime)}
                  </p>
                </div>
                <span
                  className="text-[9px] px-1.5 py-0.5 rounded-md font-bold capitalize flex-shrink-0"
                  style={{
                    background:
                      cap.preset === "glow"
                        ? "rgba(34,197,94,0.12)"
                        : "rgba(37,99,235,0.12)",
                    color: cap.preset === "glow" ? GREEN : ACCENT,
                  }}
                >
                  {cap.preset}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(cap.id);
                  }}
                  className="w-6 h-6 flex items-center justify-center rounded-lg flex-shrink-0 transition-all hover:bg-red-500/20"
                  data-ocid={`captions.delete_button.${i + 1}`}
                  aria-label="Delete caption"
                >
                  <Trash2 size={11} style={{ color: "#ef4444" }} />
                </button>
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {captionList.length === 0 && (
        <div
          className="flex flex-col items-center gap-2 py-10 rounded-xl"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: `1px dashed ${BORDER}`,
          }}
          data-ocid="captions.empty_state"
        >
          <Type size={20} style={{ color: "rgba(255,255,255,0.15)" }} />
          <p className="text-[11px]" style={{ color: MUTED }}>
            No captions yet
          </p>
          <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.2)" }}>
            Click &ldquo;Add Caption&rdquo; or use AI Captions
          </p>
        </div>
      )}

      {/* Caption editor — shown when a caption is selected */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
            data-ocid="captions.editor-panel"
          >
            <div
              className="rounded-xl p-3 space-y-4"
              style={{
                background: "rgba(37,99,235,0.04)",
                border: "1px solid rgba(37,99,235,0.2)",
              }}
            >
              <p style={{ ...labelStyle, marginBottom: 0 }}>Edit Caption</p>

              {/* Text content */}
              <div>
                <label
                  className="text-[10px]"
                  htmlFor="captions-text-input"
                  style={{ color: MUTED }}
                >
                  Text
                </label>
                <textarea
                  id="captions-text-input"
                  value={selected.content}
                  onChange={(e) =>
                    update(selected.id, { content: e.target.value })
                  }
                  rows={2}
                  className="w-full mt-1.5 px-3 py-2 rounded-xl text-[12px] text-white resize-none outline-none transition-all"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: `1px solid ${BORDER}`,
                    fontFamily: "Inter, sans-serif",
                  }}
                  placeholder="Caption text..."
                  data-ocid="captions.text-input"
                />
              </div>

              {/* Timing */}
              <div>
                <p className="text-[10px] mb-1.5" style={{ color: MUTED }}>
                  Timing
                </p>
                <div className="grid grid-cols-2 gap-2 mt-1.5">
                  <div>
                    <p className="text-[9px] text-white/30 mb-1">Start (s)</p>
                    <input
                      type="number"
                      min={0}
                      step={0.1}
                      value={selected.startTime.toFixed(1)}
                      onChange={(e) =>
                        update(selected.id, {
                          startTime: Number(e.target.value),
                        })
                      }
                      className="w-full px-2.5 py-1.5 rounded-lg text-[11px] font-mono text-white outline-none"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: `1px solid ${BORDER}`,
                      }}
                      data-ocid="captions.start-time"
                    />
                  </div>
                  <div>
                    <p className="text-[9px] text-white/30 mb-1">End (s)</p>
                    <input
                      type="number"
                      min={0}
                      step={0.1}
                      value={selected.endTime.toFixed(1)}
                      onChange={(e) =>
                        update(selected.id, { endTime: Number(e.target.value) })
                      }
                      className="w-full px-2.5 py-1.5 rounded-lg text-[11px] font-mono text-white outline-none"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: `1px solid ${BORDER}`,
                      }}
                      data-ocid="captions.end-time"
                    />
                  </div>
                </div>
                <p
                  className="text-[9px] mt-1"
                  style={{ color: "rgba(255,255,255,0.25)" }}
                >
                  Duration:{" "}
                  {Math.max(0, selected.endTime - selected.startTime).toFixed(
                    1,
                  )}
                  s
                </p>
              </div>

              {/* Presets */}
              <div>
                <p className="text-[10px] mb-1.5" style={{ color: MUTED }}>
                  Preset Style
                </p>
                <div className="grid grid-cols-2 gap-2 mt-1.5">
                  {PRESET_CARDS.map((pc) => (
                    <button
                      key={pc.id}
                      type="button"
                      onClick={() => applyPreset(selected.id, pc.id)}
                      className="flex flex-col items-start gap-1 px-3 py-2.5 rounded-xl transition-all hover:scale-[1.02]"
                      style={{
                        background:
                          selected.preset === pc.id
                            ? "rgba(37,99,235,0.12)"
                            : "rgba(255,255,255,0.04)",
                        border: `1px solid ${selected.preset === pc.id ? "rgba(37,99,235,0.4)" : BORDER}`,
                      }}
                      data-ocid={`captions.preset.${pc.id}`}
                    >
                      <span style={pc.previewStyle}>Aa</span>
                      <span
                        className="text-[10px] font-semibold"
                        style={{
                          color:
                            selected.preset === pc.id
                              ? ACCENT
                              : "rgba(255,255,255,0.7)",
                        }}
                      >
                        {pc.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Style controls */}
              <div className="space-y-3">
                <p className="text-[10px] mb-2" style={{ color: MUTED }}>
                  Style Controls
                </p>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[10px] text-white/40">Font Size</span>
                    <span className="text-[10px] font-mono text-white/50">
                      {selected.style.fontSize}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={60}
                    value={selected.style.fontSize}
                    onChange={(e) =>
                      updateStyle(selected.id, {
                        fontSize: Number(e.target.value),
                      })
                    }
                    className="w-full h-1.5 rounded-full cursor-pointer"
                    style={{ accentColor: ACCENT }}
                    data-ocid="captions.font-size-slider"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-white/40">Text Color</span>
                  <input
                    type="color"
                    value={selected.style.color}
                    onChange={(e) =>
                      updateStyle(selected.id, { color: e.target.value })
                    }
                    className="w-8 h-6 rounded cursor-pointer"
                    style={{ border: `1px solid ${BORDER}` }}
                    data-ocid="captions.color-picker"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-white/40">Background</span>
                  <button
                    type="button"
                    onClick={() => {
                      const hasBg = !!selected.style.background;
                      updateStyle(selected.id, {
                        background: hasBg
                          ? undefined
                          : {
                              color: "rgba(0,0,0,0.75)",
                              borderRadius: 4,
                              padding: 6,
                            },
                      });
                    }}
                    className="relative rounded-full transition-all"
                    style={{
                      background: selected.style.background
                        ? ACCENT
                        : "rgba(255,255,255,0.12)",
                      width: 36,
                      height: 20,
                    }}
                    data-ocid="captions.bg-toggle"
                  >
                    <motion.div
                      className="absolute top-0.5 w-3.5 h-3.5 rounded-full bg-white shadow"
                      animate={{
                        left: selected.style.background
                          ? "calc(100% - 16px)"
                          : "2px",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
