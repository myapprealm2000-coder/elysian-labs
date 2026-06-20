import { COLOR_PALETTES } from "@/pages/editor/editorConstants";
import { useColorStore } from "@/store/colorStore";
import { Pipette, Plus, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// ─── Utilities ────────────────────────────────────────────────────────────────

function hexToHsl(hex: string): [number, number, number] {
  const r = Number.parseInt(hex.slice(1, 3), 16) / 255;
  const g = Number.parseInt(hex.slice(3, 5), 16) / 255;
  const b = Number.parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToHex(h: number, s: number, l: number): string {
  const hh = h / 360;
  const ss = s / 100;
  const ll = l / 100;
  const hue2rgb = (p: number, q: number, t: number) => {
    let tt = t;
    if (tt < 0) tt += 1;
    if (tt > 1) tt -= 1;
    if (tt < 1 / 6) return p + (q - p) * 6 * tt;
    if (tt < 1 / 2) return q;
    if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
    return p;
  };
  let r: number;
  let g: number;
  let b: number;
  if (ss === 0) {
    r = ll;
    g = ll;
    b = ll;
  } else {
    const q = ll < 0.5 ? ll * (1 + ss) : ll + ss - ll * ss;
    const p = 2 * ll - q;
    r = hue2rgb(p, q, hh + 1 / 3);
    g = hue2rgb(p, q, hh);
    b = hue2rgb(p, q, hh - 1 / 3);
  }
  const toHex = (x: number) =>
    Math.round(x * 255)
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function hexToRgb(hex: string): [number, number, number] {
  const r = Number.parseInt(hex.slice(1, 3), 16);
  const g = Number.parseInt(hex.slice(3, 5), 16);
  const b = Number.parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

function rgbToHex(r: number, g: number, b: number): string {
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = "solid" | "gradient" | "brand";
type InputMode = "hex" | "rgb" | "hsl";

interface GradientStop {
  offset: number;
  color: string;
}

export interface ColorPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  value: string;
  onChange: (color: string) => void;
  title?: string;
}

// ─── HSL Picker Box ───────────────────────────────────────────────────────────

function SLPicker({
  hue,
  saturation,
  lightness,
  onChange,
}: {
  hue: number;
  saturation: number;
  lightness: number;
  onChange: (s: number, l: number) => void;
}) {
  const boxRef = useRef<HTMLDivElement>(null);

  const getVal = useCallback(
    (e: { clientX: number; clientY: number }) => {
      const rect = boxRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = clamp((e.clientX - rect.left) / rect.width, 0, 1);
      const y = clamp(1 - (e.clientY - rect.top) / rect.height, 0, 1);
      // Convert picker coords → HSL
      // x = saturation 0→100, y = lightness 0→100
      // When y=1 → white (L=100), y=0 → black (L=0)
      // When x=0 → grey (S=0), x=1 → full sat (S=100)
      const s = Math.round(x * 100);
      const l = Math.round(y * 100);
      onChange(s, l);
    },
    [onChange],
  );

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    getVal(e);
    const move = (ev: MouseEvent) => getVal(ev);
    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };

  // Crosshair position
  const cx = saturation / 100;
  const cy = 1 - lightness / 100;

  return (
    <div
      ref={boxRef}
      onMouseDown={onMouseDown}
      className="relative select-none rounded-lg cursor-crosshair"
      style={{ width: "100%", height: 190 }}
    >
      {/* Base hue layer */}
      <div
        className="absolute inset-0 rounded-lg"
        style={{
          background: `hsl(${hue},100%,50%)`,
        }}
      />
      {/* White overlay (saturation) */}
      <div
        className="absolute inset-0 rounded-lg"
        style={{
          background: "linear-gradient(to right, #fff 0%, transparent 100%)",
        }}
      />
      {/* Black overlay (lightness) */}
      <div
        className="absolute inset-0 rounded-lg"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, #000 100%)",
        }}
      />
      {/* Crosshair */}
      <div
        className="absolute w-4 h-4 rounded-full border-2 border-white shadow-md pointer-events-none"
        style={{
          left: `calc(${cx * 100}% - 8px)`,
          top: `calc(${cy * 100}% - 8px)`,
          boxShadow: "0 0 0 1px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.5)",
        }}
      />
    </div>
  );
}

// ─── Slider ───────────────────────────────────────────────────────────────────

function Slider({
  value,
  min,
  max,
  background,
  onChange,
}: {
  value: number;
  min: number;
  max: number;
  background: string;
  onChange: (v: number) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  const getVal = useCallback(
    (e: { clientX: number }) => {
      const rect = trackRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = clamp((e.clientX - rect.left) / rect.width, 0, 1);
      onChange(Math.round(x * (max - min) + min));
    },
    [min, max, onChange],
  );

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    getVal(e);
    const move = (ev: MouseEvent) => getVal(ev);
    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };

  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div
      ref={trackRef}
      onMouseDown={onMouseDown}
      className="relative h-5 rounded-full cursor-pointer select-none"
      style={{ background }}
    >
      <div
        className="absolute top-1/2 w-5 h-5 rounded-full border-2 border-white shadow-md -translate-y-1/2 pointer-events-none"
        style={{
          left: `calc(${pct}% - 10px)`,
          boxShadow: "0 0 0 1px rgba(0,0,0,0.3), 0 2px 6px rgba(0,0,0,0.5)",
        }}
      />
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export function ColorPickerModal({
  isOpen,
  onClose,
  value,
  onChange,
  title,
}: ColorPickerModalProps) {
  const {
    recentColors,
    savedBrandColors,
    addRecentColor,
    saveBrandColor,
    removeBrandColor,
  } = useColorStore();

  const [tab, setTab] = useState<Tab>("solid");
  const [inputMode, setInputMode] = useState<InputMode>("hex");
  const [hexInput, setHexInput] = useState(value ?? "#2563EB");
  const [selectedPalette, setSelectedPalette] = useState(0);
  const [gradientStops, setGradientStops] = useState<GradientStop[]>([
    { offset: 0, color: "#2563EB" },
    { offset: 1, color: "#22C55E" },
  ]);
  const [gradientType, setGradientType] = useState<
    "linear" | "radial" | "conic"
  >("linear");
  const [gradientAngle, setGradientAngle] = useState(135);
  const [activeStopIdx, setActiveStopIdx] = useState(0);
  const [opacity, setOpacity] = useState(100);

  // Sync internal state when value changes
  useEffect(() => {
    if (value?.startsWith("#") && value.length === 7) {
      setHexInput(value);
    }
  }, [value]);

  const safeHex = hexInput.match(/^#[0-9a-fA-F]{6}$/) ? hexInput : "#2563EB";
  const [hue, sat, lit] = hexToHsl(safeHex);
  const [r, g, b] = hexToRgb(safeHex);

  const applyHsl = useCallback((h: number, s: number, l: number) => {
    const hex = hslToHex(h, s, l);
    setHexInput(hex);
  }, []);

  const currentColor = safeHex;

  const gradientCss =
    gradientType === "radial"
      ? `radial-gradient(circle, ${gradientStops.map((s) => `${s.color} ${s.offset * 100}%`).join(", ")})`
      : gradientType === "conic"
        ? `conic-gradient(from ${gradientAngle}deg, ${gradientStops.map((s) => `${s.color} ${s.offset * 100}%`).join(", ")})`
        : `linear-gradient(${gradientAngle}deg, ${gradientStops.map((s) => `${s.color} ${s.offset * 100}%`).join(", ")})`;

  const handleApply = () => {
    if (tab === "gradient") {
      addRecentColor(gradientStops[0].color);
      onChange(gradientStops[0].color);
    } else {
      addRecentColor(currentColor);
      onChange(currentColor);
    }
    onClose();
  };

  const handleColorCircleClick = (color: string) => {
    setHexInput(color);
  };

  const updateStopColor = (idx: number, color: string) => {
    setGradientStops((prev) =>
      prev.map((s, i) => (i === idx ? { ...s, color } : s)),
    );
  };

  const addStop = () => {
    if (gradientStops.length >= 5) return;
    const mid =
      (gradientStops[0].offset +
        gradientStops[gradientStops.length - 1].offset) /
      2;
    setGradientStops((prev) =>
      [...prev, { offset: mid, color: "#ffffff" }].sort(
        (a, b) => a.offset - b.offset,
      ),
    );
  };

  const removeStop = (idx: number) => {
    if (gradientStops.length <= 2) return;
    setGradientStops((prev) => prev.filter((_, i) => i !== idx));
  };

  const overlayStyle = {
    background: "rgba(0,0,0,0.72)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
  };

  const modalStyle = {
    background: "rgba(15,23,42,0.98)",
    backdropFilter: "blur(32px)",
    WebkitBackdropFilter: "blur(32px)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow:
      "0 32px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04), 0 0 60px rgba(37,99,235,0.10)",
    fontFamily: "Inter, sans-serif",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={overlayStyle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          data-ocid="color-picker-overlay"
        >
          <motion.div
            className="w-[420px] rounded-2xl overflow-hidden"
            style={modalStyle}
            initial={{ scale: 0.95, opacity: 0, y: 8 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 8 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            data-ocid="color-picker-modal"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-5 pb-4">
              <span className="text-[15px] font-semibold text-white/90">
                {title ?? "Color Picker"}
              </span>
              <button
                type="button"
                onClick={onClose}
                className="w-7 h-7 flex items-center justify-center rounded-lg text-white/40 hover:text-white/80 hover:bg-white/10 transition-all"
                data-ocid="color-picker-close"
              >
                <X size={15} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 px-5 mb-4">
              {(["solid", "gradient", "brand"] as Tab[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className={`flex-1 h-8 rounded-lg text-xs font-medium transition-all capitalize ${tab === t ? "bg-[#2563EB] text-white" : "bg-white/[0.06] text-white/50 hover:text-white/80 hover:bg-white/10"}`}
                  data-ocid={`color-tab-${t}`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="px-5 space-y-4 pb-5">
              {/* SOLID TAB */}
              {tab === "solid" && (
                <>
                  {/* Color preview */}
                  <div
                    className="rounded-lg h-14 w-full"
                    style={{
                      background: currentColor,
                      boxShadow: `0 0 20px ${currentColor}40`,
                    }}
                  />

                  {/* SL Picker */}
                  <SLPicker
                    hue={hue}
                    saturation={sat}
                    lightness={lit}
                    onChange={(s, l) => applyHsl(hue, s, l)}
                  />

                  {/* Hue slider */}
                  <div>
                    <p className="text-[10px] text-white/30 mb-1.5 uppercase tracking-widest">
                      Hue
                    </p>
                    <Slider
                      value={hue}
                      min={0}
                      max={360}
                      background="linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)"
                      onChange={(h) => applyHsl(h, sat, lit)}
                    />
                  </div>

                  {/* Opacity slider */}
                  <div>
                    <p className="text-[10px] text-white/30 mb-1.5 uppercase tracking-widest">
                      Opacity
                    </p>
                    <Slider
                      value={opacity}
                      min={0}
                      max={100}
                      background={`linear-gradient(to right, transparent, ${currentColor}), repeating-conic-gradient(#888 0% 25%, #ccc 0% 50%) 0 0/16px 16px`}
                      onChange={setOpacity}
                    />
                  </div>

                  {/* Input mode toggle + inputs */}
                  <div>
                    <div className="flex gap-1 mb-2">
                      {(["hex", "rgb", "hsl"] as InputMode[]).map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setInputMode(m)}
                          className={`px-2.5 h-6 rounded text-[10px] font-medium uppercase tracking-widest transition-all ${inputMode === m ? "bg-[#2563EB]/20 text-[#2563EB] border border-[#2563EB]/40" : "bg-white/[0.04] text-white/30 hover:text-white/60 border border-transparent"}`}
                          data-ocid={`color-mode-${m}`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                    {inputMode === "hex" && (
                      <input
                        value={hexInput}
                        onChange={(e) => setHexInput(e.target.value)}
                        onBlur={(e) => {
                          if (/^#[0-9a-fA-F]{6}$/.test(e.target.value))
                            setHexInput(e.target.value);
                        }}
                        className="w-full h-9 rounded-lg px-3 text-sm font-mono text-white/90 bg-white/[0.06] border border-white/[0.08] focus:border-[#2563EB]/60 outline-none transition-all"
                        data-ocid="color-hex-input"
                      />
                    )}
                    {inputMode === "rgb" && (
                      <div className="flex gap-2">
                        {[
                          { label: "R", val: r, max: 255 },
                          { label: "G", val: g, max: 255 },
                          { label: "B", val: b, max: 255 },
                        ].map(({ label, val, max }) => (
                          <div key={label} className="flex-1">
                            <p className="text-[9px] text-white/30 mb-1 uppercase text-center">
                              {label}
                            </p>
                            <input
                              type="number"
                              min={0}
                              max={max}
                              value={val}
                              onChange={(e) => {
                                const nv = clamp(
                                  Number(e.target.value),
                                  0,
                                  max,
                                );
                                const nr = label === "R" ? nv : r;
                                const ng = label === "G" ? nv : g;
                                const nb = label === "B" ? nv : b;
                                setHexInput(rgbToHex(nr, ng, nb));
                              }}
                              className="w-full h-9 rounded-lg px-2 text-sm font-mono text-white/90 bg-white/[0.06] border border-white/[0.08] outline-none text-center"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                    {inputMode === "hsl" && (
                      <div className="flex gap-2">
                        {[
                          { label: "H", val: hue, max: 360 },
                          { label: "S", val: sat, max: 100 },
                          { label: "L", val: lit, max: 100 },
                        ].map(({ label, val, max }) => (
                          <div key={label} className="flex-1">
                            <p className="text-[9px] text-white/30 mb-1 uppercase text-center">
                              {label}
                            </p>
                            <input
                              type="number"
                              min={0}
                              max={max}
                              value={val}
                              onChange={(e) => {
                                const nv = clamp(
                                  Number(e.target.value),
                                  0,
                                  max,
                                );
                                const nh = label === "H" ? nv : hue;
                                const ns = label === "S" ? nv : sat;
                                const nl = label === "L" ? nv : lit;
                                applyHsl(nh, ns, nl);
                              }}
                              className="w-full h-9 rounded-lg px-2 text-sm font-mono text-white/90 bg-white/[0.06] border border-white/[0.08] outline-none text-center"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Palettes */}
                  <div>
                    <p className="text-[10px] text-white/30 mb-2 uppercase tracking-widest">
                      Palettes
                    </p>
                    <div className="flex gap-1.5 flex-wrap mb-2">
                      {COLOR_PALETTES.map((pal, i) => (
                        <button
                          key={pal.name}
                          type="button"
                          onClick={() => setSelectedPalette(i)}
                          className={`px-2.5 h-6 rounded text-[10px] font-medium transition-all ${selectedPalette === i ? "bg-[#2563EB] text-white" : "bg-white/[0.06] text-white/50 hover:text-white/80"}`}
                          data-ocid={`palette-${pal.name.toLowerCase()}`}
                        >
                          {pal.name}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-1.5 flex-wrap">
                      {COLOR_PALETTES[selectedPalette]?.colors.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => handleColorCircleClick(c)}
                          className="w-8 h-8 rounded-full border-2 border-transparent hover:scale-110 transition-transform"
                          style={{
                            background: c,
                            borderColor:
                              currentColor === c ? "white" : "transparent",
                          }}
                          title={c}
                          data-ocid={`palette-color-${c.replace("#", "")}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Recent Colors */}
                  <div>
                    <p className="text-[10px] text-white/30 mb-2 uppercase tracking-widest">
                      Recent
                    </p>
                    <div className="flex gap-1.5 flex-wrap">
                      {recentColors.slice(0, 12).map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => handleColorCircleClick(c)}
                          className="w-6 h-6 rounded-full border-2 border-transparent hover:scale-110 transition-transform"
                          style={{
                            background: c,
                            borderColor:
                              currentColor === c
                                ? "white"
                                : "rgba(255,255,255,0.15)",
                          }}
                          title={c}
                          data-ocid={`recent-color-${c.replace("#", "")}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Eyedropper button */}
                  <button
                    type="button"
                    onClick={async () => {
                      if ("EyeDropper" in window) {
                        try {
                          const dropper = new (
                            window as unknown as {
                              EyeDropper: new () => {
                                open: () => Promise<{ sRGBHex: string }>;
                              };
                            }
                          ).EyeDropper();
                          const result = await dropper.open();
                          setHexInput(result.sRGBHex);
                          onChange(result.sRGBHex);
                        } catch {
                          /* user cancelled */
                        }
                      } else {
                        toast.info("Eye dropper not supported in this browser");
                      }
                    }}
                    className="flex items-center gap-2 w-full h-9 px-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/50 hover:text-white/80 hover:bg-white/[0.08] transition-all text-sm"
                    data-ocid="color-eyedropper"
                  >
                    <Pipette size={14} />
                    <span>Sample color from screen</span>
                  </button>
                </>
              )}

              {/* GRADIENT TAB */}
              {tab === "gradient" && (
                <>
                  {/* Gradient preview */}
                  <div
                    className="rounded-lg h-14 w-full"
                    style={{ background: gradientCss }}
                  />

                  {/* Type toggle */}
                  <div className="flex gap-1">
                    {(["linear", "radial", "conic"] as const).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setGradientType(t)}
                        className={`flex-1 h-7 rounded-lg text-xs capitalize font-medium transition-all ${gradientType === t ? "bg-[#2563EB] text-white" : "bg-white/[0.06] text-white/50 hover:text-white/80"}`}
                        data-ocid={`gradient-type-${t}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>

                  {/* Angle slider (linear only) */}
                  {gradientType === "linear" && (
                    <div>
                      <p className="text-[10px] text-white/30 mb-1.5 uppercase tracking-widest">
                        Angle: {gradientAngle}°
                      </p>
                      <Slider
                        value={gradientAngle}
                        min={0}
                        max={360}
                        background="linear-gradient(to right, rgba(255,255,255,0.05), rgba(255,255,255,0.20))"
                        onChange={setGradientAngle}
                      />
                    </div>
                  )}

                  {/* Color stops */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[10px] text-white/30 uppercase tracking-widest">
                        Color Stops
                      </p>
                      <button
                        type="button"
                        onClick={addStop}
                        className="flex items-center gap-1 px-2 h-6 rounded text-[10px] bg-white/[0.06] text-white/50 hover:text-white/80 transition-all"
                        data-ocid="gradient-add-stop"
                      >
                        <Plus size={10} /> Add Stop
                      </button>
                    </div>
                    {/* Visual gradient bar with stop markers */}
                    <div
                      className="relative h-6 rounded-full mb-3"
                      style={{ background: gradientCss }}
                    >
                      {gradientStops.map((s) => (
                        <button
                          key={`gstop-${s.offset}-${s.color}`}
                          type="button"
                          onClick={() =>
                            setActiveStopIdx(gradientStops.indexOf(s))
                          }
                          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 cursor-pointer transition-transform hover:scale-110"
                          style={{
                            left: `calc(${s.offset * 100}% - 10px)`,
                            background: s.color,
                            borderColor:
                              activeStopIdx === gradientStops.indexOf(s)
                                ? "white"
                                : "rgba(255,255,255,0.5)",
                            boxShadow:
                              activeStopIdx === gradientStops.indexOf(s)
                                ? "0 0 0 2px rgba(37,99,235,0.8)"
                                : "none",
                          }}
                          data-ocid={`gradient-stop-${s.color.replace("#", "")}`}
                        />
                      ))}
                    </div>
                    {/* Stop list */}
                    <div className="space-y-2">
                      {gradientStops.map((s, li) => (
                        <div
                          key={`stoplist-${s.offset}-${s.color}`}
                          className={`flex items-center gap-2 p-2 rounded-lg border transition-all ${activeStopIdx === li ? "border-[#2563EB]/40 bg-[#2563EB]/5" : "border-white/[0.06] bg-white/[0.02]"}`}
                        >
                          <button
                            type="button"
                            onClick={() => setActiveStopIdx(li)}
                            className="w-8 h-8 rounded-lg border border-white/20 shrink-0"
                            style={{ background: s.color }}
                          />
                          <div className="flex-1">
                            <input
                              type="text"
                              value={s.color}
                              onChange={(e) =>
                                updateStopColor(li, e.target.value)
                              }
                              className="w-full h-7 px-2 rounded text-xs font-mono text-white/80 bg-white/[0.06] border border-white/[0.08] outline-none"
                            />
                          </div>
                          <span className="text-[11px] text-white/30 w-8 text-right">
                            {Math.round(s.offset * 100)}%
                          </span>
                          <button
                            type="button"
                            onClick={() => removeStop(li)}
                            className="text-white/20 hover:text-red-400 transition-colors"
                            data-ocid={`gradient-remove-stop-${li}`}
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* BRAND TAB */}
              {tab === "brand" && (
                <>
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-[10px] text-white/30 uppercase tracking-widest">
                        Brand Colors
                      </p>
                      <button
                        type="button"
                        onClick={() => saveBrandColor(currentColor)}
                        className="flex items-center gap-1.5 px-3 h-7 rounded-lg bg-[#2563EB]/20 text-[#2563EB] border border-[#2563EB]/30 text-[11px] hover:bg-[#2563EB]/30 transition-all"
                        data-ocid="brand-add-color"
                      >
                        <Plus size={11} /> Add to Brand
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {savedBrandColors.map((c) => (
                        <div key={c} className="relative group">
                          <button
                            type="button"
                            onClick={() => handleColorCircleClick(c)}
                            className="w-10 h-10 rounded-full border-2 border-transparent hover:scale-110 transition-transform"
                            style={{
                              background: c,
                              borderColor:
                                currentColor === c
                                  ? "white"
                                  : "rgba(255,255,255,0.15)",
                            }}
                            title={c}
                            data-ocid={`brand-color-${c.replace("#", "")}`}
                          />
                          <button
                            type="button"
                            onClick={() => removeBrandColor(c)}
                            className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#0F172A] border border-white/20 text-white/40 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center"
                            data-ocid={`brand-remove-${c.replace("#", "")}`}
                          >
                            <X size={8} />
                          </button>
                        </div>
                      ))}
                      {savedBrandColors.length === 0 && (
                        <p className="text-sm text-white/30 py-4">
                          No brand colors saved yet.
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-[10px] text-white/30 mb-2 uppercase tracking-widest">
                      Current Color
                    </p>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full border border-white/20"
                        style={{ background: currentColor }}
                      />
                      <input
                        value={hexInput}
                        onChange={(e) => setHexInput(e.target.value)}
                        className="flex-1 h-9 rounded-lg px-3 text-sm font-mono text-white/90 bg-white/[0.06] border border-white/[0.08] outline-none"
                        data-ocid="brand-hex-input"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white/60 hover:text-white/90 hover:bg-white/[0.10] text-sm font-medium transition-all"
                  data-ocid="color-picker-cancel"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleApply}
                  className="flex-1 h-10 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90 active:scale-95"
                  style={{
                    background: "linear-gradient(135deg, #2563EB, #1d4ed8)",
                    boxShadow: "0 4px 16px rgba(37,99,235,0.4)",
                  }}
                  data-ocid="color-picker-apply"
                >
                  Apply
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
