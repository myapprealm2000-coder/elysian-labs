import {
  type BlendMode,
  type CanvasElement,
  type ImageCanvasElement,
  type ShapeCanvasElement,
  type TextCanvasElement,
  useAdCreatorStore,
} from "@/store/adCreatorStore";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  ArrowDown,
  ArrowUp,
  BringToFront,
  ChevronDown,
  FlipHorizontal2,
  FlipVertical2,
  Image as ImageIcon,
  Layers,
  Lock,
  Maximize2,
  Minus,
  MoveHorizontal,
  MoveVertical,
  Plus,
  RotateCcw,
  SendToBack,
  Sparkles,
  Square,
  Type,
  Wand2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

// ─── Constants ────────────────────────────────────────────────────────────────

const FONTS = [
  "Inter",
  "Plus Jakarta Sans",
  "Roboto",
  "Montserrat",
  "Oswald",
  "Playfair Display",
  "Space Grotesk",
  "Bebas Neue",
];

const FONT_WEIGHTS = [100, 200, 300, 400, 500, 600, 700, 800, 900];

const BLEND_MODES: BlendMode[] = [
  "normal",
  "multiply",
  "screen",
  "overlay",
  "darken",
  "lighten",
  "color-dodge",
  "color-burn",
  "hard-light",
  "soft-light",
  "difference",
  "exclusion",
];

const PALETTE_SWATCHES = [
  "#2563EB",
  "#22C55E",
  "#ffffff",
  "#000000",
  "#111827",
  "#6366f1",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
  "#14b8a6",
  "#f97316",
];

const SHORTCUTS = [
  { keys: "T", desc: "Add text" },
  { keys: "S", desc: "Add shape" },
  { keys: "Del", desc: "Delete element" },
  { keys: "Ctrl+D", desc: "Duplicate" },
  { keys: "Ctrl+Z", desc: "Undo" },
  { keys: "Ctrl+Shift+Z", desc: "Redo" },
  { keys: "[  ]", desc: "Z-order" },
];

// ─── Shared Primitives ────────────────────────────────────────────────────────

const inputCls =
  "w-full h-7 px-2 rounded border border-border text-xs text-foreground bg-input focus:outline-none focus:border-primary/60 transition-smooth";

const labelCls =
  "text-[10px] font-semibold text-muted-foreground uppercase tracking-wider";

function Row({
  label,
  children,
  className = "",
}: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <span className={labelCls}>{label}</span>
      {children}
    </div>
  );
}

function StyledSlider({
  min,
  max,
  step = 1,
  value,
  onChange,
  accentColor = "#2563EB",
}: {
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (v: number) => void;
  accentColor?: string;
}) {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-1.5 rounded-full cursor-pointer"
      style={{ accentColor }}
    />
  );
}

function ColorSwatch({
  color,
  active,
  onClick,
}: { color: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-6 h-6 rounded-full transition-smooth hover:scale-110 border-2"
      style={{
        background: color,
        borderColor: active ? "#2563EB" : "transparent",
        boxShadow: active ? `0 0 6px ${color}` : "none",
      }}
      aria-label={color}
    />
  );
}

function ColorField({
  value,
  onChange,
  label,
}: { value: string; onChange: (v: string) => void; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          aria-label={label}
        />
        <div
          className="w-7 h-7 rounded-lg border border-border cursor-pointer transition-smooth hover:scale-105"
          style={{ background: value }}
        />
      </div>
      <span className="text-xs font-mono text-muted-foreground flex-1">
        {value}
      </span>
    </div>
  );
}

function SegmentButton({
  options,
  value,
  onChange,
}: {
  options: { label: string; value: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex gap-0.5 p-0.5 rounded-lg bg-muted border border-border">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={[
            "flex-1 py-1 text-[10px] font-semibold rounded-md transition-smooth",
            value === opt.value
              ? "bg-primary/20 text-primary"
              : "text-muted-foreground hover:text-foreground",
          ].join(" ")}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function TabBar({
  tabs,
  active,
  onChange,
}: { tabs: string[]; active: string; onChange: (t: string) => void }) {
  return (
    <div className="flex border-b border-border px-2 pt-1">
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => onChange(tab)}
          className={[
            "px-3 py-2 text-[11px] font-semibold capitalize transition-smooth relative",
            active === tab
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground",
          ].join(" ")}
        >
          {tab}
          {active === tab && (
            <motion.div
              layoutId="tab-underline"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
            />
          )}
        </button>
      ))}
    </div>
  );
}

