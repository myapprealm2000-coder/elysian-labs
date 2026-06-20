import { FONTS, PRESET_STYLES } from "@/hooks/useVideoEditor";
import type {
  Clip,
  PresetType,
  SpeedValue,
  TextAlign,
  TextOverlay,
  VideoEditorState,
} from "@/hooks/useVideoEditor";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Trash2,
  Underline,
} from "lucide-react";

const SPEEDS: SpeedValue[] = [0.5, 0.75, 1, 1.25, 1.5, 2];

interface PropertiesPanelProps {
  state: VideoEditorState;
  onUpdateClip: (id: string, patch: Partial<Clip>) => void;
  onUpdateText: (id: string, patch: Partial<TextOverlay>) => void;
  onDeleteText: (id: string) => void;
}

const COLOR_SWATCHES = [
  { color: "#ffffff", label: "White" },
  { color: "#000000", label: "Black" },
  { color: "#0047ab", label: "Cobalt" },
  { color: "#50c878", label: "Emerald" },
  { color: "#00ff00", label: "Lime" },
  { color: "#ff4444", label: "Red" },
  { color: "#ffd700", label: "Gold" },
  { color: "#ff6b35", label: "Orange" },
];

function Row({
  label,
  children,
}: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
        {label}
      </span>
      {children}
    </div>
  );
}

const inputCls =
  "w-full h-7 px-2 rounded border border-border text-xs text-foreground bg-muted focus:outline-none focus:border-accent transition-smooth";

const sectionTitle =
  "text-[10px] font-bold uppercase tracking-widest text-muted-foreground";

export function PropertiesPanel({
  state,
  onUpdateClip,
  onUpdateText,
  onDeleteText,
}: PropertiesPanelProps) {
  const selected = state.selectedItem;

  if (!selected) {
    return (
      <div
        className="flex flex-col h-full items-center justify-center p-4"
        data-ocid="properties-empty"
      >
        <div className="text-center space-y-3">
          <div
            className="w-12 h-12 rounded-xl mx-auto flex items-center justify-center"
            style={{ background: "oklch(0.13 0.005 240)" }}
          >
            <span className="text-xl">&#9881;</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Select a text layer or clip to edit its properties
          </p>
          <p className="text-[10px] text-muted-foreground/60">
            Click on canvas or timeline to select
          </p>
        </div>
      </div>
    );
  }

  if (selected.type === "clip") {
    const clip = (state.clips ?? []).find((c) => c.id === selected.id);
    if (!clip) return null;
    return <ClipProperties clip={clip} onUpdate={onUpdateClip} />;
  }

  const overlay = (state.textOverlays ?? []).find((t) => t.id === selected.id);
  if (!overlay) return null;
  return (
    <TextProperties
      overlay={overlay}
      onUpdate={onUpdateText}
      onDelete={onDeleteText}
      duration={state.duration}
    />
  );
}

function ClipProperties({
  clip,
  onUpdate,
}: { clip: Clip; onUpdate: (id: string, p: Partial<Clip>) => void }) {
  const durSec = clip.trimOut - clip.trimIn;
  return (
    <div
      className="flex flex-col gap-4 p-3 overflow-y-auto h-full"
      data-ocid="properties-clip"
    >
      <p className={sectionTitle}>Clip Properties</p>

      <Row label="Name">
        <input
          type="text"
          value={clip.name}
          onChange={(e) => onUpdate(clip.id, { name: e.target.value })}
          className={inputCls}
          data-ocid="clip-name-input"
        />
      </Row>

      <div
        className="rounded-lg p-2.5 text-xs"
        style={{ background: "oklch(0.11 0.005 240)" }}
      >
        <div className="grid grid-cols-2 gap-1.5 text-muted-foreground">
          <span>Duration</span>
          <span className="text-foreground font-mono text-right">
            {durSec.toFixed(2)}s
          </span>
          <span>Start</span>
          <span className="text-foreground font-mono text-right">
            {clip.startTime.toFixed(2)}s
          </span>
          <span>End</span>
          <span className="text-foreground font-mono text-right">
            {(clip.endTime ?? clip.startTime + clip.duration).toFixed(2)}s
          </span>
        </div>
      </div>

      <Row label={`Volume (${clip.volume}%)`}>
        <input
          type="range"
          min={0}
          max={200}
          step={1}
          value={clip.volume}
          onChange={(e) =>
            onUpdate(clip.id, { volume: Number(e.target.value) })
          }
          className="w-full"
          style={{ accentColor: "#50c878" }}
          data-ocid="clip-volume-slider"
        />
      </Row>

      <Row label="Speed">
        <select
          value={clip.speed}
          onChange={(e) =>
            onUpdate(clip.id, { speed: Number(e.target.value) as SpeedValue })
          }
          className={inputCls}
          data-ocid="clip-speed-select"
        >
          {SPEEDS.map((s) => (
            <option key={s} value={s}>
              {s}x
            </option>
          ))}
        </select>
      </Row>
    </div>
  );
}

