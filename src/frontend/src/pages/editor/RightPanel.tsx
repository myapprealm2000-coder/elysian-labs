import { DEMO_LAYER_COMPOSITIONS } from "@/data/demoProjects";
import type {
  CanvasElement,
  CircleElement,
  RectElement,
  ShapeElement,
  StarElement,
  Template,
  TextElement,
  TriangleElement,
} from "@/types/editor";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  BringToFront,
  ChevronRight,
  Crown,
  Eye,
  EyeOff,
  FlipHorizontal,
  FlipVertical,
  GripVertical,
  Italic,
  Layers,
  Link,
  Link2Off,
  Lock,
  MoreHorizontal,
  MoveDown,
  MoveUp,
  Palette,
  SendToBack,
  Underline,
  Unlock,
} from "lucide-react";
import { memo, useCallback, useRef, useState } from "react";
import {
  FONT_FAMILIES,
  GRADIENT_PRESETS,
  QUICK_COLORS,
  TEMPLATES,
} from "./editorConstants";

// ─── Types ────────────────────────────────────────────────────────────────────
type Tab = "layers" | "properties" | "templates";

export interface RightPanelProps {
  elements: CanvasElement[];
  selectedIds: string[];
  onUpdate: (id: string, patch: Partial<CanvasElement>) => void;
  onDelete: (id: string) => void;
  onMoveLayer: (id: string, dir: 1 | -1) => void;
  onToggleVisible: (id: string) => void;
  onToggleLock: (id: string) => void;
  onSelect: (id: string) => void;
  onApplyTemplate?: (template: Template) => void;
  onDuplicate?: (id: string) => void;
  activeTab?: Tab;
  onTabChange?: (t: Tab) => void;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function layerIcon(el: CanvasElement): { symbol: string; color: string } {
  switch (el.type) {
    case "text":
      return { symbol: "T", color: "#a78bfa" };
    case "image":
      return { symbol: "⬜", color: "#06b6d4" };
    case "circle":
      return { symbol: "●", color: (el as CircleElement).fillColor };
    case "triangle":
      return { symbol: "▲", color: (el as TriangleElement).fillColor };
    case "star":
      return { symbol: "★", color: (el as StarElement).fillColor };
    default:
      return { symbol: "■", color: (el as RectElement).fillColor };
  }
}

function layerLabel(el: CanvasElement): string {
  if (el.type === "text")
    return (el as TextElement).content.slice(0, 20) || "Text";
  return el.name || el.type;
}

function isShapeEl(el: CanvasElement): el is ShapeElement {
  return ["rect", "circle", "triangle", "star"].includes(el.type);
}

// ─── Primitives ─────────────────────────────────────────────────────────────────

function GlassInput({
  label,
  id,
  type = "number",
  value,
  onChange,
  min,
  max,
  step,
  className = "",
  "data-ocid": dataOcid,
}: {
  label?: string;
  id?: string;
  type?: string;
  value: number | string;
  onChange: (v: string) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  "data-ocid"?: string;
}) {
  return (
    <div className={`flex flex-col gap-0.5 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="text-[9px] font-semibold uppercase tracking-wider text-white/40 font-editor"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(e.target.value)}
        data-ocid={dataOcid}
        className="h-8 w-full bg-white/5 border border-white/10 rounded-lg px-2 text-xs text-white/90 font-editor focus:outline-none focus:border-[#0047ab]/70 focus:ring-1 focus:ring-[#0047ab]/30 transition-smooth"
      />
    </div>
  );
}

function SectionAccordion({
  title,
  defaultOpen = true,
  children,
}: { title: string; defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-white/[0.03] transition-smooth"
      >
        <span className="text-[10px] font-semibold uppercase tracking-widest text-white/40 font-editor">
          {title}
        </span>
        <ChevronRight
          className={`w-3 h-3 text-white/25 transition-transform duration-200 ${open ? "rotate-90" : ""}`}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-200"
        style={{ maxHeight: open ? "800px" : "0", opacity: open ? 1 : 0 }}
      >
        <div className="px-3 pb-3 space-y-2.5">{children}</div>
      </div>
    </div>
  );
}

function ColorPickerPopover({
  value,
  onChange,
  label,
  ocidPrefix,
}: {
  value: string;
  onChange: (c: string) => void;
  label?: string;
  ocidPrefix?: string;
}) {
  const [open, setOpen] = useState(false);
  const [hex, setHex] = useState(value);

  const commit = useCallback(
    (v: string) => {
      if (/^#[0-9a-fA-F]{6}$/.test(v)) onChange(v);
    },
    [onChange],
  );

  return (
    <div className="relative">
      {label && (
        <p className="text-[9px] font-semibold uppercase tracking-wider text-white/40 font-editor mb-1">
          {label}
        </p>
      )}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          data-ocid={ocidPrefix ? `${ocidPrefix}-swatch` : undefined}
          className="w-7 h-7 rounded-lg border-2 border-white/20 hover:border-white/50 transition-smooth flex-shrink-0"
          style={{ background: value }}
        />
        <input
          type="text"
          value={hex}
          onChange={(e) => {
            setHex(e.target.value);
            commit(e.target.value);
          }}
          onBlur={() => setHex(value)}
          data-ocid={ocidPrefix ? `${ocidPrefix}-hex-input` : undefined}
          className="flex-1 h-7 bg-white/5 border border-white/10 rounded-lg px-2 text-[10px] text-white/80 font-editor font-mono focus:outline-none focus:border-[#0047ab]/70 uppercase"
          placeholder="#000000"
        />
      </div>
      {open && (
        <div
          className="absolute top-full left-0 mt-1 z-50 p-2 rounded-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.7)] backdrop-blur-xl"
          style={{ background: "rgba(12,12,20,0.97)" }}
        >
          <div className="grid grid-cols-4 gap-1.5 mb-2">
            {QUICK_COLORS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => {
                  onChange(c);
                  setHex(c);
                  setOpen(false);
                }}
                style={{ background: c, width: 32, height: 32 }}
                className={`rounded-full border transition-smooth hover:scale-110 ${
                  c.toLowerCase() === value.toLowerCase()
                    ? "border-[#0047ab] ring-2 ring-[#0047ab]/60"
                    : "border-white/20"
                }`}
              />
            ))}
          </div>
          <input
            type="color"
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              setHex(e.target.value);
            }}
            className="w-full h-8 rounded-lg cursor-pointer border-0 bg-transparent"
          />
        </div>
      )}
    </div>
  );
}

function GlassSlider({
  label,
  value,
  min,
  max,
  step = 1,
  unit = "",
  onChange,
  ocid,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (v: number) => void;
  ocid?: string;
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-semibold uppercase tracking-wider text-white/40 font-editor">
          {label}
        </span>
        <span className="text-[10px] text-white/60 font-editor tabular-nums">
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        data-ocid={ocid}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-white/10 accent-[#0047ab] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#0047ab] [&::-webkit-slider-thumb]:shadow-[0_0_6px_rgba(0,71,171,0.6)] [&::-webkit-slider-thumb]:cursor-pointer"
      />
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
  ocid,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  ocid?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[10px] text-white/60 font-editor">{label}</span>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        data-ocid={ocid}
        className={`relative w-9 h-5 rounded-full transition-smooth flex-shrink-0 ${
          checked ? "bg-[#0047ab]" : "bg-white/10 border border-white/15"
        }`}
      >
        <span
          className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-md transition-all duration-200 ${checked ? "left-4" : "left-0.5"}`}
        />
      </button>
    </div>
  );
}

function IconBtn({
  onClick,
  active = false,
  title,
  children,
  className = "",
  ocid,
}: {
  onClick: () => void;
  active?: boolean;
  title?: string;
  children: React.ReactNode;
  className?: string;
  ocid?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      data-ocid={ocid}
      className={`flex items-center justify-center rounded-lg transition-smooth ${
        active
          ? "bg-[#0047ab] text-white shadow-[0_0_8px_rgba(0,71,171,0.5)]"
          : "bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white"
      } ${className}`}
    >
      {children}
    </button>
  );
}

// ─── Section components ───────────────────────────────────────────────────────

const ALIGN_TOOLS = [
  { label: "Align Left", icon: AlignLeft, action: "align-left" },
  { label: "Center H", icon: AlignCenter, action: "align-center-h" },
  { label: "Align Right", icon: AlignRight, action: "align-right" },
  { label: "Align Top", icon: MoveUp, action: "align-top" },
  { label: "Center V", icon: AlignJustify, action: "align-center-v" },
  { label: "Align Bottom", icon: MoveDown, action: "align-bottom" },
] as const;

function TextSection({
  el,
  upd,
}: { el: TextElement; upd: <T extends CanvasElement>(p: Partial<T>) => void }) {
  return (
    <SectionAccordion title="Text">
      <div>
        <p className="text-[9px] font-semibold uppercase tracking-wider text-white/40 font-editor mb-1">
          Content
        </p>
        <textarea
          value={el.content}
          onChange={(e) =>
            upd({ content: e.target.value } as Partial<TextElement>)
          }
          data-ocid="prop-text-content"
          rows={2}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-2 text-xs text-white/90 font-editor resize-none focus:outline-none focus:border-[#0047ab]/70 focus:ring-1 focus:ring-[#0047ab]/30 transition-smooth leading-relaxed"
        />
      </div>
      <div>
        <p className="text-[9px] font-semibold uppercase tracking-wider text-white/40 font-editor mb-1">
          Font Family
        </p>
        <select
          value={el.fontFamily}
          onChange={(e) =>
            upd({ fontFamily: e.target.value } as Partial<TextElement>)
          }
          data-ocid="prop-font-family"
          className="w-full h-8 bg-white/5 border border-white/10 rounded-lg px-2 text-xs text-white/90 font-editor focus:outline-none focus:border-[#0047ab]/70 appearance-none cursor-pointer"
        >
          {FONT_FAMILIES.map((f) => (
            <option key={f} value={f} style={{ background: "#111" }}>
              {f}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <GlassInput
          label="Size"
          id="prop-fs"
          value={el.fontSize}
          onChange={(v) =>
            upd({ fontSize: Math.max(6, +v) } as Partial<TextElement>)
          }
          min={6}
          max={500}
          data-ocid="prop-font-size"
        />
        <GlassInput
          label="Letter Sp."
          id="prop-ls"
          value={el.letterSpacing}
          onChange={(v) => upd({ letterSpacing: +v } as Partial<TextElement>)}
          min={-10}
          max={50}
          step={0.5}
          data-ocid="prop-letter-spacing"
        />
      </div>
      <GlassSlider
        label="Line Height"
        value={Number(el.lineHeight.toFixed(1))}
        min={0.5}
        max={4}
        step={0.1}
        ocid="prop-line-height"
        onChange={(v) => upd({ lineHeight: v } as Partial<TextElement>)}
      />
      <div>
        <p className="text-[9px] font-semibold uppercase tracking-wider text-white/40 font-editor mb-1.5">
          Style
        </p>
        <div className="flex gap-1.5">
          {[
            {
              key: "bold" as const,
              Icon: Bold,
              label: "Bold",
              ocid: "prop-bold",
            },
            {
              key: "italic" as const,
              Icon: Italic,
              label: "Italic",
              ocid: "prop-italic",
            },
            {
              key: "underline" as const,
              Icon: Underline,
              label: "Underline",
              ocid: "prop-underline",
            },
          ].map(({ key, Icon, label, ocid }) => (
            <IconBtn
              key={key}
              active={!!el[key]}
              title={label}
              ocid={ocid}
              onClick={() => upd({ [key]: !el[key] } as Partial<TextElement>)}
              className="flex-1 h-8"
            >
              <Icon className="w-3.5 h-3.5" />
            </IconBtn>
          ))}
        </div>
      </div>
      <div>
        <p className="text-[9px] font-semibold uppercase tracking-wider text-white/40 font-editor mb-1.5">
          Align
        </p>
        <div className="flex gap-1.5">
          {(["left", "center", "right", "justify"] as const).map((v) => {
            const Icon =
              v === "left"
                ? AlignLeft
                : v === "center"
                  ? AlignCenter
                  : v === "right"
                    ? AlignRight
                    : AlignJustify;
            return (
              <IconBtn
                key={v}
                active={el.align === v}
                title={v}
                ocid={`prop-align-${v}`}
                onClick={() => upd({ align: v } as Partial<TextElement>)}
                className="flex-1 h-8"
              >
                <Icon className="w-3.5 h-3.5" />
              </IconBtn>
            );
          })}
        </div>
      </div>
      <ColorPickerPopover
        value={el.color}
        onChange={(c) => upd({ color: c } as Partial<TextElement>)}
        label="Text Color"
        ocidPrefix="prop-text-color"
      />
      <Toggle
        label="Text Shadow"
        checked={el.shadow}
        onChange={(v) => upd({ shadow: v } as Partial<TextElement>)}
        ocid="prop-text-shadow"
      />
    </SectionAccordion>
  );
}

function FillSection({
  el,
  upd,
}: {
  el: ShapeElement;
  upd: <T extends CanvasElement>(p: Partial<T>) => void;
}) {
  const [mode, setMode] = useState<"solid" | "gradient">(
    el.gradientFill ? "gradient" : "solid",
  );
  return (
    <SectionAccordion title="Fill">
      <div className="flex gap-1.5">
        <button
          type="button"
          onClick={() => setMode("solid")}
          data-ocid="prop-fill-solid"
          className={`flex-1 h-7 rounded-lg text-[10px] font-semibold font-editor transition-smooth ${
            mode === "solid"
              ? "bg-[#0047ab] text-white"
              : "bg-white/5 text-white/40 hover:text-white/70"
          }`}
        >
          Solid
        </button>
        <button
          type="button"
          onClick={() => setMode("gradient")}
          data-ocid="prop-fill-gradient"
          className={`flex-1 h-7 rounded-lg text-[10px] font-semibold font-editor transition-smooth ${
            mode === "gradient"
              ? "bg-[#0047ab] text-white"
              : "bg-white/5 text-white/40 hover:text-white/70"
          }`}
        >
          Gradient
        </button>
      </div>
      {mode === "solid" ? (
        <ColorPickerPopover
          value={el.fillColor}
          onChange={(c) =>
            upd({
              fillColor: c,
              gradientFill: undefined,
            } as Partial<ShapeElement>)
          }
          ocidPrefix="prop-fill"
        />
      ) : (
        <div className="space-y-2">
          <p className="text-[9px] font-semibold uppercase tracking-wider text-white/40 font-editor">
            Gradient Presets
          </p>
          <div className="grid grid-cols-4 gap-1.5">
            {GRADIENT_PRESETS.map((g) => (
              <button
                key={g.name}
                type="button"
                title={g.name}
                data-ocid={`prop-gradient-${g.name.toLowerCase().replace(" ", "-")}`}
                onClick={() =>
                  upd({
                    gradientFill: {
                      type: "gradient",
                      colors: g.colors,
                      angle: g.angle,
                    },
                  } as Partial<ShapeElement>)
                }
                style={{
                  background: `linear-gradient(${g.angle}deg, ${g.colors[0]}, ${g.colors[1]})`,
                }}
                className={`h-8 rounded-lg border transition-smooth hover:scale-105 ${
                  el.gradientFill?.colors[0] === g.colors[0]
                    ? "border-[#0047ab] ring-2 ring-[#0047ab]/40"
                    : "border-white/10 hover:border-white/30"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </SectionAccordion>
  );
}

function StrokeSection({
  el,
  upd,
}: {
  el: ShapeElement;
  upd: <T extends CanvasElement>(p: Partial<T>) => void;
}) {
  return (
    <SectionAccordion title="Stroke" defaultOpen={false}>
      <ColorPickerPopover
        value={el.borderColor}
        onChange={(c) => upd({ borderColor: c } as Partial<ShapeElement>)}
        label="Color"
        ocidPrefix="prop-stroke"
      />
      <GlassSlider
        label="Width"
        value={el.borderWidth}
        min={0}
        max={20}
        ocid="prop-border-width"
        onChange={(v) => upd({ borderWidth: v } as Partial<ShapeElement>)}
      />
      {el.type === "rect" && (
        <GlassSlider
          label="Border Radius"
          value={(el as RectElement).borderRadius}
          min={0}
          max={200}
          ocid="prop-border-radius"
          onChange={(v) => upd({ borderRadius: v } as Partial<RectElement>)}
        />
      )}
      {el.type === "star" && (
        <GlassSlider
          label="Points"
          value={(el as StarElement).points}
          min={3}
          max={12}
          ocid="prop-star-points"
          onChange={(v) => upd({ points: v } as Partial<StarElement>)}
        />
      )}
    </SectionAccordion>
  );
}

function ShadowSection({
  el,
  upd,
}: {
  el: CanvasElement;
  upd: <T extends CanvasElement>(p: Partial<T>) => void;
}) {
  const sc = el.shadowConfig;
  const enabled = !!sc || !!(el as RectElement).shadow;
  const defaultSC = {
    color: "#000000",
    blur: 20,
    offsetX: 5,
    offsetY: 5,
    opacity: 0.5,
  };
  return (
    <SectionAccordion title="Shadow" defaultOpen={false}>
      <Toggle
        label="Enable Shadow"
        checked={enabled}
        onChange={(v) =>
          upd({
            shadow: v,
            shadowConfig: v ? (sc ?? defaultSC) : undefined,
          } as Partial<CanvasElement>)
        }
        ocid="prop-shadow-toggle"
      />
      {enabled && (
        <div className="space-y-2 pt-1">
          <ColorPickerPopover
            value={sc?.color ?? "#000000"}
            onChange={(c) =>
              upd({
                shadowConfig: { ...(sc ?? defaultSC), color: c },
              } as Partial<CanvasElement>)
            }
            label="Shadow Color"
            ocidPrefix="prop-shadow-color"
          />
          <GlassSlider
            label="Blur"
            value={sc?.blur ?? 20}
            min={0}
            max={50}
            ocid="prop-shadow-blur"
            onChange={(v) =>
              upd({
                shadowConfig: { ...(sc ?? defaultSC), blur: v },
              } as Partial<CanvasElement>)
            }
          />
          <div className="grid grid-cols-2 gap-2">
            <GlassSlider
              label="Offset X"
              value={sc?.offsetX ?? 5}
              min={-50}
              max={50}
              ocid="prop-shadow-x"
              onChange={(v) =>
                upd({
                  shadowConfig: { ...(sc ?? defaultSC), offsetX: v },
                } as Partial<CanvasElement>)
              }
            />
            <GlassSlider
              label="Offset Y"
              value={sc?.offsetY ?? 5}
              min={-50}
              max={50}
              ocid="prop-shadow-y"
              onChange={(v) =>
                upd({
                  shadowConfig: { ...(sc ?? defaultSC), offsetY: v },
                } as Partial<CanvasElement>)
              }
            />
          </div>
          <GlassSlider
            label="Opacity"
            value={Math.round((sc?.opacity ?? 0.5) * 100)}
            min={0}
            max={100}
            unit="%"
            ocid="prop-shadow-opacity"
            onChange={(v) =>
              upd({
                shadowConfig: { ...(sc ?? defaultSC), opacity: v / 100 },
              } as Partial<CanvasElement>)
            }
          />
        </div>
      )}
    </SectionAccordion>
  );
}

// ─── Tabs ────────────────────────────────────────────────────────────────────

function PropertiesTab({
  selectedEl,
  selectedId,
  upd,
  onDelete,
  onDuplicate,
  onMoveLayer,
}: {
  selectedEl: CanvasElement | null;
  selectedId: string | null;
  upd: <T extends CanvasElement>(p: Partial<T>) => void;
  onDelete: (id: string) => void;
  onDuplicate?: (id: string) => void;
  onMoveLayer: (id: string, dir: 1 | -1) => void;
}) {
  const [lockAspect, setLockAspect] = useState(false);
  const aspectRef = useRef(1);

  if (!selectedEl || !selectedId) {
    return (
      <div className="flex-1 overflow-y-auto" data-ocid="props-canvas-defaults">
        <div
          className="flex items-center justify-between px-3 py-2"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
        >
          <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/8 text-white/50 font-editor">
            canvas
          </span>
        </div>
        <SectionAccordion title="Canvas">
          <div className="flex flex-col gap-2.5">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-wider text-white/40 font-editor mb-1.5">
                Background
              </p>
              <div className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-lg border-2 border-white/20 flex-shrink-0"
                  style={{ background: "#0F1A2E" }}
                />
                <span className="text-[11px] font-mono text-white/60 font-editor">
                  #0F1A2E
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-0.5">
                <p className="text-[9px] font-semibold uppercase tracking-wider text-white/40 font-editor">
                  Width
                </p>
                <div className="h-8 w-full bg-white/5 border border-white/10 rounded-lg px-2 text-xs text-white/90 font-editor flex items-center">
                  1280
                </div>
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-[9px] font-semibold uppercase tracking-wider text-white/40 font-editor">
                  Height
                </p>
                <div className="h-8 w-full bg-white/5 border border-white/10 rounded-lg px-2 text-xs text-white/90 font-editor flex items-center">
                  720
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="text-[9px] font-semibold uppercase tracking-wider text-white/40 font-editor">
                Grid Spacing
              </p>
              <input
                type="number"
                defaultValue={24}
                min={4}
                max={128}
                className="h-8 w-full bg-white/5 border border-white/10 rounded-lg px-2 text-xs text-white/90 font-editor focus:outline-none focus:border-[#0047ab]/70 transition-smooth"
                data-ocid="canvas-grid-spacing"
              />
            </div>
            <button
              type="button"
              data-ocid="canvas-reset-button"
              className="h-8 w-full flex items-center justify-center gap-1.5 rounded-lg text-[11px] font-editor transition-smooth"
              style={{
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.2)",
                color: "rgba(248,113,113,0.8)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(239,68,68,0.15)";
                (e.currentTarget as HTMLButtonElement).style.color = "#f87171";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(239,68,68,0.08)";
                (e.currentTarget as HTMLButtonElement).style.color =
                  "rgba(248,113,113,0.8)";
              }}
            >
              Reset canvas
            </button>
          </div>
        </SectionAccordion>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div
        className="flex items-center justify-between px-3 py-2"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/8 text-white/50 font-editor">
          {selectedEl.type}
        </span>
        <div className="flex items-center gap-1">
          {onDuplicate && (
            <button
              type="button"
              onClick={() => onDuplicate(selectedId)}
              title="Duplicate"
              data-ocid="prop-duplicate-btn"
              className="w-6 h-6 flex items-center justify-center rounded-md bg-white/5 hover:bg-white/10 text-white/40 hover:text-white/70 transition-smooth text-xs"
            >
              ⧉
            </button>
          )}
          <button
            type="button"
            onClick={() => onDelete(selectedId)}
            title="Delete"
            data-ocid="prop-delete-btn"
            className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-red-500/15 text-red-400/60 hover:text-red-400 transition-smooth"
          >
            ✕
          </button>
        </div>
      </div>

      <SectionAccordion title="Position & Size">
        <div className="grid grid-cols-2 gap-2">
          <GlassInput
            label="X"
            id="prop-x"
            value={Math.round(selectedEl.x)}
            onChange={(v) => upd({ x: +v })}
            data-ocid="prop-x"
          />
          <GlassInput
            label="Y"
            id="prop-y"
            value={Math.round(selectedEl.y)}
            onChange={(v) => upd({ y: +v })}
            data-ocid="prop-y"
          />
        </div>
        <div className="grid grid-cols-[1fr_auto_1fr] gap-1.5 items-end">
          <GlassInput
            label="W"
            id="prop-w"
            value={Math.round(selectedEl.width)}
            onChange={(v) => {
              const w = Math.max(1, +v);
              upd(
                lockAspect
                  ? { width: w, height: Math.round(w / aspectRef.current) }
                  : { width: w },
              );
            }}
            data-ocid="prop-width"
          />
          <button
            type="button"
            onClick={() => {
              if (!lockAspect)
                aspectRef.current = selectedEl.width / selectedEl.height;
              setLockAspect((v) => !v);
            }}
            title={lockAspect ? "Unlock aspect ratio" : "Lock aspect ratio"}
            data-ocid="prop-aspect-lock"
            className={`mb-0.5 w-6 h-6 flex items-center justify-center rounded-md transition-smooth ${
              lockAspect
                ? "bg-[#0047ab]/30 text-[#0047ab]"
                : "bg-white/5 text-white/30 hover:text-white/60"
            }`}
          >
            {lockAspect ? (
              <Link className="w-3 h-3" />
            ) : (
              <Link2Off className="w-3 h-3" />
            )}
          </button>
          <GlassInput
            label="H"
            id="prop-h"
            value={Math.round(selectedEl.height)}
            onChange={(v) => {
              const h = Math.max(1, +v);
              upd(
                lockAspect
                  ? { width: Math.round(h * aspectRef.current), height: h }
                  : { height: h },
              );
            }}
            data-ocid="prop-height"
          />
        </div>
        <GlassSlider
          label="Rotation"
          value={Math.round(selectedEl.rotation)}
          min={-360}
          max={360}
          unit="°"
          ocid="prop-rotation"
          onChange={(v) => upd({ rotation: v })}
        />
        <GlassSlider
          label="Opacity"
          value={Math.round(selectedEl.opacity * 100)}
          min={0}
          max={100}
          unit="%"
          ocid="prop-opacity"
          onChange={(v) => upd({ opacity: v / 100 })}
        />
      </SectionAccordion>

      {selectedEl.type === "text" && (
        <TextSection el={selectedEl as TextElement} upd={upd} />
      )}
      {isShapeEl(selectedEl) && <FillSection el={selectedEl} upd={upd} />}
      {isShapeEl(selectedEl) && <StrokeSection el={selectedEl} upd={upd} />}
      <ShadowSection el={selectedEl} upd={upd} />

      <SectionAccordion title="Arrange" defaultOpen={false}>
        <div className="grid grid-cols-2 gap-1.5">
          {[
            {
              label: "Front",
              Icon: BringToFront,
              onClick: () => onMoveLayer(selectedId, 1),
              ocid: "prop-move-up",
            },
            {
              label: "Back",
              Icon: SendToBack,
              onClick: () => onMoveLayer(selectedId, -1),
              ocid: "prop-move-down",
            },
            {
              label: "Flip H",
              Icon: FlipHorizontal,
              onClick: () => {},
              ocid: "prop-flip-h",
            },
            {
              label: "Flip V",
              Icon: FlipVertical,
              onClick: () => {},
              ocid: "prop-flip-v",
            },
          ].map(({ label, Icon, onClick, ocid }) => (
            <button
              key={label}
              type="button"
              onClick={onClick}
              data-ocid={ocid}
              className="flex items-center justify-center gap-1.5 h-8 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white/60 hover:text-white text-[10px] font-editor transition-smooth"
            >
              <Icon className="w-3 h-3" /> {label}
            </button>
          ))}
        </div>
      </SectionAccordion>

      <SectionAccordion title="Alignment" defaultOpen={false}>
        <div className="grid grid-cols-3 gap-1.5">
          {ALIGN_TOOLS.map(({ label, icon: Icon, action }) => (
            <button
              key={action}
              type="button"
              title={label}
              data-ocid={`prop-${action}`}
              className="flex items-center justify-center h-8 rounded-lg bg-white/5 border border-white/10 hover:bg-[#0047ab]/20 hover:border-[#0047ab]/40 text-white/50 hover:text-white/90 transition-smooth"
            >
              <Icon className="w-3.5 h-3.5" />
            </button>
          ))}
        </div>
      </SectionAccordion>
    </div>
  );
}

function LayersTab({
  elements,
  selectedIds,
  onSelect,
  onToggleVisible,
  onToggleLock,
  onMoveLayer,
  onDelete,
  onDuplicate,
}: {
  elements: CanvasElement[];
  selectedIds: string[];
  onSelect: (id: string) => void;
  onToggleVisible: (id: string) => void;
  onToggleLock: (id: string) => void;
  onMoveLayer: (id: string, dir: 1 | -1) => void;
  onDelete: (id: string) => void;
  onDuplicate?: (id: string) => void;
}) {
  const [menuId, setMenuId] = useState<string | null>(null);
  const demoLayers = DEMO_LAYER_COMPOSITIONS[0];
  const isEmpty = elements.length === 0;

  function demoLayerIcon(type: "text" | "rect" | "circle" | "image"): {
    symbol: string;
    color: string;
  } {
    switch (type) {
      case "text":
        return { symbol: "T", color: "#a78bfa" };
      case "image":
        return { symbol: "\u29de", color: "#06b6d4" };
      case "circle":
        return { symbol: "\u25cf", color: "#50c878" };
      default:
        return { symbol: "\u25a0", color: "#0047ab" };
    }
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div
        className="flex items-center justify-between px-3 py-2"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-white/40" />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-white/40 font-editor">
            {isEmpty
              ? `${demoLayers.length} Layers`
              : `${elements.length} Layer${elements.length !== 1 ? "s" : ""}`}
          </span>
        </div>
        {isEmpty && (
          <span
            className="text-[8px] font-bold px-1.5 py-0.5 rounded"
            style={{
              background: "oklch(0.38 0.15 270 / 0.2)",
              color: "oklch(0.65 0.15 270)",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Preview
          </span>
        )}
      </div>

      {/* Demo layer preview when canvas is empty */}
      {isEmpty && (
        <div className="py-1">
          <div
            className="mx-3 my-2 px-2.5 py-1.5 rounded-lg text-[9px]"
            style={{
              background: "oklch(0.38 0.15 270 / 0.08)",
              border: "1px solid oklch(0.38 0.15 270 / 0.2)",
              color: "oklch(0.55 0.08 270)",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Add elements to the canvas to see real layers here
          </div>
          {demoLayers.map((layer, i) => {
            const { symbol, color } = demoLayerIcon(layer.type);
            return (
              <div
                key={layer.id}
                className="flex items-center gap-2 px-2.5 py-1.5 opacity-40"
                data-ocid={`demo-layer-item.${i + 1}`}
              >
                <GripVertical className="w-3 h-3 text-white/10 flex-shrink-0" />
                <div
                  className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 text-[10px] font-bold"
                  style={{ background: `${color}30`, color }}
                >
                  {symbol}
                </div>
                <span
                  className="flex-1 truncate text-[11px] font-editor min-w-0"
                  style={{ color: "oklch(0.5 0 0)" }}
                >
                  {layer.name}
                </span>
                <Eye className="w-3 h-3 text-white/20 flex-shrink-0" />
              </div>
            );
          })}
        </div>
      )}

      {/* Real layers */}
      {!isEmpty && (
        <div className="py-1">
          {[...elements].reverse().map((el, i) => {
            const isSelected = selectedIds.includes(el.id);
            const { symbol, color } = layerIcon(el);
            const label = layerLabel(el);
            const originalIdx = elements.length - 1 - i;

            return (
              <div key={el.id} className="relative">
                <button
                  type="button"
                  onClick={() => onSelect(el.id)}
                  data-ocid={`layer-item.${originalIdx + 1}`}
                  className={`group w-full flex items-center gap-2 px-2.5 py-1.5 transition-smooth text-left ${
                    isSelected
                      ? "bg-[#0047ab]/15 border-l-2 border-[#0047ab]"
                      : "hover:bg-white/[0.04] border-l-2 border-transparent"
                  }`}
                >
                  <GripVertical className="w-3 h-3 text-white/15 group-hover:text-white/30 flex-shrink-0 transition-smooth" />
                  <div
                    className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 text-[10px] font-bold"
                    style={{ background: `${color}30`, color }}
                  >
                    {symbol}
                  </div>
                  <span
                    className={`flex-1 truncate text-[11px] font-editor min-w-0 ${
                      isSelected
                        ? "text-white/90"
                        : "text-white/55 group-hover:text-white/80"
                    }`}
                  >
                    {label}
                  </span>
                  <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-smooth">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleVisible(el.id);
                      }}
                      aria-label={el.visible ? "Hide" : "Show"}
                      className="w-5 h-5 flex items-center justify-center rounded hover:bg-white/10 text-white/40 hover:text-white/80 transition-smooth"
                    >
                      {el.visible ? (
                        <Eye className="w-3 h-3" />
                      ) : (
                        <EyeOff className="w-3 h-3" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleLock(el.id);
                      }}
                      aria-label={el.locked ? "Unlock" : "Lock"}
                      className="w-5 h-5 flex items-center justify-center rounded hover:bg-white/10 text-white/40 hover:text-white/80 transition-smooth"
                    >
                      {el.locked ? (
                        <Lock className="w-3 h-3" />
                      ) : (
                        <Unlock className="w-3 h-3" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuId(menuId === el.id ? null : el.id);
                      }}
                      className="w-5 h-5 flex items-center justify-center rounded hover:bg-white/10 text-white/40 hover:text-white/80 transition-smooth"
                    >
                      <MoreHorizontal className="w-3 h-3" />
                    </button>
                  </div>
                </button>

                {menuId === el.id && (
                  <div
                    className="absolute right-2 top-full mt-0.5 z-50 w-36 rounded-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-xl overflow-hidden"
                    style={{ background: "rgba(12,12,20,0.97)" }}
                  >
                    {onDuplicate && (
                      <button
                        type="button"
                        onClick={() => {
                          onDuplicate(el.id);
                          setMenuId(null);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-[11px] font-editor text-white/70 hover:bg-white/8 hover:text-white transition-smooth"
                      >
                        \u29de Duplicate
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        onMoveLayer(el.id, 1);
                        setMenuId(null);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-[11px] font-editor text-white/70 hover:bg-white/8 hover:text-white transition-smooth"
                    >
                      <MoveUp className="w-3 h-3" /> Move Up
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onMoveLayer(el.id, -1);
                        setMenuId(null);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-[11px] font-editor text-white/70 hover:bg-white/8 hover:text-white transition-smooth"
                    >
                      <MoveDown className="w-3 h-3" /> Move Down
                    </button>
                    <div
                      style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        onDelete(el.id);
                        setMenuId(null);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-[11px] font-editor text-red-400/70 hover:bg-red-500/10 hover:text-red-400 transition-smooth"
                    >
                      \u2715 Delete
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const PREMIUM_STUBS = [
  "Luxury Brand Kit",
  "Cinematic Portfolio",
  "Bold Agency",
  "Minimal Startup",
];

function TemplatesTab({
  onApplyTemplate,
}: { onApplyTemplate?: (t: Template) => void }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-3 py-3 space-y-4">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-wider text-white/40 font-editor mb-2">
            All Templates
          </p>
          <div className="grid grid-cols-2 gap-2">
            {TEMPLATES.map((t) => (
              <button
                key={t.id}
                type="button"
                onMouseEnter={() => setHoveredId(t.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => onApplyTemplate?.(t)}
                data-ocid={`template-${t.id}`}
                className={`relative group rounded-xl border overflow-hidden transition-smooth text-left ${
                  hoveredId === t.id
                    ? "border-[#0047ab] shadow-[0_0_12px_rgba(0,71,171,0.4)]"
                    : "border-white/8 hover:border-white/20"
                }`}
                style={{ aspectRatio: "16/9", background: "#0d0d14" }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5 px-2">
                  <div className="w-3/4 h-1.5 rounded bg-white/30" />
                  <div className="w-1/2 h-1 rounded bg-[#50c878]/50" />
                  <div className="w-2/3 h-1 rounded bg-white/15 mt-0.5" />
                </div>
                {hoveredId === t.id && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#0047ab]/20 backdrop-blur-sm">
                    <span className="text-[10px] font-semibold text-white font-editor px-3 py-1.5 rounded-lg bg-[#0047ab] shadow-lg">
                      Apply
                    </span>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 px-2 py-1.5 bg-gradient-to-t from-black/60 to-transparent">
                  <p className="text-[9px] font-semibold text-white/80 font-editor truncate">
                    {t.label}
                  </p>
                  <p className="text-[8px] text-white/40 font-editor">
                    {t.category}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <Crown className="w-3 h-3 text-amber-400" />
            <p className="text-[9px] font-semibold uppercase tracking-wider text-white/40 font-editor">
              Premium Templates
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {PREMIUM_STUBS.map((name) => (
              <div
                key={name}
                className="relative rounded-xl border border-white/5 overflow-hidden opacity-50 cursor-not-allowed"
                style={{ aspectRatio: "16/9", background: "#0d0d14" }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5 px-2">
                  <div className="w-3/4 h-1.5 rounded bg-white/20" />
                  <div className="w-1/2 h-1 rounded bg-white/10" />
                </div>
                <div className="absolute top-1.5 right-1.5">
                  <span className="text-[8px] font-bold text-amber-400 bg-amber-400/10 border border-amber-400/30 px-1.5 py-0.5 rounded-md font-editor">
                    PRO
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 px-2 py-1.5 bg-gradient-to-t from-black/60 to-transparent">
                  <p className="text-[9px] font-semibold text-white/50 font-editor truncate">
                    {name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main RightPanel ──────────────────────────────────────────────────────────

export const RightPanel = memo(function RightPanel({
  elements,
  selectedIds,
  onUpdate,
  onDelete,
  onMoveLayer,
  onToggleVisible,
  onToggleLock,
  onSelect,
  onApplyTemplate,
  onDuplicate,
  activeTab: activeTabProp,
  onTabChange: onTabChangeProp,
}: RightPanelProps) {
  const [localTab, setLocalTab] = useState<Tab>("properties");
  const activeTab = activeTabProp ?? localTab;
  const setTab = (t: Tab) => {
    setLocalTab(t);
    onTabChangeProp?.(t);
  };

  const selectedId = selectedIds[0] ?? null;
  const selectedEl = elements.find((e) => e.id === selectedId) ?? null;

  const upd = useCallback(
    <T extends CanvasElement>(patch: Partial<T>) => {
      if (!selectedId) return;
      onUpdate(selectedId, patch as Partial<CanvasElement>);
    },
    [selectedId, onUpdate],
  );

  const TABS: { id: Tab; label: string }[] = [
    { id: "layers", label: "Layers" },
    { id: "properties", label: "Properties" },
    { id: "templates", label: "Templates" },
  ];

  return (
    <aside
      data-ocid="editor-right-panel"
      className="w-[280px] flex-shrink-0 flex flex-col overflow-hidden font-editor"
      style={{
        background: "rgba(10, 10, 16, 0.88)",
        backdropFilter: "blur(20px) saturate(180%)",
        borderLeft: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "-4px 0 24px rgba(0,0,0,0.4)",
      }}
    >
      {/* Tabs */}
      <div
        className="flex flex-shrink-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        {TABS.map(({ id, label }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              data-ocid={`right-tab-${id}`}
              className="relative flex-1 py-3 text-[11px] font-semibold font-editor transition-smooth"
              style={{
                color: isActive
                  ? "rgba(255,255,255,0.9)"
                  : "rgba(255,255,255,0.35)",
              }}
            >
              {label}
              {isActive && (
                <span
                  className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                  style={{ background: "#0047ab" }}
                />
              )}
            </button>
          );
        })}
      </div>

      {activeTab === "properties" && (
        <PropertiesTab
          selectedEl={selectedEl}
          selectedId={selectedId}
          upd={upd}
          onDelete={onDelete}
          onDuplicate={onDuplicate}
          onMoveLayer={onMoveLayer}
        />
      )}
      {activeTab === "layers" && (
        <LayersTab
          elements={elements}
          selectedIds={selectedIds}
          onSelect={onSelect}
          onToggleVisible={onToggleVisible}
          onToggleLock={onToggleLock}
          onMoveLayer={onMoveLayer}
          onDelete={onDelete}
          onDuplicate={onDuplicate}
        />
      )}
      {activeTab === "templates" && (
        <TemplatesTab onApplyTemplate={onApplyTemplate} />
      )}
    </aside>
  );
});
