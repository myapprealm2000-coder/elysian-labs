import { FONTS, PRESET_STYLES } from "@/hooks/useVideoEditor";
import type {
  Clip,
  PresetType,
  SpeedValue,
  TextAlign,
  TextOverlay,
  VideoEditorState,
} from "@/hooks/useVideoEditor";
import type { ColorGradingSettings } from "@/types/videoEditor";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Palette,
  Sliders,
  Sparkles,
  Trash2,
  Underline,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface ProPropertiesPanelProps {
  state: VideoEditorState;
  colorGrading: ColorGradingSettings;
  onUpdateClip: (id: string, patch: Partial<Clip>) => void;
  onUpdateText: (id: string, patch: Partial<TextOverlay>) => void;
  onDeleteText: (id: string) => void;
  onColorGrading: (patch: Partial<ColorGradingSettings>) => void;
}

type PanelTab = "properties" | "color" | "animation";

// ─── Helpers ───────────────────────────────────────────────────────────────────

const SPEEDS: SpeedValue[] = [0.5, 0.75, 1, 1.25, 1.5, 2];

const BLEND_MODES = [
  "normal",
  "overlay",
  "screen",
  "darken",
  "multiply",
  "soft-light",
  "color-burn",
];

const IN_ANIMATIONS = [
  "None",
  "Fade",
  "Slide Up",
  "Slide Left",
  "Zoom In",
  "Bounce",
  "Pop",
  "Typewriter",
];
const OUT_ANIMATIONS = [
  "None",
  "Fade",
  "Slide Down",
  "Slide Right",
  "Zoom Out",
  "Blur Out",
];

const COLOR_SWATCHES = [
  { color: "#ffffff", label: "White" },
  { color: "#000000", label: "Black" },
  { color: "#ef4444", label: "Red" },
  { color: "#f59e0b", label: "Amber" },
  { color: "#22c55e", label: "Green" },
  { color: "#3b82f6", label: "Blue" },
  { color: "#a855f7", label: "Purple" },
  { color: "#ec4899", label: "Pink" },
  { color: "#0047ab", label: "Cobalt" },
  { color: "#50c878", label: "Emerald" },
  { color: "#00ff00", label: "Lime" },
  { color: "#ffd700", label: "Gold" },
];

const GRAD_SLIDERS: {
  key: keyof ColorGradingSettings;
  label: string;
  min: number;
  max: number;
}[] = [
  { key: "exposure", label: "Exposure", min: -100, max: 100 },
  { key: "contrast", label: "Contrast", min: -100, max: 100 },
  { key: "saturation", label: "Saturation", min: -100, max: 100 },
  { key: "highlights", label: "Highlights", min: -100, max: 100 },
  { key: "shadows", label: "Shadows", min: -100, max: 100 },
  { key: "temperature", label: "Temperature", min: -100, max: 100 },
  { key: "tint", label: "Tint", min: -100, max: 100 },
  { key: "sharpen", label: "Sharpen", min: 0, max: 100 },
  { key: "vibrance", label: "Vibrance", min: -100, max: 100 },
  { key: "fade", label: "Fade", min: 0, max: 100 },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="text-[9px] font-bold uppercase tracking-widest"
      style={{ color: "oklch(0.42 0 0)" }}
    >
      {children}
    </span>
  );
}

const inputCls =
  "w-full h-7 px-2 rounded border text-xs focus:outline-none transition-all";
const inputStyle = {
  background: "oklch(0.12 0.005 240)",
  border: "1px solid rgba(255,255,255,0.08)",
  color: "oklch(0.82 0 0)",
};

const focusInputStyle: React.CSSProperties = {
  ...inputStyle,
  outline: "none",
  borderColor: "oklch(0.38 0.18 250 / 0.5)",
};
void focusInputStyle; // referenced via className

