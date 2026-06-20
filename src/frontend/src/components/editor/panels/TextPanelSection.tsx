import { useVideoEditorStore } from "@/store/videoEditorStore";
import type {
  TextAnimationPreset,
  TextLayer,
  TextLayerStyle,
} from "@/types/videoEditor";
import {
  Activity,
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  ArrowRight,
  Copy,
  Eye,
  Plus,
  Sparkles,
  Trash2,
  Type,
  X,
  ZoomIn,
} from "lucide-react";
import { useRef, useState } from "react";

const PRESET_FONTS = [
  "Inter",
  "Poppins",
  "Bebas Neue",
  "Anton",
  "Montserrat",
  "Oswald",
  "Plus Jakarta Sans",
];

const TEXT_TRACK_ID = "track-text-1";

const ANIMATION_PRESETS: {
  id: TextAnimationPreset;
  label: string;
  Icon: React.ElementType;
}[] = [
  { id: "none", label: "None", Icon: X },
  { id: "fade-in", label: "Fade In", Icon: Eye },
  { id: "slide-in", label: "Slide In", Icon: ArrowRight },
  { id: "bounce", label: "Bounce", Icon: Activity },
  { id: "zoom", label: "Zoom", Icon: ZoomIn },
  { id: "typewriter", label: "Typewriter", Icon: Type },
  { id: "blur-reveal", label: "Blur Reveal", Icon: Sparkles },
];

const STYLE_PRESETS: {
  id: string;
  label: string;
  preview: string;
  style: Partial<TextLayerStyle>;
}[] = [
  {
    id: "youtube",
    label: "YouTube",
    preview: "#FFF",
    style: {
      fontFamily: "Anton",
      fontSize: 64,
      fontWeight: "900",
      color: "#ffffff",
      textShadow: { offsetX: 3, offsetY: 3, blur: 8, color: "#000000" },
      letterSpacing: 0.02,
      opacity: 1,
    },
  },
  {
    id: "glow",
    label: "Glow",
    preview: "#22C55E",
    style: {
      fontFamily: "Montserrat",
      fontSize: 48,
      fontWeight: "700",
      color: "#22C55E",
      glow: { color: "#22C55E", intensity: 80, spread: 20 },
      opacity: 1,
    },
  },
  {
    id: "cinematic",
    label: "Cinematic",
    preview: "#E2E8F0",
    style: {
      fontFamily: "Plus Jakarta Sans",
      fontSize: 36,
      fontWeight: "300",
      color: "#e2e8f0",
      letterSpacing: 0.3,
      textShadow: {
        offsetX: 0,
        offsetY: 2,
        blur: 12,
        color: "rgba(0,0,0,0.6)",
      },
      opacity: 1,
    },
  },
  {
    id: "tiktok",
    label: "TikTok",
    preview: "#fff",
    style: {
      fontFamily: "Inter",
      fontSize: 40,
      fontWeight: "700",
      color: "#ffffff",
      background: {
        enabled: true,
        color: "#000000",
        borderRadius: 6,
        padding: 10,
      },
      opacity: 1,
    },
  },
  {
    id: "minimal",
    label: "Minimal",
    preview: "#94A3B8",
    style: {
      fontFamily: "Inter",
      fontSize: 24,
      fontWeight: "400",
      color: "#94a3b8",
      letterSpacing: 0.02,
      opacity: 0.9,
    },
  },
];

function SectionHeader({ label }: { label: string }) {
  return (
    <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-2">
      {label}
    </p>
  );
}

function ControlRow({
  label,
  right,
  children,
}: {
  label: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-white/40">{label}</span>
        {right && <span className="text-[10px] text-white/50">{right}</span>}
      </div>
      {children}
    </div>
  );
}

function Toggle({
  enabled,
  onToggle,
  label,
  dataOcid,
}: {
  enabled: boolean;
  onToggle: () => void;
  label: string;
  dataOcid?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[10px] text-white/50">{label}</span>
      <button
        type="button"
        onClick={onToggle}
        data-ocid={dataOcid}
        className="relative w-9 h-5 rounded-full transition-all flex-shrink-0"
        style={{
          background: enabled ? "#2563EB" : "rgba(255,255,255,0.1)",
        }}
        aria-pressed={enabled}
      >
        <span
          className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all"
          style={{ left: enabled ? "calc(100% - 18px)" : "2px" }}
        />
      </button>
    </div>
  );
}