function CollapsibleSection({
  title,
  defaultOpen = true,
  children,
}: { title: string; defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-t border-border/60 first:border-t-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-3 py-2 hover:bg-muted/30 transition-smooth"
      >
        <span className={labelCls}>{title}</span>
        <motion.div
          animate={{ rotate: open ? 0 : -90 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-3 h-3 text-muted-foreground" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 pt-1 flex flex-col gap-3">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ToggleRow({
  label,
  checked,
  onChange,
  children,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className={labelCls}>{label}</span>
        <button
          type="button"
          onClick={() => onChange(!checked)}
          className={[
            "w-9 h-5 rounded-full transition-smooth relative",
            checked ? "bg-primary" : "bg-muted border border-border",
          ].join(" ")}
          role="switch"
          aria-checked={checked}
        >
          <motion.span
            animate={{ x: checked ? 16 : 2 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="absolute top-0.5 w-4 h-4 bg-foreground rounded-full shadow"
          />
        </button>
      </div>
      <AnimatePresence>
        {checked && children && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden flex flex-col gap-2"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Empty State Panel ────────────────────────────────────────────────────────

function EmptyPanel({
  onAddText,
  onAddShape,
  onAddImage,
  canvasSize,
}: {
  onAddText: () => void;
  onAddShape: () => void;
  onAddImage: () => void;
  canvasSize: { width: number; height: number; name: string };
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-full overflow-y-auto"
    >
      {/* No selection prompt */}
      <div className="flex flex-col items-center justify-center py-8 px-4 border-b border-border/60">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3"
          style={{ background: "oklch(0.14 0.006 240)" }}
        >
          <Layers className="w-5 h-5 text-muted-foreground" />
        </div>
        <p className="text-xs text-muted-foreground text-center leading-relaxed">
          Select an element to edit its properties
        </p>
        <p className="text-[10px] text-muted-foreground/50 mt-1">
          Or add a new element below
        </p>
      </div>

      {/* Quick add */}
      <div className="px-3 py-3 border-b border-border/60">
        <span className={`${labelCls} block mb-2`}>Quick Add</span>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            {
              icon: Type,
              label: "Text",
              action: onAddText,
              ocid: "panel-add-text",
            },
            {
              icon: Square,
              label: "Shape",
              action: onAddShape,
              ocid: "panel-add-shape",
            },
            {
              icon: ImageIcon,
              label: "Image",
              action: onAddImage,
              ocid: "panel-add-image",
            },
          ].map(({ icon: Icon, label, action, ocid }) => (
            <motion.button
              key={label}
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={action}
              data-ocid={ocid}
              className="flex flex-col items-center gap-1.5 py-2.5 px-1 rounded-xl border border-border bg-muted/30 hover:bg-muted/60 hover:border-primary/40 transition-smooth text-muted-foreground hover:text-foreground"
            >
              <Icon className="w-4 h-4" />
              <span className="text-[10px] font-semibold">{label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Canvas info */}
      <div className="px-3 py-3 border-b border-border/60">
        <span className={`${labelCls} block mb-2`}>Canvas</span>
        <div
          className="rounded-lg p-2.5 text-xs"
          style={{ background: "oklch(0.11 0.005 240)" }}
        >
          <div className="grid grid-cols-2 gap-1.5">
            <span className="text-muted-foreground">Format</span>
            <span className="text-foreground font-medium text-right">
              {canvasSize.name}
            </span>
            <span className="text-muted-foreground">Size</span>
            <span className="text-foreground font-mono text-right">
              {canvasSize.width} × {canvasSize.height}
            </span>
          </div>
        </div>
      </div>

      {/* Keyboard shortcuts */}
      <div className="px-3 py-3">
        <span className={`${labelCls} block mb-2`}>Keyboard Shortcuts</span>
        <div className="space-y-1">
          {SHORTCUTS.map((s) => (
            <div key={s.keys} className="flex items-center justify-between">
              <span className="text-[10px] text-muted-foreground">
                {s.desc}
              </span>
              <kbd className="text-[9px] px-1.5 py-0.5 rounded font-mono bg-muted border border-border text-muted-foreground">
                {s.keys}
              </kbd>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Position Tab ─────────────────────────────────────────────────────────────

function PositionTab({ el }: { el: CanvasElement }) {
  const updateElement = useAdCreatorStore((s) => s.updateElement);
  const elements = useAdCreatorStore((s) => s.elements);
  const canvasSize = useAdCreatorStore((s) => s.canvasSize);
  const [lockAspect, setLockAspect] = useState(false);
  const aspectRef = useRef(el.width / el.height);

  const update = useCallback(
    (patch: Partial<CanvasElement>) => updateElement(el.id, patch),
    [el.id, updateElement],
  );

  const handleWidth = (w: number) => {
    if (lockAspect) {
      update({ width: w, height: Math.round(w / aspectRef.current) });
    } else {
      update({ width: w });
    }
  };

  const handleHeight = (h: number) => {
    if (lockAspect) {
      update({ height: h, width: Math.round(h * aspectRef.current) });
    } else {
      update({ height: h });
    }
  };

  // Z-index helpers (position in elements array)
  const idx = elements.findIndex((e) => e.id === el.id);
  const bringToFront = () => {
    const rest = elements.filter((e) => e.id !== el.id);
    useAdCreatorStore.setState({ elements: [...rest, el] });
  };
  const sendToBack = () => {
    const rest = elements.filter((e) => e.id !== el.id);
    useAdCreatorStore.setState({ elements: [el, ...rest] });
  };
  const bringForward = () => {
    if (idx >= elements.length - 1) return;
    const arr = [...elements];
    [arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]];
    useAdCreatorStore.setState({ elements: arr });
  };
  const sendBackward = () => {
    if (idx <= 0) return;
    const arr = [...elements];
    [arr[idx], arr[idx - 1]] = [arr[idx - 1], arr[idx]];
    useAdCreatorStore.setState({ elements: arr });
  };

  return (
    <div className="flex flex-col gap-3 px-3 py-3">
      {/* X / Y */}
      <div className="grid grid-cols-2 gap-2">
        <Row label="X (px)">
          <input
            type="number"
            value={Math.round(el.x)}
            onChange={(e) => update({ x: Number(e.target.value) })}
            className={inputCls}
            data-ocid="pos-x-input"
          />
        </Row>
        <Row label="Y (px)">
          <input
            type="number"
            value={Math.round(el.y)}
            onChange={(e) => update({ y: Number(e.target.value) })}
            className={inputCls}
            data-ocid="pos-y-input"
          />
        </Row>
      </div>

      {/* W / H */}
      <div className="grid grid-cols-2 gap-2">
        <Row label="Width">
          <input
            type="number"
            value={Math.round(el.width)}
            min={4}
            onChange={(e) => handleWidth(Number(e.target.value))}
            className={inputCls}
            data-ocid="pos-width-input"
          />
        </Row>
        <Row label="Height">
          <input
            type="number"
            value={Math.round(el.height)}
            min={4}
            onChange={(e) => handleHeight(Number(e.target.value))}
            className={inputCls}
            data-ocid="pos-height-input"
          />
        </Row>
      </div>

      {/* Lock aspect */}
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={lockAspect}
          onChange={(e) => {
            setLockAspect(e.target.checked);
            aspectRef.current = el.width / el.height;
          }}
          className="sr-only"
          data-ocid="pos-lock-aspect"
        />
        <div
          className={`w-4 h-4 rounded border flex items-center justify-center transition-smooth ${lockAspect ? "bg-primary border-primary" : "border-border"}`}
        >
          {lockAspect && (
            <Lock className="w-2.5 h-2.5 text-primary-foreground" />
          )}
        </div>
        <span className="text-[11px] text-muted-foreground">
          Lock aspect ratio
        </span>
      </label>

      {/* Rotation */}
      <Row label={`Rotation — ${Math.round(el.rotation)}°`}>
        <div className="flex items-center gap-2">
          <StyledSlider
            min={0}
            max={360}
            value={el.rotation}
            onChange={(v) => update({ rotation: v })}
          />
          <input
            type="number"
            min={0}
            max={360}
            value={Math.round(el.rotation)}
            onChange={(e) => update({ rotation: Number(e.target.value) })}
            className="w-14 h-7 px-1 rounded border border-border text-xs text-foreground bg-input text-center focus:outline-none"
            data-ocid="pos-rotation-input"
          />
        </div>
      </Row>

      {/* Center buttons */}
      <div className="grid grid-cols-2 gap-2">
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() =>
            update({ x: Math.round((canvasSize.width - el.width) / 2) })
          }
          className="flex items-center justify-center gap-1.5 h-7 rounded-lg border border-border text-[10px] font-semibold text-muted-foreground hover:text-foreground hover:border-primary/40 transition-smooth"
          data-ocid="pos-center-h"
        >
          <MoveHorizontal className="w-3 h-3" /> Center H
        </motion.button>
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() =>
            update({ y: Math.round((canvasSize.height - el.height) / 2) })
          }
          className="flex items-center justify-center gap-1.5 h-7 rounded-lg border border-border text-[10px] font-semibold text-muted-foreground hover:text-foreground hover:border-primary/40 transition-smooth"
          data-ocid="pos-center-v"
        >
          <MoveVertical className="w-3 h-3" /> Center V
        </motion.button>
      </div>

      {/* Flip */}
      <div className="grid grid-cols-2 gap-2">
        {[
          {
            label: "Flip H",
            icon: FlipHorizontal2,
            ocid: "pos-flip-h",
            action: () => {
              const s = el as ImageCanvasElement;
              updateElement(el.id, {
                scaleX:
                  (s as unknown as { scaleX?: number }).scaleX === -1 ? 1 : -1,
              } as Partial<CanvasElement>);
            },
          },
          {
            label: "Flip V",
            icon: FlipVertical2,
            ocid: "pos-flip-v",
            action: () => {
              const s = el as ImageCanvasElement;
              updateElement(el.id, {
                scaleY:
                  (s as unknown as { scaleY?: number }).scaleY === -1 ? 1 : -1,
              } as Partial<CanvasElement>);
            },
          },
        ].map(({ label, icon: Icon, ocid, action }) => (
          <motion.button
            key={label}
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={action}
            className="flex items-center justify-center gap-1.5 h-7 rounded-lg border border-border text-[10px] font-semibold text-muted-foreground hover:text-foreground hover:border-primary/40 transition-smooth"
            data-ocid={ocid}
          >
            <Icon className="w-3 h-3" /> {label}
          </motion.button>
        ))}
      </div>

      {/* Z-order */}
      <Row label="Layer Order">
        <div className="grid grid-cols-4 gap-1">
          {[
            {
              label: "Front",
              icon: BringToFront,
              action: bringToFront,
              ocid: "pos-bring-front",
            },
            {
              label: "Fwd",
              icon: ArrowUp,
              action: bringForward,
              ocid: "pos-bring-fwd",
            },
            {
              label: "Bwd",
              icon: ArrowDown,
              action: sendBackward,
              ocid: "pos-send-bwd",
            },
            {
              label: "Back",
              icon: SendToBack,
              action: sendToBack,
              ocid: "pos-send-back",
            },
          ].map(({ label, icon: Icon, action, ocid }) => (
            <motion.button
              key={label}
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={action}
              className="flex flex-col items-center gap-1 py-1.5 rounded-lg border border-border text-[9px] font-semibold text-muted-foreground hover:text-foreground hover:border-primary/40 transition-smooth"
              data-ocid={ocid}
            >
              <Icon className="w-3 h-3" />
              {label}
            </motion.button>
          ))}
        </div>
      </Row>
    </div>
  );
}

// ─── Shadow controls (shared) ─────────────────────────────────────────────────

type ShadowCfg = {
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
} | null;
function ShadowControls({
  shadow,
  onChange,
}: { shadow: ShadowCfg; onChange: (s: ShadowCfg) => void }) {
  const on = shadow !== null;
  const s = shadow ?? { x: 0, y: 4, blur: 12, spread: 0, color: "#000000" };
  return (
    <ToggleRow
      label="Shadow"
      checked={on}
      onChange={(v) => onChange(v ? s : null)}
    >
      <div className="grid grid-cols-2 gap-2">
        {(["x", "y", "blur", "spread"] as const).map((key) => (
          <Row
            key={key}
            label={
              key === "x"
                ? "X Offset"
                : key === "y"
                  ? "Y Offset"
                  : key === "blur"
                    ? "Blur"
                    : "Spread"
            }
          >
            <input
              type="number"
              value={s[key]}
              onChange={(e) =>
                onChange({ ...s, [key]: Number(e.target.value) })
              }
              className={inputCls}
            />
          </Row>
        ))}
      </div>
      <Row label="Color">
        <ColorField
          value={s.color}
          onChange={(c) => onChange({ ...s, color: c })}
          label="Shadow color"
        />
      </Row>
    </ToggleRow>
  );
}

// ─── Text Properties ──────────────────────────────────────────────────────────

function TextStyleTab({ el }: { el: TextCanvasElement }) {
  const update = (patch: Partial<TextCanvasElement>) =>
    useAdCreatorStore
      .getState()
      .updateElement(el.id, patch as Partial<CanvasElement>);

  const alignIcons = [
    { value: "left" as const, icon: AlignLeft },
    { value: "center" as const, icon: AlignCenter },
    { value: "right" as const, icon: AlignRight },
    { value: "justify" as const, icon: AlignJustify },
  ];

  return (
    <div className="flex flex-col overflow-y-auto" data-ocid="text-style-tab">
      <CollapsibleSection title="Typography">
        <Row label="Font Family">
          <select
            value={el.fontFamily}
            onChange={(e) => update({ fontFamily: e.target.value })}
            className={inputCls}
            data-ocid="text-font-family"
          >
            {FONTS.map((f) => (
              <option key={f} value={f} style={{ fontFamily: f }}>
                {f}
              </option>
            ))}
          </select>
        </Row>

        <Row label={`Font Size — ${el.fontSize}px`}>
          <div className="flex items-center gap-2">
            <StyledSlider
              min={8}
              max={200}
              value={el.fontSize}
              onChange={(v) => update({ fontSize: v })}
            />
            <input
              type="number"
              min={8}
              max={200}
              value={el.fontSize}
              onChange={(e) => update({ fontSize: Number(e.target.value) })}
              className="w-14 h-7 px-1 rounded border border-border text-xs text-foreground bg-input text-center focus:outline-none"
              data-ocid="text-font-size"
            />
          </div>
        </Row>

        <Row label="Font Weight">
          <div className="flex gap-0.5 flex-wrap">
            {FONT_WEIGHTS.map((w) => (
              <button
                key={w}
                type="button"
                onClick={() => update({ fontWeight: String(w) })}
                className={[
                  "px-1.5 py-1 rounded text-[9px] font-bold transition-smooth border",
                  el.fontWeight === String(w)
                    ? "bg-primary/20 text-primary border-primary/50"
                    : "border-border text-muted-foreground hover:text-foreground bg-muted",
                ].join(" ")}
                data-ocid={`text-weight-${w}`}
              >
                {w}
              </button>
            ))}
          </div>
        </Row>

        <Row label="Alignment">
          <div className="flex gap-1">
            {alignIcons.map(({ value, icon: Icon }) => (
              <button
                key={value}
                type="button"
                onClick={() => update({ textAlign: value })}
                className={[
                  "flex-1 h-8 flex items-center justify-center rounded transition-smooth border",
                  el.textAlign === value
                    ? "bg-primary/20 text-primary border-primary/50"
                    : "border-border text-muted-foreground hover:text-foreground bg-muted",
                ].join(" ")}
                aria-label={`Align ${value}`}
                data-ocid={`text-align-${value}`}
              >
                <Icon className="w-3.5 h-3.5" />
              </button>
            ))}
          </div>
        </Row>

        <Row label={`Line Height — ${el.lineHeight.toFixed(1)}`}>
          <StyledSlider
            min={0.8}
            max={3.0}
            step={0.1}
            value={el.lineHeight}
            onChange={(v) => update({ lineHeight: v })}
          />
        </Row>

        <Row label={`Letter Spacing — ${el.letterSpacing}px`}>
          <StyledSlider
            min={-5}
            max={20}
            step={0.5}
            value={el.letterSpacing}
            onChange={(v) => update({ letterSpacing: v })}
          />
        </Row>
      </CollapsibleSection>

      <CollapsibleSection title="Color">
        <ColorField
          value={el.color}
          onChange={(c) => update({ color: c })}
          label="Text color"
        />
        <div className="flex flex-wrap gap-1.5">
          {PALETTE_SWATCHES.map((sw) => (
            <ColorSwatch
              key={sw}
              color={sw}
              active={el.color === sw}
              onClick={() => update({ color: sw })}
            />
          ))}
        </div>

        <ToggleRow
          label="Gradient"
          checked={el.gradient}
          onChange={(v) => update({ gradient: v })}
        >
          <SegmentButton
            options={[
              { label: "Linear", value: "linear" },
              { label: "Radial", value: "radial" },
            ]}
            value="linear"
            onChange={() => {}}
          />
          <div className="flex items-center gap-2">
            <Row label="Stop 1">
              <ColorField
                value={el.gradientColors[0] ?? "#ffffff"}
                onChange={(c) => {
                  const cols = [...el.gradientColors];
                  cols[0] = c;
                  update({ gradientColors: cols });
                }}
                label="Gradient stop 1"
              />
            </Row>
            <Row label="Stop 2">
              <ColorField
                value={el.gradientColors[1] ?? "#2563EB"}
                onChange={(c) => {
                  const cols = [...el.gradientColors];
                  cols[1] = c;
                  update({ gradientColors: cols });
                }}
                label="Gradient stop 2"
              />
            </Row>
          </div>
        </ToggleRow>
      </CollapsibleSection>

      <CollapsibleSection title="Effects" defaultOpen={false}>
        <ShadowControls
          shadow={el.shadow}
          onChange={(s) => update({ shadow: s })}
        />

        <ToggleRow
          label="Glow"
          checked={el.glow !== null}
          onChange={(v) =>
            update({ glow: v ? { color: "#2563EB", intensity: 0.5 } : null })
          }
        >
          {el.glow && (
            <>
              <Row label="Color">
                <ColorField
                  value={el.glow.color}
                  onChange={(c) => update({ glow: { ...el.glow!, color: c } })}
                  label="Glow color"
                />
              </Row>
              <Row
                label={`Intensity — ${Math.round(el.glow.intensity * 100)}%`}
              >
                <StyledSlider
                  min={0}
                  max={1}
                  step={0.05}
                  value={el.glow.intensity}
                  onChange={(v) =>
                    update({ glow: { ...el.glow!, intensity: v } })
                  }
                  accentColor="#22C55E"
                />
              </Row>
            </>
          )}
        </ToggleRow>

        <ToggleRow
          label="Outline"
          checked={el.outline !== null}
          onChange={(v) =>
            update({ outline: v ? { color: "#ffffff", width: 2 } : null })
          }
        >
          {el.outline && (
            <>
              <Row label={`Width — ${el.outline.width}px`}>
                <StyledSlider
                  min={0}
                  max={20}
                  value={el.outline.width}
                  onChange={(v) =>
                    update({ outline: { ...el.outline!, width: v } })
                  }
                />
              </Row>
              <Row label="Color">
                <ColorField
                  value={el.outline.color}
                  onChange={(c) =>
                    update({ outline: { ...el.outline!, color: c } })
                  }
                  label="Outline color"
                />
              </Row>
            </>
          )}
        </ToggleRow>
      </CollapsibleSection>

      <CollapsibleSection title="Appearance" defaultOpen={false}>
        <Row label={`Opacity — ${Math.round(el.opacity * 100)}%`}>
          <StyledSlider
            min={0}
            max={1}
            step={0.01}
            value={el.opacity}
            onChange={(v) => update({ opacity: v })}
          />
        </Row>
        <Row label="Blend Mode">
          <select
            value={el.blendMode}
            onChange={(e) => update({ blendMode: e.target.value as BlendMode })}
            className={inputCls}
            data-ocid="text-blend-mode"
          >
            {BLEND_MODES.map((m) => (
              <option key={m} value={m} className="capitalize">
                {m.replace("-", " ")}
              </option>
            ))}
          </select>
        </Row>
      </CollapsibleSection>
    </div>
  );
}

function TextAnimateTab({ el }: { el: TextCanvasElement }) {
  const update = (patch: Partial<TextCanvasElement>) =>
    useAdCreatorStore
      .getState()
      .updateElement(el.id, patch as Partial<CanvasElement>);

  const ANIMATION_TYPES = [
    "fade",
    "slide",
    "zoom",
    "bounce",
    "cinematic",
    "typewriter",
    "blurReveal",
  ] as const;

  const current = el.animation;

  return (
    <div className="flex flex-col px-3 py-3 gap-3" data-ocid="text-animate-tab">
      <span className={labelCls}>Animation Preset</span>
      <div className="grid grid-cols-2 gap-1.5">
        {ANIMATION_TYPES.map((type) => (
          <motion.button
            key={type}
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() =>
              update({
                animation:
                  current?.type === type
                    ? null
                    : { type, duration: 0.5, delay: 0, easing: "ease-out" },
              })
            }
            className={[
              "py-2 px-2 rounded-xl border text-[10px] font-semibold capitalize transition-smooth",
              current?.type === type
                ? "border-primary/60 bg-primary/20 text-primary"
                : "border-border text-muted-foreground hover:border-border/80 hover:text-foreground bg-muted/30",
            ].join(" ")}
            data-ocid={`text-anim-${type}`}
          >
            {type}
          </motion.button>
        ))}
      </div>
      {current && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col gap-3"
        >
          <Row label={`Duration — ${current.duration.toFixed(1)}s`}>
            <StyledSlider
              min={0.1}
              max={3}
              step={0.1}
              value={current.duration}
              onChange={(v) =>
                update({ animation: { ...current, duration: v } })
              }
            />
          </Row>
          <Row label={`Delay — ${current.delay.toFixed(1)}s`}>
            <StyledSlider
              min={0}
              max={3}
              step={0.1}
              value={current.delay}
              onChange={(v) => update({ animation: { ...current, delay: v } })}
            />
          </Row>
        </motion.div>
      )}
    </div>
  );
}

// ─── Image Properties ─────────────────────────────────────────────────────────

function ImageAdjustTab({ el }: { el: ImageCanvasElement }) {
  const update = (patch: Partial<ImageCanvasElement>) =>
    useAdCreatorStore
      .getState()
      .updateElement(el.id, patch as Partial<CanvasElement>);

  const f = el.filters;
  const resetFilters = () =>
    update({
      filters: {
        brightness: 100,
        contrast: 100,
        saturation: 100,
        blur: 0,
        hue: 0,
      },
    });

  const filterSliders = [
    {
      key: "brightness" as const,
      label: "Brightness",
      min: 0,
      max: 200,
      default: 100,
    },
    {
      key: "contrast" as const,
      label: "Contrast",
      min: 0,
      max: 200,
      default: 100,
    },
    {
      key: "saturation" as const,
      label: "Saturation",
      min: 0,
      max: 200,
      default: 100,
    },
    { key: "hue" as const, label: "Hue Rotate", min: 0, max: 360, default: 0 },
    {
      key: "blur" as const,
      label: "Blur",
      min: 0,
      max: 20,
      default: 0,
      step: 0.5,
    },
  ];

  return (
    <div className="flex flex-col px-3 py-3 gap-3" data-ocid="image-adjust-tab">
      {filterSliders.map(({ key, label, min, max, default: def, step }) => (
        <Row
          key={key}
          label={`${label} — ${f[key]}${key === "blur" ? "px" : key === "hue" ? "°" : "%"}`}
        >
          <StyledSlider
            min={min}
            max={max}
            step={step ?? 1}
            value={f[key]}
            onChange={(v) => update({ filters: { ...f, [key]: v } })}
            accentColor={f[key] !== def ? "#2563EB" : "#374151"}
          />
        </Row>
      ))}
      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={resetFilters}
        className="flex items-center justify-center gap-2 h-8 rounded-xl border border-border text-xs font-semibold text-muted-foreground hover:text-foreground hover:border-primary/40 transition-smooth mt-1"
        data-ocid="image-reset-filters"
      >
        <RotateCcw className="w-3.5 h-3.5" /> Reset Filters
      </motion.button>
    </div>
  );
}

function ImageEffectsTab({ el }: { el: ImageCanvasElement }) {
  const update = (patch: Partial<ImageCanvasElement>) =>
    useAdCreatorStore
      .getState()
      .updateElement(el.id, patch as Partial<CanvasElement>);

  const [removing, setRemoving] = useState(false);
  const [enhancing, setEnhancing] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleRemoveBg = async () => {
    if (!el.src) {
      toast.error("Please select an image first.");
      return;
    }
    setRemoving(true);
    console.log("[RemoveBG] Selected element:", el);
    try {
      // Load the image onto an offscreen canvas
      const img = new Image();
      img.crossOrigin = "anonymous";
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Image load failed"));
        img.src = el.src;
      });

      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas context unavailable");

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const w = canvas.width;
      const h = canvas.height;

      // Sample background color from 4 corners (5x5 average)
      function sampleCorner(cx: number, cy: number): [number, number, number] {
        let r = 0;
        let g = 0;
        let b = 0;
        let count = 0;
        for (let dy = 0; dy < 5; dy++) {
          for (let dx = 0; dx < 5; dx++) {
            const px = Math.min(cx + dx, w - 1);
            const py = Math.min(cy + dy, h - 1);
            const i = (py * w + px) * 4;
            r += data[i];
            g += data[i + 1];
            b += data[i + 2];
            count++;
          }
        }
        return [r / count, g / count, b / count];
      }

      const corners = [
        sampleCorner(0, 0),
        sampleCorner(w - 5, 0),
        sampleCorner(0, h - 5),
        sampleCorner(w - 5, h - 5),
      ];
      const bgR = corners.reduce((s, c) => s + c[0], 0) / 4;
      const bgG = corners.reduce((s, c) => s + c[1], 0) / 4;
      const bgB = corners.reduce((s, c) => s + c[2], 0) / 4;
      console.log("[RemoveBG] Detected background color:", bgR, bgG, bgB);

      // Flood-fill from all 4 corners: mark pixels within color distance 60 as transparent
      const tolerance = 60;
      const visited = new Uint8Array(w * h);
      const queue: number[] = [];

      function colorDist(i: number): number {
        const dr = data[i] - bgR;
        const dg = data[i + 1] - bgG;
        const db = data[i + 2] - bgB;
        return Math.sqrt(dr * dr + dg * dg + db * db);
      }

      function enqueue(x: number, y: number) {
        if (x < 0 || x >= w || y < 0 || y >= h) return;
        const idx = y * w + x;
        if (visited[idx]) return;
        visited[idx] = 1;
        if (colorDist(idx * 4) < tolerance) queue.push(idx);
      }

      // Seed from all 4 corners
      enqueue(0, 0);
      enqueue(w - 1, 0);
      enqueue(0, h - 1);
      enqueue(w - 1, h - 1);

      while (queue.length > 0) {
        const idx = queue.pop()!;
        data[idx * 4 + 3] = 0; // set alpha to 0
        const x = idx % w;
        const y = Math.floor(idx / w);
        enqueue(x + 1, y);
        enqueue(x - 1, y);
        enqueue(x, y + 1);
        enqueue(x, y - 1);
      }

      // Feathering pass: pixels with alpha > 0 adjacent to alpha=0 → partial alpha
      for (let y = 1; y < h - 1; y++) {
        for (let x = 1; x < w - 1; x++) {
          const i = y * w + x;
          if (data[i * 4 + 3] === 0) continue;
          const neighbors = [
            data[((y - 1) * w + x) * 4 + 3],
            data[((y + 1) * w + x) * 4 + 3],
            data[(y * w + (x - 1)) * 4 + 3],
            data[(y * w + (x + 1)) * 4 + 3],
          ];
          const hasTransparentNeighbor = neighbors.some((a) => a === 0);
          if (hasTransparentNeighbor) {
            data[i * 4 + 3] = 128;
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);

      // Export as transparent PNG
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/png"),
      );
      if (!blob) throw new Error("PNG export failed");

      const url = URL.createObjectURL(blob);
      console.log("[RemoveBG] Generated transparent PNG URL:", url);

      update({
        src: url,
        backgroundRemoved: true,
        // Reset any old fake-filter artifacts
        filters: { ...el.filters, contrast: 100, saturation: 100 },
      });

      toast.success("Background removed successfully.");
    } catch (err) {
      console.error("[RemoveBG] Error:", err);
      toast.error("Background removal failed. Try another image.");
    } finally {
      setRemoving(false);
    }
  };

  const handleEnhance = async () => {
    setEnhancing(true);
    await new Promise((r) => setTimeout(r, 1500));
    update({
      filters: {
        ...el.filters,
        brightness: Math.min(el.filters.brightness + 10, 200),
        contrast: Math.min(el.filters.contrast + 15, 200),
        saturation: Math.min(el.filters.saturation + 10, 200),
      },
    });
    setEnhancing(false);
  };

  const handleReplace = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    update({ src: url });
  };

  const MASK_SHAPES = ["circle", "rectangle", "star"] as const;

  return (
    <div
      className="flex flex-col px-3 py-3 gap-3"
      data-ocid="image-effects-tab"
    >
      <ShadowControls
        shadow={el.shadow}
        onChange={(s) => update({ shadow: s })}
      />

      {/* Remove Background */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleRemoveBg}
        disabled={removing}
        className="flex items-center justify-center gap-2 h-10 rounded-xl border border-border text-xs font-semibold transition-smooth hover:border-primary/40 relative overflow-hidden"
        style={{ background: removing ? "oklch(0.14 0.006 240)" : undefined }}
        data-ocid="image-remove-bg"
      >
        {removing ? (
          <>
            <motion.div
              className="absolute inset-0 bg-primary/10"
              animate={{ x: ["-100%", "100%"] }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 1.2,
                ease: "linear",
              }}
            />
            <Wand2 className="w-4 h-4 text-primary animate-spin" />
            <span className="text-primary">Removing Background…</span>
          </>
        ) : (
          <>
            <Wand2 className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              Remove Background (AI)
            </span>
          </>
        )}
      </motion.button>

      {/* AI Enhance */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleEnhance}
        disabled={enhancing}
        className="flex items-center justify-center gap-2 h-10 rounded-xl border border-border text-xs font-semibold transition-smooth hover:border-accent/40 relative overflow-hidden"
        data-ocid="image-ai-enhance"
      >
        {enhancing ? (
          <>
            <motion.div
              className="absolute inset-0 bg-accent/10"
              animate={{ x: ["-100%", "100%"] }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 1.0,
                ease: "linear",
              }}
            />
            <Sparkles className="w-4 h-4 text-accent animate-pulse" />
            <span className="text-accent">Enhancing…</span>
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Enhance Image Quality</span>
          </>
        )}
      </motion.button>

      {/* Replace Image */}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleReplace}
        className="hidden"
      />
      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => fileRef.current?.click()}
        className="flex items-center justify-center gap-2 h-10 rounded-xl border border-border text-xs font-semibold text-muted-foreground hover:text-foreground hover:border-border/80 transition-smooth"
        data-ocid="image-replace"
      >
        <ImageIcon className="w-4 h-4" /> Replace Image
      </motion.button>

      {/* Mask shape */}
      <CollapsibleSection title="Mask Shape" defaultOpen={false}>
        <div className="grid grid-cols-3 gap-1.5">
          {MASK_SHAPES.map((shape) => (
            <motion.button
              key={shape}
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => update({ mask: el.mask === shape ? null : shape })}
              className={[
                "py-2 rounded-xl border text-[10px] font-semibold capitalize transition-smooth",
                el.mask === shape
                  ? "border-primary/60 bg-primary/20 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground bg-muted/30",
              ].join(" ")}
              data-ocid={`image-mask-${shape}`}
            >
              {shape}
            </motion.button>
          ))}
        </div>
      </CollapsibleSection>
    </div>
  );
}

// ─── Shape Properties ─────────────────────────────────────────────────────────

function ShapeFillTab({ el }: { el: ShapeCanvasElement }) {
  const update = (patch: Partial<ShapeCanvasElement>) =>
    useAdCreatorStore
      .getState()
      .updateElement(el.id, patch as Partial<CanvasElement>);

  const fillType = el.gradient
    ? "gradient"
    : el.fill === "none"
      ? "none"
      : "solid";

  const [gradAngle, setGradAngle] = useState(135);
  const [gradStops, setGradStops] = useState(["#2563EB", "#22C55E"]);

  const applyGradient = (angle: number, stops: string[]) => {
    update({ gradient: `linear-gradient(${angle}deg, ${stops.join(", ")})` });
  };

  return (
    <div className="flex flex-col overflow-y-auto" data-ocid="shape-fill-tab">
      <CollapsibleSection title="Fill">
        <SegmentButton
          options={[
            { label: "Solid", value: "solid" },
            { label: "Gradient", value: "gradient" },
            { label: "None", value: "none" },
          ]}
          value={fillType}
          onChange={(v) => {
            if (v === "solid")
              update({ fill: el.fill || "#2563EB", gradient: null });
            else if (v === "gradient") {
              update({
                fill: "transparent",
                gradient: `linear-gradient(${gradAngle}deg, ${gradStops.join(", ")})`,
              });
            } else update({ fill: "none", gradient: null });
          }}
        />

        {fillType === "solid" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-2"
          >
            <ColorField
              value={el.fill}
              onChange={(c) => update({ fill: c })}
              label="Fill color"
            />
            <div className="flex flex-wrap gap-1.5">
              {PALETTE_SWATCHES.map((sw) => (
                <ColorSwatch
                  key={sw}
                  color={sw}
                  active={el.fill === sw}
                  onClick={() => update({ fill: sw })}
                />
              ))}
            </div>
          </motion.div>
        )}

        {fillType === "gradient" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-2"
          >
            <Row label={`Angle — ${gradAngle}°`}>
              <StyledSlider
                min={0}
                max={360}
                value={gradAngle}
                onChange={(v) => {
                  setGradAngle(v);
                  applyGradient(v, gradStops);
                }}
              />
            </Row>
            <div className="grid grid-cols-2 gap-2">
              <Row label="Stop 1">
                <ColorField
                  value={gradStops[0]}
                  onChange={(c) => {
                    const s = [c, gradStops[1]];
                    setGradStops(s);
                    applyGradient(gradAngle, s);
                  }}
                  label="Gradient stop 1"
                />
              </Row>
              <Row label="Stop 2">
                <ColorField
                  value={gradStops[1]}
                  onChange={(c) => {
                    const s = [gradStops[0], c];
                    setGradStops(s);
                    applyGradient(gradAngle, s);
                  }}
                  label="Gradient stop 2"
                />
              </Row>
            </div>
          </motion.div>
        )}
      </CollapsibleSection>

      {el.shapeType === "rect" && (
        <CollapsibleSection title="Shape">
          <Row label={`Corner Radius — ${el.cornerRadius}px`}>
            <StyledSlider
              min={0}
              max={100}
              value={el.cornerRadius}
              onChange={(v) => update({ cornerRadius: v })}
            />
          </Row>
        </CollapsibleSection>
      )}

      <CollapsibleSection title="Effects" defaultOpen={false}>
        <ShadowControls
          shadow={el.shadow}
          onChange={(s) => update({ shadow: s })}
        />

        <ToggleRow
          label="Glow"
          checked={el.glow !== null}
          onChange={(v) =>
            update({ glow: v ? { color: "#2563EB", intensity: 0.5 } : null })
          }
        >
          {el.glow && (
            <>
              <Row label="Color">
                <ColorField
                  value={el.glow.color}
                  onChange={(c) => update({ glow: { ...el.glow!, color: c } })}
                  label="Glow color"
                />
              </Row>
              <Row
                label={`Intensity — ${Math.round(el.glow.intensity * 100)}%`}
              >
                <StyledSlider
                  min={0}
                  max={1}
                  step={0.05}
                  value={el.glow.intensity}
                  onChange={(v) =>
                    update({ glow: { ...el.glow!, intensity: v } })
                  }
                  accentColor="#22C55E"
                />
              </Row>
            </>
          )}
        </ToggleRow>
      </CollapsibleSection>

      <CollapsibleSection title="Appearance" defaultOpen={false}>
        <Row label={`Opacity — ${Math.round(el.opacity * 100)}%`}>
          <StyledSlider
            min={0}
            max={1}
            step={0.01}
            value={el.opacity}
            onChange={(v) => update({ opacity: v })}
          />
        </Row>
      </CollapsibleSection>
    </div>
  );
}

function ShapeStrokeTab({ el }: { el: ShapeCanvasElement }) {
  const update = (patch: Partial<ShapeCanvasElement>) =>
    useAdCreatorStore
      .getState()
      .updateElement(el.id, patch as Partial<CanvasElement>);

  const hasStroke = el.strokeWidth > 0;

  return (
    <div className="flex flex-col px-3 py-3 gap-3" data-ocid="shape-stroke-tab">
      <ToggleRow
        label="Stroke"
        checked={hasStroke}
        onChange={(v) => update({ strokeWidth: v ? 2 : 0 })}
      >
        <Row label={`Width — ${el.strokeWidth}px`}>
          <StyledSlider
            min={0}
            max={20}
            value={el.strokeWidth}
            onChange={(v) => update({ strokeWidth: v })}
          />
        </Row>
        <Row label="Color">
          <ColorField
            value={el.stroke || "#ffffff"}
            onChange={(c) => update({ stroke: c })}
            label="Stroke color"
          />
        </Row>
        <Row label="Type">
          <SegmentButton
            options={[
              { label: "Solid", value: "solid" },
              { label: "Dashed", value: "dashed" },
              { label: "Dotted", value: "dotted" },
            ]}
            value={
              el.strokeDash.length === 0
                ? "solid"
                : el.strokeDash[0] === 2
                  ? "dotted"
                  : "dashed"
            }
            onChange={(v) => {
              if (v === "solid") update({ strokeDash: [] });
              else if (v === "dashed") update({ strokeDash: [8, 4] });
              else update({ strokeDash: [2, 4] });
            }}
          />
        </Row>
        {el.strokeDash.length > 0 && el.strokeDash[0] !== 2 && (
          <Row label="Dash Length">
            <StyledSlider
              min={2}
              max={32}
              value={el.strokeDash[0] ?? 8}
              onChange={(v) =>
                update({ strokeDash: [v, el.strokeDash[1] ?? 4] })
              }
            />
          </Row>
        )}
      </ToggleRow>
    </div>
  );
}

// ─── Main Panel ───────────────────────────────────────────────────────────────

export function AdPropertiesPanel() {
  const elements = useAdCreatorStore((s) => s.elements);
  const selectedIds = useAdCreatorStore((s) => s.selectedIds);
  const canvasSize = useAdCreatorStore((s) => s.canvasSize);
  const addElement = useAdCreatorStore((s) => s.addElement);
  const setRightPanelTab = useAdCreatorStore((s) => s.setRightPanelTab);
  const rightPanelTab = useAdCreatorStore((s) => s.rightPanelTab);

  const selectedEl = useMemo(
    () =>
      selectedIds.length === 1
        ? (elements.find((e) => e.id === selectedIds[0]) ?? null)
        : null,
    [elements, selectedIds],
  );

  // Determine which tabs to show for the selected element
  const getTabs = (el: CanvasElement | null): string[] => {
    if (!el) return [];
    if (el.type === "text") return ["Style", "Animate", "Position"];
    if (el.type === "image") return ["Adjust", "Effects", "Position"];
    if (el.type === "shape") return ["Fill", "Stroke", "Position"];
    return ["Position"];
  };

  const tabs = getTabs(selectedEl);
  const activeTab = tabs.includes(rightPanelTab)
    ? rightPanelTab
    : (tabs[0] ?? "");

  // Auto-switch tab when element type changes — use stable deps to avoid infinite re-render loop
  const prevTypeRef = useRef<string | null>(null);
  const elType = selectedEl?.type ?? null;
  // Derive firstTab outside effect so effect dep is a primitive
  const firstTab = tabs[0] ?? "";
  useEffect(() => {
    if (elType !== prevTypeRef.current) {
      prevTypeRef.current = elType;
      // Switch to first tab only if current tab isn't valid for new type
      if (firstTab && rightPanelTab !== firstTab) {
        setRightPanelTab(firstTab);
      }
    }
  }, [elType, firstTab, rightPanelTab, setRightPanelTab]);

  const handleAddText = useCallback(() => {
    addElement({
      type: "text",
      name: "Text",
      x: 100,
      y: 100,
      width: 300,
      height: 60,
      rotation: 0,
      opacity: 1,
      locked: false,
      visible: true,
      content: "New Text",
      fontFamily: "Inter",
      fontSize: 48,
      fontWeight: "700",
      color: "#ffffff",
      textAlign: "left",
      lineHeight: 1.2,
      letterSpacing: 0,
      gradient: false,
      gradientColors: ["#ffffff", "#2563EB"],
      shadow: null,
      glow: null,
      outline: null,
      animation: null,
      blendMode: "normal",
    } as Omit<CanvasElement, "id">);
  }, [addElement]);

  const handleAddShape = useCallback(() => {
    addElement({
      type: "shape",
      name: "Shape",
      x: 200,
      y: 200,
      width: 200,
      height: 200,
      rotation: 0,
      opacity: 1,
      locked: false,
      visible: true,
      shapeType: "rect",
      fill: "#2563EB",
      gradient: null,
      stroke: "transparent",
      strokeWidth: 0,
      strokeDash: [],
      glow: null,
      shadow: null,
      cornerRadius: 12,
    } as Omit<CanvasElement, "id">);
  }, [addElement]);

  const handleAddImage = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const url = URL.createObjectURL(file);
      addElement({
        type: "image",
        name: "Image",
        x: 100,
        y: 100,
        width: 400,
        height: 300,
        rotation: 0,
        opacity: 1,
        locked: false,
        visible: true,
        src: url,
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
      } as Omit<CanvasElement, "id">);
    };
  }, [addElement]);

  return (
    <div
      className="w-[320px] flex-shrink-0 flex flex-col h-full border-l border-border relative"
      style={{
        background: "oklch(0.105 0.006 240)",
        boxShadow: "var(--shadow-glass-md)",
      }}
      data-ocid="ad-properties-panel"
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-3 py-2.5 border-b border-border"
        style={{ background: "oklch(0.11 0.006 240)" }}
      >
        <span className="text-xs font-bold text-foreground tracking-wide">
          {selectedEl
            ? selectedEl.type === "text"
              ? "Text Properties"
              : selectedEl.type === "image"
                ? "Image Properties"
                : selectedEl.type === "shape"
                  ? "Shape Properties"
                  : "Properties"
            : "Properties"}
        </span>
        {selectedEl && (
          <span className="text-[10px] px-2 py-0.5 rounded-full border border-border text-muted-foreground">
            {selectedEl.name}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex-1 overflow-hidden flex flex-col min-h-0">
        <AnimatePresence mode="wait">
          {!selectedEl ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex-1 overflow-y-auto"
            >
              <EmptyPanel
                onAddText={handleAddText}
                onAddShape={handleAddShape}
                onAddImage={handleAddImage}
                canvasSize={canvasSize}
              />
            </motion.div>
          ) : (
            <motion.div
              key={selectedEl.type}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex-1 flex flex-col min-h-0"
            >
              {tabs.length > 1 && (
                <TabBar
                  tabs={tabs}
                  active={activeTab}
                  onChange={setRightPanelTab}
                />
              )}
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab + selectedEl.id}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.18 }}
                  >
                    {selectedEl.type === "text" && (
                      <>
                        {activeTab === "Style" && (
                          <TextStyleTab el={selectedEl as TextCanvasElement} />
                        )}
                        {activeTab === "Animate" && (
                          <TextAnimateTab
                            el={selectedEl as TextCanvasElement}
                          />
                        )}
                        {activeTab === "Position" && (
                          <PositionTab el={selectedEl} />
                        )}
                      </>
                    )}
                    {selectedEl.type === "image" && (
                      <>
                        {activeTab === "Adjust" && (
                          <ImageAdjustTab
                            el={selectedEl as ImageCanvasElement}
                          />
                        )}
                        {activeTab === "Effects" && (
                          <ImageEffectsTab
                            el={selectedEl as ImageCanvasElement}
                          />
                        )}
                        {activeTab === "Position" && (
                          <PositionTab el={selectedEl} />
                        )}
                      </>
                    )}
                    {selectedEl.type === "shape" && (
                      <>
                        {activeTab === "Fill" && (
                          <ShapeFillTab el={selectedEl as ShapeCanvasElement} />
                        )}
                        {activeTab === "Stroke" && (
                          <ShapeStrokeTab
                            el={selectedEl as ShapeCanvasElement}
                          />
                        )}
                        {activeTab === "Position" && (
                          <PositionTab el={selectedEl} />
                        )}
                      </>
                    )}
                    {selectedEl.type === "group" && (
                      <PositionTab el={selectedEl} />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