function Row({
  label,
  children,
}: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function SliderRow({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  dataOcid,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  dataOcid?: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="flex items-center gap-2">
      <Label>{label}</Label>
      <div className="flex-1 relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-1 rounded-full appearance-none"
          style={{ accentColor: "#2563EB" }}
          data-ocid={dataOcid}
          aria-label={label}
        />
      </div>
      <span
        className="text-[9px] font-mono w-8 text-right"
        style={{ color: pct > 50 ? "oklch(0.65 0.18 250)" : "oklch(0.45 0 0)" }}
      >
        {value}
      </span>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────────

export function ProPropertiesPanel({
  state,
  colorGrading,
  onUpdateClip,
  onUpdateText,
  onDeleteText,
  onColorGrading,
}: ProPropertiesPanelProps) {
  const [tab, setTab] = useState<PanelTab>("properties");
  const [inAnim, setInAnim] = useState("None");
  const [outAnim, setOutAnim] = useState("None");

  const TABS: { id: PanelTab; label: string; icon: React.ElementType }[] = [
    { id: "properties", label: "Properties", icon: Sliders },
    { id: "color", label: "Color", icon: Palette },
    { id: "animation", label: "Animation", icon: Sparkles },
  ];

  return (
    <div
      className="flex flex-col h-full overflow-hidden"
      style={{
        background: "oklch(0.095 0.004 240)",
        fontFamily: "var(--font-editor, 'Inter', sans-serif)",
      }}
      data-ocid="pro-properties-panel"
    >
      {/* Tabs */}
      <div
        className="flex flex-shrink-0 px-2 pt-2 gap-0.5"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className="flex items-center gap-1.5 px-2.5 pb-2 text-[10px] font-bold transition-all relative"
            style={{
              color: tab === id ? "oklch(0.7 0.18 250)" : "oklch(0.4 0 0)",
            }}
            data-ocid={`properties-tab-${id}`}
          >
            <Icon size={10} />
            {label}
            {tab === id && (
              <motion.div
                layoutId="prop-tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                style={{ background: "oklch(0.55 0.2 250)" }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div
        className="flex-1 overflow-y-auto"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "oklch(0.18 0 0) transparent",
        }}
      >
        <AnimatePresence mode="wait">
          {tab === "properties" && (
            <motion.div
              key="properties"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.15 }}
            >
              <PropertiesContent
                state={state}
                onUpdateClip={onUpdateClip}
                onUpdateText={onUpdateText}
                onDeleteText={onDeleteText}
              />
            </motion.div>
          )}
          {tab === "color" && (
            <motion.div
              key="color"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.15 }}
              className="p-3 flex flex-col gap-2.5"
            >
              <p
                className="text-[9px] font-bold uppercase tracking-widest"
                style={{ color: "oklch(0.42 0 0)" }}
              >
                Color Grading
              </p>
              {GRAD_SLIDERS.map((s) => (
                <SliderRow
                  key={s.key}
                  label={s.label}
                  value={colorGrading[s.key]}
                  min={s.min}
                  max={s.max}
                  onChange={(v) => onColorGrading({ [s.key]: v })}
                  dataOcid={`color-${s.key}-slider`}
                />
              ))}
              <button
                type="button"
                className="mt-1 w-full py-1.5 rounded text-[10px] font-semibold transition-all hover:opacity-80"
                style={{
                  background: "oklch(0.13 0.005 240)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  color: "oklch(0.5 0 0)",
                }}
                onClick={() => {
                  const reset = Object.fromEntries(
                    GRAD_SLIDERS.map((s) => [s.key, 0]),
                  ) as unknown as Partial<ColorGradingSettings>;
                  onColorGrading(reset);
                }}
                data-ocid="color-grading-reset"
              >
                Reset All
              </button>
            </motion.div>
          )}
          {tab === "animation" && (
            <motion.div
              key="animation"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.15 }}
              className="p-3 flex flex-col gap-4"
            >
              <Row label="In Animation">
                <div className="grid grid-cols-2 gap-1">
                  {IN_ANIMATIONS.map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => setInAnim(a)}
                      className="py-1.5 rounded text-[10px] font-semibold transition-all"
                      style={{
                        background:
                          inAnim === a
                            ? "oklch(0.38 0.18 250 / 0.2)"
                            : "oklch(0.12 0.005 240)",
                        border:
                          inAnim === a
                            ? "1px solid oklch(0.38 0.18 250 / 0.5)"
                            : "1px solid rgba(255,255,255,0.06)",
                        color:
                          inAnim === a
                            ? "oklch(0.7 0.18 250)"
                            : "oklch(0.5 0 0)",
                      }}
                      data-ocid={`anim-in-${a.toLowerCase().replace(" ", "-")}`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </Row>
              <Row label="Out Animation">
                <div className="grid grid-cols-2 gap-1">
                  {OUT_ANIMATIONS.map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => setOutAnim(a)}
                      className="py-1.5 rounded text-[10px] font-semibold transition-all"
                      style={{
                        background:
                          outAnim === a
                            ? "oklch(0.52 0.17 150 / 0.2)"
                            : "oklch(0.12 0.005 240)",
                        border:
                          outAnim === a
                            ? "1px solid oklch(0.52 0.17 150 / 0.5)"
                            : "1px solid rgba(255,255,255,0.06)",
                        color:
                          outAnim === a
                            ? "oklch(0.7 0.15 150)"
                            : "oklch(0.5 0 0)",
                      }}
                      data-ocid={`anim-out-${a.toLowerCase().replace(" ", "-")}`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </Row>
              {/* Preview pill */}
              <div
                className="rounded-xl p-3 text-center text-[10px]"
                style={{
                  background: "oklch(0.12 0.005 240)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  color: "oklch(0.45 0 0)",
                }}
              >
                {inAnim !== "None" || outAnim !== "None" ? (
                  <span style={{ color: "oklch(0.65 0.15 250)" }}>
                    ✦ {inAnim !== "None" ? `In: ${inAnim}` : ""}
                    {inAnim !== "None" && outAnim !== "None" ? " · " : ""}
                    {outAnim !== "None" ? `Out: ${outAnim}` : ""}
                  </span>
                ) : (
                  "No animation selected"
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Properties tab content ────────────────────────────────────────────────────

function PropertiesContent({
  state,
  onUpdateClip,
  onUpdateText,
  onDeleteText,
}: {
  state: VideoEditorState;
  onUpdateClip: (id: string, patch: Partial<Clip>) => void;
  onUpdateText: (id: string, patch: Partial<TextOverlay>) => void;
  onDeleteText: (id: string) => void;
}) {
  const selected = state.selectedItem;

  if (!selected) {
    return (
      <div
        className="flex flex-col h-full items-center justify-center p-6"
        data-ocid="properties-empty"
      >
        <div className="text-center space-y-3">
          <div
            className="w-10 h-10 rounded-xl mx-auto flex items-center justify-center"
            style={{
              background: "oklch(0.12 0.005 240)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <Sliders size={16} style={{ color: "oklch(0.35 0 0)" }} />
          </div>
          <p
            className="text-[11px] leading-relaxed"
            style={{ color: "oklch(0.4 0 0)" }}
          >
            Select a clip or text layer
          </p>
          <p className="text-[10px]" style={{ color: "oklch(0.28 0 0)" }}>
            Click on canvas or timeline
          </p>
        </div>
      </div>
    );
  }

  if (selected.type === "clip") {
    const clip = (state.clips ?? []).find((c) => c.id === selected.id);
    if (!clip) return null;
    return <ClipProps clip={clip} onUpdate={onUpdateClip} />;
  }

  const overlay = (state.textOverlays ?? []).find((t) => t.id === selected.id);
  if (!overlay) return null;
  return (
    <TextProps
      overlay={overlay}
      onUpdate={onUpdateText}
      onDelete={onDeleteText}
      duration={state.duration}
    />
  );
}

// ─── Clip properties ──────────────────────────────────────────────────────────

function ClipProps({
  clip,
  onUpdate,
}: { clip: Clip; onUpdate: (id: string, p: Partial<Clip>) => void }) {
  return (
    <div className="flex flex-col gap-3 p-3" data-ocid="properties-clip">
      <p
        className="text-[9px] font-bold uppercase tracking-widest"
        style={{ color: "oklch(0.42 0 0)" }}
      >
        Clip
      </p>

      <Row label="Name">
        <input
          type="text"
          value={clip.name}
          onChange={(e) => onUpdate(clip.id, { name: e.target.value })}
          className={inputCls}
          style={inputStyle}
          data-ocid="clip-name-input"
        />
      </Row>

      {/* Info */}
      <div
        className="rounded-lg p-2.5 text-[10px]"
        style={{
          background: "oklch(0.115 0.005 240)",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div
          className="grid grid-cols-2 gap-y-1"
          style={{ color: "oklch(0.45 0 0)" }}
        >
          {[
            ["Duration", `${(clip.trimOut - clip.trimIn).toFixed(2)}s`],
            ["Start", `${clip.startTime.toFixed(2)}s`],
            ["Trim In", `${clip.trimIn.toFixed(2)}s`],
            ["Trim Out", `${clip.trimOut.toFixed(2)}s`],
          ].map(([k, v]) => (
            <>
              <span key={`k-${k}`}>{k}</span>
              <span
                key={`v-${k}`}
                className="text-right font-mono"
                style={{ color: "oklch(0.7 0 0)" }}
              >
                {v}
              </span>
            </>
          ))}
        </div>
      </div>

      <SliderRow
        label="Volume"
        value={clip.volume}
        min={0}
        max={200}
        onChange={(v) => onUpdate(clip.id, { volume: v })}
        dataOcid="clip-volume-slider"
      />

      <Row label="Speed">
        <div className="grid grid-cols-3 gap-1">
          {SPEEDS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onUpdate(clip.id, { speed: s as SpeedValue })}
              className="py-1 rounded text-[10px] font-bold transition-all"
              style={{
                background:
                  clip.speed === s
                    ? "oklch(0.38 0.18 250 / 0.2)"
                    : "oklch(0.12 0.005 240)",
                border:
                  clip.speed === s
                    ? "1px solid oklch(0.38 0.18 250 / 0.5)"
                    : "1px solid rgba(255,255,255,0.06)",
                color:
                  clip.speed === s ? "oklch(0.7 0.18 250)" : "oklch(0.5 0 0)",
              }}
              data-ocid={`clip-speed-${s}x`}
            >
              {s}x
            </button>
          ))}
        </div>
      </Row>

      <Row label="Blend Mode">
        <select
          value="normal"
          className={inputCls}
          style={inputStyle}
          onChange={() => {}}
          data-ocid="clip-blend-mode-select"
        >
          {BLEND_MODES.map((m) => (
            <option key={m} value={m}>
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </option>
          ))}
        </select>
      </Row>

      <SliderRow
        label="Opacity"
        value={100}
        min={0}
        max={100}
        onChange={() => {}}
        dataOcid="clip-opacity-slider"
      />
    </div>
  );
}

// ─── Text properties ──────────────────────────────────────────────────────────

function TextProps({
  overlay,
  onUpdate,
  onDelete,
  duration,
}: {
  overlay: TextOverlay;
  onUpdate: (id: string, p: Partial<TextOverlay>) => void;
  onDelete: (id: string) => void;
  duration: number;
}) {
  const [shadow, setShadow] = useState(false);
  const [glow, setGlow] = useState(false);

  const applyPreset = (preset: Exclude<PresetType, "custom">) =>
    onUpdate(overlay.id, { ...PRESET_STYLES[preset] });

  return (
    <div className="flex flex-col gap-3 p-3" data-ocid="properties-text">
      <p
        className="text-[9px] font-bold uppercase tracking-widest"
        style={{ color: "oklch(0.42 0 0)" }}
      >
        Text Layer
      </p>

      {/* Content */}
      <Row label="Content">
        <textarea
          value={overlay.content}
          rows={2}
          onChange={(e) => onUpdate(overlay.id, { content: e.target.value })}
          className="w-full px-2 py-1.5 rounded text-xs resize-none focus:outline-none transition-all"
          style={inputStyle}
          data-ocid="text-content-textarea"
        />
      </Row>

      {/* Font */}
      <Row label="Font Family">
        <select
          value={overlay.fontFamily}
          onChange={(e) => onUpdate(overlay.id, { fontFamily: e.target.value })}
          className={inputCls}
          style={inputStyle}
          data-ocid="text-font-select"
        >
          {FONTS.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </Row>

      {/* Size */}
      <SliderRow
        label={`Size — ${overlay.fontSize ?? 32}px`}
        value={overlay.fontSize ?? 32}
        min={8}
        max={200}
        onChange={(v) => onUpdate(overlay.id, { fontSize: v })}
        dataOcid="text-fontsize-slider"
      />

      {/* Style row */}
      <Row label="Style">
        <div className="flex gap-1">
          {(
            [
              { icon: Bold, key: "bold" as const, label: "Bold" },
              { icon: Italic, key: "italic" as const, label: "Italic" },
              {
                icon: Underline,
                key: "underline" as const,
                label: "Underline",
              },
            ] as {
              icon: React.ElementType;
              key: keyof Pick<TextOverlay, "bold" | "italic" | "underline">;
              label: string;
            }[]
          ).map(({ icon: Icon, key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => onUpdate(overlay.id, { [key]: !overlay[key] })}
              className="flex-1 h-7 flex items-center justify-center rounded transition-all"
              style={{
                background: overlay[key]
                  ? "oklch(0.38 0.18 250 / 0.2)"
                  : "oklch(0.12 0.005 240)",
                border: overlay[key]
                  ? "1px solid oklch(0.38 0.18 250 / 0.5)"
                  : "1px solid rgba(255,255,255,0.06)",
                color: overlay[key] ? "oklch(0.7 0.18 250)" : "oklch(0.45 0 0)",
              }}
              aria-label={label}
              data-ocid={`text-${key}-toggle`}
            >
              <Icon size={12} />
            </button>
          ))}
        </div>
      </Row>

      {/* Alignment */}
      <Row label="Alignment">
        <div className="flex gap-1">
          {(["left", "center", "right"] as TextAlign[]).map((align) => {
            const Icon =
              align === "left"
                ? AlignLeft
                : align === "center"
                  ? AlignCenter
                  : AlignRight;
            return (
              <button
                key={align}
                type="button"
                onClick={() => onUpdate(overlay.id, { textAlign: align })}
                className="flex-1 h-7 flex items-center justify-center rounded transition-all"
                style={{
                  background:
                    overlay.textAlign === align
                      ? "oklch(0.35 0.15 150 / 0.2)"
                      : "oklch(0.12 0.005 240)",
                  border:
                    overlay.textAlign === align
                      ? "1px solid oklch(0.52 0.17 150 / 0.5)"
                      : "1px solid rgba(255,255,255,0.06)",
                  color:
                    overlay.textAlign === align
                      ? "oklch(0.7 0.15 150)"
                      : "oklch(0.45 0 0)",
                }}
                aria-label={`Align ${align}`}
                data-ocid={`text-align-${align}`}
              >
                <Icon size={12} />
              </button>
            );
          })}
        </div>
      </Row>

      {/* Color */}
      <Row label="Color">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={overlay.color}
              onChange={(e) => onUpdate(overlay.id, { color: e.target.value })}
              className="w-8 h-8 rounded cursor-pointer p-0.5"
              style={{
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
              data-ocid="text-color-input"
            />
            <span
              className="text-[10px] font-mono"
              style={{ color: "oklch(0.55 0 0)" }}
            >
              {(overlay.color ?? "#ffffff").toUpperCase()}
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            {COLOR_SWATCHES.map((sw) => (
              <button
                key={sw.color}
                type="button"
                onClick={() => onUpdate(overlay.id, { color: sw.color })}
                className="w-5 h-5 rounded-full border-2 transition-all hover:scale-110"
                style={{
                  background: sw.color,
                  borderColor:
                    overlay.color === sw.color ? "white" : "transparent",
                  boxShadow:
                    overlay.color === sw.color ? `0 0 6px ${sw.color}` : "none",
                }}
                title={sw.label}
                aria-label={sw.label}
                data-ocid={`text-color-swatch-${sw.label.toLowerCase()}`}
              />
            ))}
          </div>
        </div>
      </Row>

      {/* Effects toggles */}
      <Row label="Effects">
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => setShadow((v) => !v)}
            className="flex-1 py-1 rounded text-[10px] font-semibold transition-all"
            style={{
              background: shadow
                ? "oklch(0.35 0.15 70 / 0.2)"
                : "oklch(0.12 0.005 240)",
              border: shadow
                ? "1px solid oklch(0.5 0.15 70 / 0.5)"
                : "1px solid rgba(255,255,255,0.06)",
              color: shadow ? "oklch(0.7 0.14 70)" : "oklch(0.45 0 0)",
            }}
            data-ocid="text-shadow-toggle"
          >
            Shadow
          </button>
          <button
            type="button"
            onClick={() => setGlow((v) => !v)}
            className="flex-1 py-1 rounded text-[10px] font-semibold transition-all"
            style={{
              background: glow
                ? "oklch(0.38 0.18 250 / 0.2)"
                : "oklch(0.12 0.005 240)",
              border: glow
                ? "1px solid oklch(0.38 0.18 250 / 0.5)"
                : "1px solid rgba(255,255,255,0.06)",
              color: glow ? "oklch(0.7 0.18 250)" : "oklch(0.45 0 0)",
            }}
            data-ocid="text-glow-toggle"
          >
            Glow
          </button>
        </div>
      </Row>

      {/* Opacity */}
      <SliderRow
        label={`Opacity — ${Math.round((overlay.opacity ?? 1) * 100)}%`}
        value={(overlay.opacity ?? 1) * 100}
        min={0}
        max={100}
        onChange={(v) => onUpdate(overlay.id, { opacity: v / 100 })}
        dataOcid="text-opacity-slider"
      />

      {/* Timing */}
      <div
        className="rounded-lg p-2.5"
        style={{
          background: "oklch(0.115 0.005 240)",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <p
          className="text-[9px] font-bold uppercase tracking-widest mb-2"
          style={{ color: "oklch(0.42 0 0)" }}
        >
          Timing
        </p>
        <div className="grid grid-cols-2 gap-2">
          <Row label="Start (s)">
            <input
              type="number"
              value={overlay.startTime.toFixed(2)}
              step={0.1}
              min={0}
              max={duration}
              onChange={(e) =>
                onUpdate(overlay.id, { startTime: Number(e.target.value) })
              }
              className={inputCls}
              style={inputStyle}
              data-ocid="text-start-input"
            />
          </Row>
          <Row label="End (s)">
            <input
              type="number"
              value={overlay.endTime.toFixed(2)}
              step={0.1}
              min={0}
              max={duration}
              onChange={(e) =>
                onUpdate(overlay.id, { endTime: Number(e.target.value) })
              }
              className={inputCls}
              style={inputStyle}
              data-ocid="text-end-input"
            />
          </Row>
        </div>
      </div>

      {/* Preset re-apply */}
      <Row label="Re-apply Preset">
        <div className="flex gap-1">
          {(["youtube", "glow", "bold"] as Exclude<PresetType, "custom">[]).map(
            (p) => (
              <button
                key={p}
                type="button"
                onClick={() => applyPreset(p)}
                className="flex-1 py-1.5 rounded text-[10px] font-bold uppercase transition-all"
                style={{
                  background:
                    overlay.preset === p
                      ? "oklch(0.38 0.18 250 / 0.15)"
                      : "oklch(0.12 0.005 240)",
                  border:
                    overlay.preset === p
                      ? "1px solid oklch(0.38 0.18 250 / 0.4)"
                      : "1px solid rgba(255,255,255,0.06)",
                  color:
                    overlay.preset === p
                      ? "oklch(0.65 0.18 250)"
                      : "oklch(0.42 0 0)",
                }}
                data-ocid={`text-preset-apply-${p}`}
              >
                {p}
              </button>
            ),
          )}
        </div>
      </Row>

      {/* Delete */}
      <button
        type="button"
        onClick={() => onDelete(overlay.id)}
        className="flex items-center justify-center gap-2 w-full py-2 rounded-lg text-[11px] font-semibold transition-all hover:opacity-80 mt-1"
        style={{
          background: "oklch(0.22 0.12 25 / 0.15)",
          border: "1px solid oklch(0.52 0.18 25 / 0.4)",
          color: "oklch(0.65 0.2 25)",
        }}
        data-ocid="text-delete-btn"
      >
        <Trash2 size={12} />
        Delete Layer
      </button>
    </div>
  );
}