interface ColorInputProps {
  value: string;
  onChange: (v: string) => void;
  dataOcid?: string;
}

function ColorInput({ value, onChange, dataOcid }: ColorInputProps) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => ref.current?.click()}
        data-ocid={dataOcid}
        className="w-7 h-7 rounded-md border border-white/10 flex-shrink-0 cursor-pointer"
        style={{ background: value }}
        aria-label="Pick color"
      />
      <input
        ref={ref}
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="sr-only"
        tabIndex={-1}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => {
          const v = e.target.value;
          if (/^#[0-9A-Fa-f]{0,6}$/.test(v)) onChange(v);
        }}
        maxLength={7}
        className="flex-1 px-2 py-1 rounded-md text-[11px] font-mono text-white/70 focus:outline-none focus:ring-1 focus:ring-[#2563EB]/50"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      />
    </div>
  );
}

function StyledSlider({
  min,
  max,
  step = 1,
  value,
  onChange,
  dataOcid,
}: {
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (v: number) => void;
  dataOcid?: string;
}) {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      data-ocid={dataOcid}
      className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-[#2563EB]"
      style={{ accentColor: "#2563EB" }}
    />
  );
}

function NumberInput({
  value,
  onChange,
  min,
  max,
  step = 1,
  dataOcid,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  dataOcid?: string;
}) {
  return (
    <input
      type="number"
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={(e) => onChange(Number(e.target.value))}
      data-ocid={dataOcid}
      className="w-full px-2 py-1.5 rounded-lg text-[11px] text-white/80 focus:outline-none focus:ring-1 focus:ring-[#2563EB]/50"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    />
  );
}

const INPUT_BASE =
  "px-2.5 py-1.5 rounded-lg text-[12px] text-white/90 focus:outline-none focus:ring-1 focus:ring-[#2563EB]/50 w-full";
const INPUT_STYLE = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)",
};