function TextProperties({
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
  const applyPreset = (preset: Exclude<PresetType, "custom">) => {
    onUpdate(overlay.id, { ...PRESET_STYLES[preset] });
  };

  return (
    <div
      className="flex flex-col gap-3 p-3 overflow-y-auto h-full"
      data-ocid="properties-text"
    >
      <p className={sectionTitle}>Text Properties</p>

      {/* Content */}
      <Row label="Content">
        <textarea
          value={overlay.content}
          rows={3}
          onChange={(e) => onUpdate(overlay.id, { content: e.target.value })}
          className="w-full px-2 py-1.5 rounded border border-border text-xs text-foreground bg-muted focus:outline-none focus:border-accent resize-none transition-smooth"
          data-ocid="text-content-textarea"
        />
      </Row>

      {/* Font family */}
      <Row label="Font">
        <select
          value={overlay.fontFamily}
          onChange={(e) => onUpdate(overlay.id, { fontFamily: e.target.value })}
          className={inputCls}
          data-ocid="text-font-select"
        >
          {FONTS.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </Row>

      {/* Font size */}
      <Row label={`Size — ${overlay.fontSize}px`}>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min={8}
            max={200}
            step={1}
            value={overlay.fontSize}
            onChange={(e) =>
              onUpdate(overlay.id, { fontSize: Number(e.target.value) })
            }
            className="flex-1"
            style={{ accentColor: "#50c878" }}
            data-ocid="text-fontsize-slider"
          />
          <input
            type="number"
            min={8}
            max={200}
            value={overlay.fontSize}
            onChange={(e) =>
              onUpdate(overlay.id, { fontSize: Number(e.target.value) })
            }
            className="w-14 h-7 px-1 rounded border border-border text-xs text-foreground bg-muted text-center focus:outline-none"
            data-ocid="text-fontsize-input"
          />
        </div>
      </Row>

      {/* Style toggles */}
      <Row label="Style">
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => onUpdate(overlay.id, { bold: !overlay.bold })}
            className={[
              "flex-1 h-8 flex items-center justify-center rounded text-xs font-bold transition-smooth",
              overlay.bold
                ? "bg-accent/20 text-accent border border-accent"
                : "bg-muted border border-border text-muted-foreground hover:text-foreground",
            ].join(" ")}
            title="Bold"
            aria-label="Toggle bold"
            data-ocid="text-bold-toggle"
          >
            <Bold className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => onUpdate(overlay.id, { italic: !overlay.italic })}
            className={[
              "flex-1 h-8 flex items-center justify-center rounded text-xs transition-smooth",
              overlay.italic
                ? "bg-accent/20 text-accent border border-accent"
                : "bg-muted border border-border text-muted-foreground hover:text-foreground",
            ].join(" ")}
            title="Italic"
            aria-label="Toggle italic"
            data-ocid="text-italic-toggle"
          >
            <Italic className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() =>
              onUpdate(overlay.id, { underline: !overlay.underline })
            }
            className={[
              "flex-1 h-8 flex items-center justify-center rounded text-xs transition-smooth",
              overlay.underline
                ? "bg-accent/20 text-accent border border-accent"
                : "bg-muted border border-border text-muted-foreground hover:text-foreground",
            ].join(" ")}
            title="Underline"
            aria-label="Toggle underline"
            data-ocid="text-underline-toggle"
          >
            <Underline className="w-3.5 h-3.5" />
          </button>
        </div>
      </Row>

      {/* Alignment */}
      <Row label="Alignment">
        <div className="flex gap-1.5">
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
                className={[
                  "flex-1 h-8 flex items-center justify-center rounded text-xs transition-smooth",
                  overlay.textAlign === align
                    ? "bg-primary/20 text-primary border border-primary"
                    : "bg-muted border border-border text-muted-foreground hover:text-foreground",
                ].join(" ")}
                aria-label={`Align ${align}`}
                data-ocid={`text-align-${align}`}
              >
                <Icon className="w-3.5 h-3.5" />
              </button>
            );
          })}
        </div>
      </Row>

      {/* Color */}
      <Row label="Text Color">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={overlay.color}
              onChange={(e) => onUpdate(overlay.id, { color: e.target.value })}
              className="w-8 h-8 rounded cursor-pointer border border-border bg-transparent p-0.5"
              data-ocid="text-color-input"
            />
            <span className="text-xs font-mono text-muted-foreground">
              {overlay.color}
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {COLOR_SWATCHES.map((sw) => (
              <button
                key={sw.color}
                type="button"
                onClick={() => onUpdate(overlay.id, { color: sw.color })}
                className="w-6 h-6 rounded-full border-2 transition-smooth hover:scale-110"
                style={{
                  background: sw.color,
                  borderColor:
                    overlay.color === sw.color ? "#0047ab" : "transparent",
                  boxShadow:
                    overlay.color === sw.color ? "0 0 6px #0047ab" : "none",
                }}
                title={sw.label}
                aria-label={sw.label}
                data-ocid={`text-color-swatch-${sw.label.toLowerCase()}`}
              />
            ))}
          </div>
        </div>
      </Row>

      {/* Opacity */}
      <Row label={`Opacity — ${Math.round((overlay.opacity ?? 1) * 100)}%`}>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={overlay.opacity ?? 1}
          onChange={(e) =>
            onUpdate(overlay.id, { opacity: Number(e.target.value) })
          }
          className="w-full"
          style={{ accentColor: "#50c878" }}
          data-ocid="text-opacity-slider"
        />
      </Row>

      {/* Timing */}
      <div className="border-t border-border pt-3">
        <p className={`${sectionTitle} mb-2`}>Timing</p>
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
              data-ocid="text-end-input"
            />
          </Row>
        </div>
      </div>

      {/* Preset quick-apply */}
      <div className="border-t border-border pt-3">
        <p className={`${sectionTitle} mb-2`}>Re-apply Preset</p>
        <div className="flex gap-1.5">
          {(["youtube", "glow", "bold"] as Exclude<PresetType, "custom">[]).map(
            (p) => (
              <button
                key={p}
                type="button"
                onClick={() => applyPreset(p)}
                className={[
                  "flex-1 py-1.5 rounded text-[10px] font-bold uppercase tracking-wide border transition-smooth",
                  overlay.preset === p
                    ? "border-accent text-accent bg-accent/10"
                    : "border-border text-muted-foreground hover:text-foreground hover:bg-muted",
                ].join(" ")}
                data-ocid={`text-preset-apply-${p}`}
              >
                {p}
              </button>
            ),
          )}
        </div>
      </div>

      {/* Delete */}
      <button
        type="button"
        onClick={() => onDelete(overlay.id)}
        className="flex items-center justify-center gap-2 w-full py-2 rounded-lg border border-destructive text-destructive hover:bg-destructive/10 text-xs font-semibold transition-smooth mt-auto"
        data-ocid="text-delete-btn"
      >
        <Trash2 className="w-3.5 h-3.5" />
        Delete Layer
      </button>
    </div>
  );
}