export default function TextPanelSection() {
  const textLayers = useVideoEditorStore((s) => Object.values(s.textLayers));
  const selectedTextId = useVideoEditorStore((s) => s.selectedTextId);
  const duration = useVideoEditorStore((s) => s.duration);
  const addTextLayer = useVideoEditorStore((s) => s.addTextLayer);
  const updateTextLayer = useVideoEditorStore((s) => s.updateTextLayer);
  const removeTextLayer = useVideoEditorStore((s) => s.removeTextLayer);
  const setSelectedTextId = useVideoEditorStore((s) => s.setSelectedTextId);

  const [showShadow, setShowShadow] = useState(false);
  const [showGlow, setShowGlow] = useState(false);
  const [showGradient, setShowGradient] = useState(false);

  const selected = textLayers.find((t) => t.id === selectedTextId) ?? null;
  const s = selected?.style;

  const updateStyle = (patch: Partial<TextLayerStyle>) => {
    if (!selected) return;
    updateTextLayer(selected.id, {
      style: { ...selected.style, ...patch },
    });
  };

  const handleAddText = () => {
    const id = `text-${Date.now()}`;
    const layer: TextLayer = {
      id,
      type: "text",
      trackId: TEXT_TRACK_ID,
      content: "New Text",
      startTime: 0,
      endTime: Math.max(duration, 5),
      position: { x: 50, y: 50 },
      size: { width: 300, height: 60 },
      rotation: 0,
      locked: false,
      hidden: false,
      style: {
        fontFamily: "Inter",
        fontSize: 40,
        fontWeight: "700",
        color: "#ffffff",
        opacity: 1,
        textAlign: "center",
        letterSpacing: 0,
        lineHeight: 1.2,
        animation: "none",
      },
    };
    addTextLayer(layer);
    setSelectedTextId(id);
  };

  const handleDuplicate = (layer: TextLayer) => {
    const id = `text-${Date.now()}`;
    addTextLayer({
      ...layer,
      id,
      position: { x: layer.position.x + 20, y: layer.position.y + 20 },
    });
    setSelectedTextId(id);
  };

  return (
    <div
      className="flex flex-col gap-0 text-white"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* Add Text Button */}
      <div className="p-3 pb-2">
        <button
          type="button"
          onClick={handleAddText}
          data-ocid="editor.text.add_button"
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-[12px] font-semibold text-white transition-all hover:scale-[1.02] active:scale-95"
          style={{
            background:
              "linear-gradient(135deg, rgba(37,99,235,0.22), rgba(34,197,94,0.12))",
            border: "1px solid rgba(37,99,235,0.35)",
            boxShadow: "0 2px 12px rgba(37,99,235,0.15)",
          }}
        >
          <Plus className="w-4 h-4" />
          Add Text
        </button>
      </div>

      {/* Text Layers List */}
      {textLayers.length > 0 && (
        <div className="px-3 pb-2">
          <SectionHeader label="Layers" />
          <div className="flex flex-col gap-1">
            {textLayers.map((t, i) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setSelectedTextId(t.id)}
                data-ocid={`editor.text.item.${i + 1}`}
                className="flex items-center gap-2 px-2.5 py-2 rounded-lg cursor-pointer transition-all w-full text-left"
                style={{
                  background:
                    selectedTextId === t.id
                      ? "rgba(37,99,235,0.15)"
                      : "rgba(255,255,255,0.03)",
                  border: `1px solid ${selectedTextId === t.id ? "rgba(37,99,235,0.35)" : "rgba(255,255,255,0.05)"}`,
                }}
              >
                <Type
                  className="w-3.5 h-3.5 flex-shrink-0"
                  style={{
                    color:
                      selectedTextId === t.id
                        ? "#2563EB"
                        : "rgba(255,255,255,0.35)",
                  }}
                />
                <span className="flex-1 text-[11px] font-medium text-white/70 truncate">
                  {(t.content || "Empty").slice(0, 30)}
                </span>
                <span className="text-[10px] text-white/25 flex-shrink-0">
                  {t.startTime.toFixed(1)}s
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDuplicate(t);
                  }}
                  className="w-5 h-5 flex items-center justify-center rounded text-white/20 hover:text-blue-400 transition-colors"
                  aria-label="Duplicate layer"
                  data-ocid={`editor.text.duplicate_button.${i + 1}`}
                >
                  <Copy className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeTextLayer(t.id);
                  }}
                  className="w-5 h-5 flex items-center justify-center rounded text-white/20 hover:text-red-400 transition-colors"
                  aria-label="Delete layer"
                  data-ocid={`editor.text.delete_button.${i + 1}`}
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {textLayers.length === 0 && (
        <div
          data-ocid="editor.text.empty_state"
          className="mx-3 mb-2 p-4 rounded-xl text-center"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px dashed rgba(255,255,255,0.08)",
          }}
        >
          <Type className="w-6 h-6 text-white/20 mx-auto mb-1" />
          <p className="text-[11px] text-white/25">No text layers yet</p>
        </div>
      )}

      {/* ── Typography Controls ── */}
      {selected && s && (
        <div className="flex flex-col">
          <div
            className="mx-3 mb-3 h-px"
            style={{ background: "rgba(255,255,255,0.06)" }}
          />

          {/* Content */}
          <div className="px-3 mb-3">
            <SectionHeader label="Content" />
            <input
              id="text-content-input"
              type="text"
              value={selected.content}
              onChange={(e) =>
                updateTextLayer(selected.id, { content: e.target.value })
              }
              className={INPUT_BASE}
              style={INPUT_STYLE}
              data-ocid="editor.text.content_input"
            />
          </div>

          {/* Timing */}
          <div className="px-3 mb-3">
            <SectionHeader label="Timing" />
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-[10px] text-white/40 mb-1 block">
                  Start (s)
                </span>
                <NumberInput
                  value={selected.startTime}
                  onChange={(v) =>
                    updateTextLayer(selected.id, { startTime: v })
                  }
                  min={0}
                  step={0.1}
                  dataOcid="editor.text.start_time_input"
                />
              </div>
              <div>
                <span className="text-[10px] text-white/40 mb-1 block">
                  End (s)
                </span>
                <NumberInput
                  value={selected.endTime}
                  onChange={(v) => updateTextLayer(selected.id, { endTime: v })}
                  min={0}
                  step={0.1}
                  dataOcid="editor.text.end_time_input"
                />
              </div>
            </div>
          </div>

          {/* Font Family */}
          <div className="px-3 mb-3">
            <SectionHeader label="Typography" />
            <div className="flex flex-col gap-2">
              <div>
                <span className="text-[10px] text-white/40 mb-1 block">
                  Font Family
                </span>
                <select
                  value={s.fontFamily ?? "Inter"}
                  onChange={(e) => updateStyle({ fontFamily: e.target.value })}
                  className={INPUT_BASE}
                  style={{ ...INPUT_STYLE, color: "rgba(255,255,255,0.8)" }}
                  data-ocid="editor.text.font_family_select"
                >
                  {PRESET_FONTS.map((f) => (
                    <option key={f} value={f} style={{ background: "#0F172A" }}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>

              {/* Font Size */}
              <ControlRow label="Font Size" right={`${s.fontSize ?? 40}px`}>
                <div className="flex items-center gap-2">
                  <StyledSlider
                    min={8}
                    max={120}
                    value={s.fontSize ?? 40}
                    onChange={(v) => updateStyle({ fontSize: v })}
                    dataOcid="editor.text.font_size_slider"
                  />
                  <input
                    type="number"
                    value={s.fontSize ?? 40}
                    min={8}
                    max={120}
                    onChange={(e) =>
                      updateStyle({ fontSize: Number(e.target.value) })
                    }
                    className="w-14 px-1.5 py-1 rounded text-[11px] text-white/80 text-center focus:outline-none"
                    style={INPUT_STYLE}
                  />
                </div>
              </ControlRow>

              {/* Font Weight */}
              <div>
                <span className="text-[10px] text-white/40 mb-1 block">
                  Font Weight
                </span>
                <div className="grid grid-cols-4 gap-1">
                  {(["300", "400", "700", "900"] as const).map((w) => {
                    const labels: Record<string, string> = {
                      "300": "Light",
                      "400": "Normal",
                      "700": "Bold",
                      "900": "Extra",
                    };
                    const active = (s.fontWeight ?? "700") === w;
                    return (
                      <button
                        key={w}
                        type="button"
                        onClick={() => updateStyle({ fontWeight: w })}
                        data-ocid={`editor.text.font_weight_${w}`}
                        className="py-1.5 rounded-lg text-[10px] font-medium transition-all"
                        style={{
                          background: active
                            ? "rgba(37,99,235,0.25)"
                            : "rgba(255,255,255,0.04)",
                          border: `1px solid ${active ? "rgba(37,99,235,0.5)" : "rgba(255,255,255,0.07)"}`,
                          color: active ? "#60a5fa" : "rgba(255,255,255,0.4)",
                        }}
                      >
                        {labels[w]}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Alignment */}
              <div>
                <span className="text-[10px] text-white/40 mb-1 block">
                  Alignment
                </span>
                <div className="grid grid-cols-4 gap-1">
                  {(
                    [
                      { v: "left" as const, Icon: AlignLeft },
                      { v: "center" as const, Icon: AlignCenter },
                      { v: "right" as const, Icon: AlignRight },
                      { v: "justify" as const, Icon: AlignJustify },
                    ] as {
                      v: TextLayerStyle["textAlign"] | "justify";
                      Icon: React.ElementType;
                    }[]
                  ).map(({ v, Icon }) => {
                    const active = (s.textAlign ?? "center") === v;
                    return (
                      <button
                        key={v}
                        type="button"
                        onClick={() =>
                          updateStyle({
                            textAlign: v as TextLayerStyle["textAlign"],
                          })
                        }
                        data-ocid={`editor.text.align_${v}`}
                        className="flex items-center justify-center py-1.5 rounded-lg transition-all"
                        style={{
                          background: active
                            ? "rgba(37,99,235,0.25)"
                            : "rgba(255,255,255,0.04)",
                          border: `1px solid ${active ? "rgba(37,99,235,0.5)" : "rgba(255,255,255,0.07)"}`,
                          color: active ? "#60a5fa" : "rgba(255,255,255,0.35)",
                        }}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Letter Spacing */}
              <ControlRow
                label="Letter Spacing"
                right={`${(s.letterSpacing ?? 0).toFixed(1)}em`}
              >
                <StyledSlider
                  min={-2}
                  max={5}
                  step={0.1}
                  value={s.letterSpacing ?? 0}
                  onChange={(v) => updateStyle({ letterSpacing: v })}
                  dataOcid="editor.text.letter_spacing_slider"
                />
              </ControlRow>

              {/* Line Height */}
              <ControlRow
                label="Line Height"
                right={(s.lineHeight ?? 1.2).toFixed(1)}
              >
                <StyledSlider
                  min={1}
                  max={2.5}
                  step={0.1}
                  value={s.lineHeight ?? 1.2}
                  onChange={(v) => updateStyle({ lineHeight: v })}
                  dataOcid="editor.text.line_height_slider"
                />
              </ControlRow>
            </div>
          </div>

          {/* Color & Opacity */}
          <div className="px-3 mb-3">
            <SectionHeader label="Color" />
            <div className="flex flex-col gap-2">
              <div>
                <span className="text-[10px] text-white/40 mb-1 block">
                  Text Color
                </span>
                <ColorInput
                  value={s.color ?? "#ffffff"}
                  onChange={(v) => updateStyle({ color: v })}
                  dataOcid="editor.text.color_swatch"
                />
              </div>
              <ControlRow
                label="Opacity"
                right={`${Math.round((s.opacity ?? 1) * 100)}%`}
              >
                <StyledSlider
                  min={0}
                  max={100}
                  value={Math.round((s.opacity ?? 1) * 100)}
                  onChange={(v) => updateStyle({ opacity: v / 100 })}
                  dataOcid="editor.text.opacity_slider"
                />
              </ControlRow>
            </div>
          </div>

          {/* Text Shadow */}
          <div className="px-3 mb-3">
            <SectionHeader label="Effects" />
            <div className="flex flex-col gap-2">
              <Toggle
                label="Text Shadow"
                enabled={showShadow || !!s.textShadow}
                onToggle={() => {
                  const next = !(showShadow || !!s.textShadow);
                  setShowShadow(next);
                  if (!next) updateStyle({ textShadow: undefined });
                  else if (!s.textShadow)
                    updateStyle({
                      textShadow: {
                        offsetX: 2,
                        offsetY: 2,
                        blur: 8,
                        color: "#000000",
                      },
                    });
                }}
                dataOcid="editor.text.shadow_toggle"
              />
              {(showShadow || !!s.textShadow) && (
                <div
                  className="p-2.5 rounded-lg flex flex-col gap-2"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <span className="text-[10px] text-white/35 block mb-1">
                        Offset X
                      </span>
                      <NumberInput
                        value={s.textShadow?.offsetX ?? 2}
                        onChange={(v) =>
                          updateStyle({
                            textShadow: {
                              ...(s.textShadow ?? {
                                offsetX: 2,
                                offsetY: 2,
                                blur: 8,
                                color: "#000000",
                              }),
                              offsetX: v,
                            },
                          })
                        }
                        min={-20}
                        max={20}
                        dataOcid="editor.text.shadow_offset_x"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-white/35 block mb-1">
                        Offset Y
                      </span>
                      <NumberInput
                        value={s.textShadow?.offsetY ?? 2}
                        onChange={(v) =>
                          updateStyle({
                            textShadow: {
                              ...(s.textShadow ?? {
                                offsetX: 2,
                                offsetY: 2,
                                blur: 8,
                                color: "#000000",
                              }),
                              offsetY: v,
                            },
                          })
                        }
                        min={-20}
                        max={20}
                        dataOcid="editor.text.shadow_offset_y"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-white/35 block mb-1">
                        Blur
                      </span>
                      <NumberInput
                        value={s.textShadow?.blur ?? 8}
                        onChange={(v) =>
                          updateStyle({
                            textShadow: {
                              ...(s.textShadow ?? {
                                offsetX: 2,
                                offsetY: 2,
                                blur: 8,
                                color: "#000000",
                              }),
                              blur: v,
                            },
                          })
                        }
                        min={0}
                        max={30}
                        dataOcid="editor.text.shadow_blur"
                      />
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] text-white/35 block mb-1">
                      Shadow Color
                    </span>
                    <ColorInput
                      value={s.textShadow?.color ?? "#000000"}
                      onChange={(v) =>
                        updateStyle({
                          textShadow: {
                            ...(s.textShadow ?? {
                              offsetX: 2,
                              offsetY: 2,
                              blur: 8,
                              color: v,
                            }),
                            color: v,
                          },
                        })
                      }
                      dataOcid="editor.text.shadow_color"
                    />
                  </div>
                </div>
              )}

              {/* Glow */}
              <Toggle
                label="Glow Effect"
                enabled={showGlow || !!s.glow}
                onToggle={() => {
                  const next = !(showGlow || !!s.glow);
                  setShowGlow(next);
                  if (!next) updateStyle({ glow: undefined });
                  else if (!s.glow)
                    updateStyle({
                      glow: { color: "#2563EB", intensity: 60, spread: 15 },
                    });
                }}
                dataOcid="editor.text.glow_toggle"
              />
              {(showGlow || !!s.glow) && (
                <div
                  className="p-2.5 rounded-lg flex flex-col gap-2"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <ControlRow
                    label="Intensity"
                    right={`${s.glow?.intensity ?? 60}`}
                  >
                    <StyledSlider
                      min={0}
                      max={100}
                      value={s.glow?.intensity ?? 60}
                      onChange={(v) =>
                        updateStyle({
                          glow: {
                            ...(s.glow ?? {
                              color: "#2563EB",
                              intensity: v,
                              spread: 15,
                            }),
                            intensity: v,
                          },
                        })
                      }
                      dataOcid="editor.text.glow_intensity"
                    />
                  </ControlRow>
                  <ControlRow label="Spread" right={`${s.glow?.spread ?? 15}`}>
                    <StyledSlider
                      min={0}
                      max={30}
                      value={s.glow?.spread ?? 15}
                      onChange={(v) =>
                        updateStyle({
                          glow: {
                            ...(s.glow ?? {
                              color: "#2563EB",
                              intensity: 60,
                              spread: v,
                            }),
                            spread: v,
                          },
                        })
                      }
                      dataOcid="editor.text.glow_spread"
                    />
                  </ControlRow>
                  <div>
                    <span className="text-[10px] text-white/35 block mb-1">
                      Glow Color
                    </span>
                    <ColorInput
                      value={s.glow?.color ?? "#2563EB"}
                      onChange={(v) =>
                        updateStyle({
                          glow: {
                            ...(s.glow ?? {
                              color: v,
                              intensity: 60,
                              spread: 15,
                            }),
                            color: v,
                          },
                        })
                      }
                      dataOcid="editor.text.glow_color"
                    />
                  </div>
                </div>
              )}

              {/* Gradient */}
              <Toggle
                label="Gradient Text"
                enabled={showGradient || !!s.gradient?.enabled}
                onToggle={() => {
                  const next = !(showGradient || !!s.gradient?.enabled);
                  setShowGradient(next);
                  updateStyle({
                    gradient: {
                      enabled: next,
                      fromColor: s.gradient?.fromColor ?? "#2563EB",
                      toColor: s.gradient?.toColor ?? "#22C55E",
                      direction: s.gradient?.direction ?? "horizontal",
                    },
                  });
                }}
                dataOcid="editor.text.gradient_toggle"
              />
              {(showGradient || !!s.gradient?.enabled) && (
                <div
                  className="p-2.5 rounded-lg flex flex-col gap-2"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] text-white/35 block mb-1">
                        From
                      </span>
                      <ColorInput
                        value={s.gradient?.fromColor ?? "#2563EB"}
                        onChange={(v) =>
                          updateStyle({
                            gradient: {
                              ...(s.gradient ?? {
                                enabled: true,
                                fromColor: v,
                                toColor: "#22C55E",
                                direction: "horizontal",
                              }),
                              fromColor: v,
                            },
                          })
                        }
                        dataOcid="editor.text.gradient_from"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-white/35 block mb-1">
                        To
                      </span>
                      <ColorInput
                        value={s.gradient?.toColor ?? "#22C55E"}
                        onChange={(v) =>
                          updateStyle({
                            gradient: {
                              ...(s.gradient ?? {
                                enabled: true,
                                fromColor: "#2563EB",
                                toColor: v,
                                direction: "horizontal",
                              }),
                              toColor: v,
                            },
                          })
                        }
                        dataOcid="editor.text.gradient_to"
                      />
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] text-white/35 block mb-1">
                      Direction
                    </span>
                    <div className="grid grid-cols-3 gap-1">
                      {(["horizontal", "vertical", "diagonal"] as const).map(
                        (d) => {
                          const active =
                            (s.gradient?.direction ?? "horizontal") === d;
                          return (
                            <button
                              key={d}
                              type="button"
                              onClick={() =>
                                updateStyle({
                                  gradient: {
                                    ...(s.gradient ?? {
                                      enabled: true,
                                      fromColor: "#2563EB",
                                      toColor: "#22C55E",
                                      direction: d,
                                    }),
                                    direction: d,
                                  },
                                })
                              }
                              data-ocid={`editor.text.gradient_dir_${d}`}
                              className="py-1 rounded text-[10px] capitalize transition-all"
                              style={{
                                background: active
                                  ? "rgba(37,99,235,0.25)"
                                  : "rgba(255,255,255,0.04)",
                                border: `1px solid ${active ? "rgba(37,99,235,0.4)" : "rgba(255,255,255,0.07)"}`,
                                color: active
                                  ? "#60a5fa"
                                  : "rgba(255,255,255,0.4)",
                              }}
                            >
                              {d}
                            </button>
                          );
                        },
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Animation Presets */}
          <div className="px-3 mb-3">
            <SectionHeader label="Animations" />
            <div className="grid grid-cols-4 gap-1">
              {ANIMATION_PRESETS.map(({ id, label, Icon }) => {
                const active = (s.animation ?? "none") === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => updateStyle({ animation: id })}
                    data-ocid={`editor.text.animation_${id}`}
                    className="flex flex-col items-center gap-1 py-2 rounded-lg text-[9px] font-medium capitalize transition-all"
                    style={{
                      background: active
                        ? "rgba(37,99,235,0.2)"
                        : "rgba(255,255,255,0.03)",
                      border: `1px solid ${active ? "rgba(37,99,235,0.5)" : "rgba(255,255,255,0.06)"}`,
                      color: active ? "#60a5fa" : "rgba(255,255,255,0.35)",
                      boxShadow: active
                        ? "0 0 8px rgba(37,99,235,0.3)"
                        : "none",
                    }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Style Presets */}
          <div className="px-3 pb-4">
            <SectionHeader label="Style Presets" />
            <div className="flex flex-col gap-1.5">
              {STYLE_PRESETS.map(
                ({ id, label, preview, style: presetStyle }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      if (!selected) return;
                      updateTextLayer(selected.id, {
                        style: { ...selected.style, ...presetStyle },
                      });
                    }}
                    data-ocid={`editor.text.preset_${id}`}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all hover:scale-[1.01] active:scale-[0.99]"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <span
                      className="w-6 h-6 rounded-md flex-shrink-0"
                      style={{ background: preview }}
                    />
                    <span
                      className="text-[12px] font-semibold"
                      style={{ color: preview }}
                    >
                      {label}
                    </span>
                    <span className="text-[10px] text-white/25 ml-auto">
                      {id === "youtube" && "Impact + shadow"}
                      {id === "glow" && "Neon glow"}
                      {id === "cinematic" && "Wide spacing"}
                      {id === "tiktok" && "Black bg box"}
                      {id === "minimal" && "Clean & subtle"}
                    </span>
                  </button>
                ),
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
